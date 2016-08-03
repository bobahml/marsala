import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HTTP_PROVIDERS } from "@angular/http";
import { CookieService } from "angular2-cookie/core";


import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";
import { SummaryComponent } from "./components/management/summary.component";

import { IOrder } from "./Models/order";
import { PushNotificationComponent } from "./components/notification.component";
import { SignalRService } from "./Services/SignalRService";

@Component({
    selector: "my-app",
    templateUrl: "./app/app.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, CookieService],
    precompile: [MakeAnOrderComponent, AddDailyMenuComponent, SummaryComponent]
})


export class AppComponent implements OnInit {

	constructor(private signalRService: SignalRService, private cookieService: CookieService) {
	}


	ngOnInit() {
		this.subscribeToEvents();
	}

	private showNotification(title: string, body: string) {

		const notificationComponent = new PushNotificationComponent();

		if (notificationComponent.checkCompatibility()) {

			notificationComponent.title = title;
			notificationComponent.body = body;
			notificationComponent.icon = "favicon.ico";

			notificationComponent.show();
		}
	}

	private subscribeToEvents(): void {

		this.signalRService.orderUpdated.subscribe((order: IOrder) => {

			if (order.UserName === this.cookieService.get("userName")) {
				return;
			}

			this.showNotification("New order is received", `Added a new order from ${order.UserName}.`);
		});


		this.signalRService.foodchanged.subscribe((d: any) => {
			this.showNotification("New menu file uploaded.", "New menu file uploaded.");
		});
	}

}