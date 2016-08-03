//https://github.com/alexcastillo/ng2-notifications/blob/master/src/app/components/notification.component.ts

import {
    Component,
    EventEmitter,
    OnInit,
    OnChanges,
    OnDestroy,
    Input,
    Output
} from "@angular/core";

declare var Notification;

@Component({
    selector: "push-notification",
    styles: [":host { display: none; }"],
    template: ""
})

export class PushNotificationComponent implements OnInit, OnChanges, OnDestroy {

    @Input() title: string;
    @Input() body: string;
    @Input() icon: string;
    @Input() sound: string;
    @Input() data: any;
    @Input() tag: string;
    @Input() dir: string = "auto";
    @Input() lang: string = "en-US";
    @Input() renotify: boolean = false;
    @Input() sticky: boolean = false;
    @Input() vibrate: Array<number>;
    @Input() noscreen: boolean = false;
    @Input() silent: boolean = true;
    @Input() closeDelay: number = 0;

    @Output("load") onLoad: EventEmitter<any> = new EventEmitter();
    @Output("show") onShow: EventEmitter<any> = new EventEmitter();
    @Output("close") onClose: EventEmitter<any> = new EventEmitter();
    @Output("error") onError: EventEmitter<any> = new EventEmitter();
    @Output("action") onClick: EventEmitter<any> = new EventEmitter();

    checkCompatibility() : boolean {
        return ("Notification" in window);
    }

    isPermissionGranted(permission): boolean  {
        return permission === "granted";
    }

    requestPermission(callback) {
        return Notification.requestPermission(callback);
    }

    show() {
        if (!this.checkCompatibility()) {
            return console.log("Notification API not available in this browser.");
        }

        return this.requestPermission((permission) => {
            if (this.isPermissionGranted(permission)) {
                this.create();
            }
        });
    }

    create() {
        let notification = new Notification(this.title, {
            dir: this.dir,
            lang: this.lang,
            data: this.data,
            tag: this.tag,
            body: this.body,
            icon: this.icon,
            silent: this.silent,
            sound: this.sound,
            renotify: this.renotify,
            sticky: this.sticky,
            vibrate: this.vibrate,
            noscreen: this.noscreen
        });

        this.attachEventHandlers(notification);
        this.close(notification);

        return notification;
    }

    close(notification): void {
        if (this.closeDelay) {
            setTimeout(() => {
                notification.close();
            }, this.closeDelay);
        } else {
            notification.close();
        }
    }

    closeAll(): void {
        if (this.checkCompatibility() && Notification.close) {
            Notification.close();
        }
    }

    attachEventHandlers(notification): void {
        notification.onshow = () => {
            this.onShow.emit({ notification });
        };

        notification.onclick = (event) => {
            this.onClick.emit({ event, notification });
        };

        notification.onerror = () => {
            this.onError.emit({ notification });
        };

        notification.onclose = () => {
            this.onClose.emit({ notification });
        };
    }

    ngOnInit(): void {
        this.onLoad.emit({});
    }

    ngOnDestroy(): void {
        this.closeAll();
    }

    ngOnChanges(): void {
    }

}