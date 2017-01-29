import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/core";

import { IOrder } from "./Models/order";
import { PushNotificationComponent } from "./components/notification.component";
import { SignalRService } from "./Services/SignalRService";

@Component({
    selector: "my-app",
    templateUrl: "./app/app.component.html",
})


export class AppComponent implements OnInit {

	constructor(private signalRService: SignalRService, private cookieService: CookieService, private router: Router) {
	}


	ngOnInit() {
		this.subscribeToEvents();
	}

	private showNotification(title: string, body: string, click: () => any) {

		const notificationComponent = new PushNotificationComponent();

		if (notificationComponent.checkCompatibility()) {

			notificationComponent.title = title;
			notificationComponent.body = body;
			notificationComponent.icon = "favicon.ico";

			notificationComponent.onClick.subscribe(e => {
				if (e.notification) {
					notificationComponent.close(e.notification);
				}

				if (click) {
					click();
				}
			});
			
			notificationComponent.show();
		}
	}

	private subscribeToEvents(): void {

		this.signalRService.orderUpdated.subscribe((order: IOrder) => {

			if (order.UserName === this.cookieService.get("userName")) {
				return;
			}
			this.showNotification("List of orders changed.", `${order.UserName} just made an order.`, () => this.router.navigate(["summary"]));
		});


		this.signalRService.foodchanged.subscribe(() => {
			this.showNotification("Menu file uploaded.", "New menu file uploaded.", () => this.router.navigate([""]));
		});
	}

}