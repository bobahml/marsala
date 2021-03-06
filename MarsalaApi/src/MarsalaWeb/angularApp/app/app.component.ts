﻿import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { IOrder, IOrderSentStatus } from "./Models/order";
import { IUserToken } from "./Models/user";
import { PushNotificationComponent } from "./components/notification.component";
import { SignalRService } from "./Services/SignalRService";
import { UserContextStore } from "./Shared/UserContextStore";
import { AuthGuard } from "./Services/AuthGuard";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    isAuthorizationPassed: boolean;
    private contextStore: UserContextStore;

    constructor(private signalRService: SignalRService,
        private router: Router,
        authGuard: AuthGuard) {
        this.contextStore = authGuard.contextStore;
    }

    ngOnInit() {
        this.subscribeToEvents();
        this.connectIfAuthorized();
    }

    private showNotification(title: string, body: string, click: () => any) {

        const notificationComponent = new PushNotificationComponent();

        if (notificationComponent.checkCompatibility()) {

            notificationComponent.title = title;
            notificationComponent.body = body;
            notificationComponent.icon = "favicon.ico";

            notificationComponent.onClick.subscribe((e: any) => {
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

        this.contextStore.userChanged.subscribe((user: IUserToken) => this.connectIfAuthorized());

        this.signalRService.orderUpdated.subscribe((order: IOrder) => {
            const user = this.contextStore.getCurrentUser();
            if (order.UserName !== user.userName) {
                this.showNotification("List of orders changed.", `${order.UserName} just made an order.`,
                    () => this.router.navigate(["summary"]));
            }
        });

        this.signalRService.foodChanged.subscribe(() => {
            this.showNotification("Menu file uploaded.", "New menu file uploaded.", () => this.router.navigate([""]));
        });

        this.signalRService.orderSent.subscribe((status: IOrderSentStatus) => {
            const header = status.IsSuccess ? "📧 Success." : "📧 Error.";
            this.showNotification(header, `Sender: ${status.SenderName}. ${status.StatusText}`, () => this.router.navigate(["summary"]));
        });
    }

    private connectIfAuthorized() {
        this.isAuthorizationPassed = this.contextStore.isLoggedIn();

        if (this.isAuthorizationPassed) {
            this.signalRService.connect(this.contextStore.getToken());
        } else {
            this.signalRService.disconnect();
        }
    }
}