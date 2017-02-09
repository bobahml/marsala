import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { IOrder } from "./Models/order";
import { IUserToken } from "./Models/user";
import { PushNotificationComponent } from "./components/notification.component";
import { SignalRService } from "./Services/SignalRService";
import { ContextStore } from "./Shared/ContextStore";
import { AuthGuard } from "./Services/AuthGuard";


@Component({
    selector: "my-app",
    templateUrl: "./app/app.component.html"
})
export class AppComponent implements OnInit {

    isAuthorizationPassed: boolean;
    private contextStore: ContextStore;

    constructor(private signalRService: SignalRService,
        private router: Router,
        authGuard: AuthGuard) {
        this.contextStore = authGuard.contextStore;
    }

    ngOnInit() {
        this.subscribeToEvents();
        this.isAuthorizationPassed = this.contextStore.isLoggedIn();
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

        this.contextStore.userChanged.subscribe((user: IUserToken) => {
            this.isAuthorizationPassed = this.contextStore.isLoggedIn();

            if (this.isAuthorizationPassed) {
                this.signalRService.connect(user.token);
            } else {
                this.signalRService.disconnect();
            }
        });

        this.signalRService.orderUpdated.subscribe((order: IOrder) => {
            let user = this.contextStore.getCurrentUser();
            if (order.UserName !== user.userName) {
                this.showNotification("List of orders changed.", `${order.UserName} just made an order.`,
                    () => this.router.navigate(["summary"]));
            }
        });


        this.signalRService.foodchanged.subscribe(() => {
            this.showNotification("Menu file uploaded.", "New menu file uploaded.", () => this.router.navigate([""]));
        });
    }

}