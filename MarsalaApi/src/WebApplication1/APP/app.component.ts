﻿import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { IOrder } from "./Models/order";
import { PushNotificationComponent } from "./components/notification.component";
import { SignalRService } from "./Services/SignalRService";
import { ContextStore } from "./Shared/ContextStore";

@Component({
    selector: "my-app",
    templateUrl: "./app/app.component.html",
    providers: [ContextStore]
})


export class AppComponent implements OnInit {

    constructor(private signalRService: SignalRService, private router: Router, private contextStore: ContextStore) {
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
            var user = this.contextStore.getCurrentUser();
            if (order.UserName !== user.userName) {
                this.showNotification("List of orders changed.", `${order.UserName} just made an order.`, () => this.router.navigate(["summary"]));
            }
        });


        this.signalRService.foodchanged.subscribe(() => {
            this.showNotification("Menu file uploaded.", "New menu file uploaded.", () => this.router.navigate([""]));
        });
    }

}