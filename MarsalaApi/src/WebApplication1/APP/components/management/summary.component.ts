import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {MakeOrderService} from "../../Services/MakeOrderService";
import {IOrder, ISummary, Summary} from "../../Models/order";
import {Collapse} from "../../Directives/collapse";
import { SignalRService } from "../../Services/SignalRService";
import { PushNotificationComponent } from "../notification.component";
import {CookieService} from "angular2-cookie/core";

@Component({
    selector: "summary",
    templateUrl: "./app/components/management/summary.component.html",
    styleUrls: ["./app/components/management/summary.component.css"],
	directives: [Collapse, PushNotificationComponent],
	providers: [MakeOrderService, CookieService]
})


export class SummaryComponent implements OnInit {

	@ViewChild(PushNotificationComponent) notificationComponent: PushNotificationComponent;

    summary: ISummary = new Summary();
    isDetailsCollapsed: boolean = true;

    constructor(private makeOrderService: MakeOrderService, private signalRService: SignalRService, private cookieService: CookieService) {
    }


    ngOnInit() {
		this.subscribeToEvents();
        this.reloadSummary();
    }

    reloadSummary() {
        this.makeOrderService.getTodaySummary()
            .then(res => this.summary = res)
            .catch(error => log.error(error.messsage || error));
    }

	removeOrder(userName: string) {
		this.makeOrderService.removeOrder(userName)
            .then(res => this.summary = res)
            .catch(error => log.error(error.messsage || error));
	}

	copyToClipboard(copyTextarea: any) {
		try {
			copyTextarea.select();
			document.execCommand("copy");
			this.clearSelection();
		} catch (err) {
			console.log(err);
		}
	}


	private clearSelection() {
		if (document.getSelection()) {
			document.getSelection().empty();
		} else if (window.getSelection) {
			window.getSelection().removeAllRanges();
		}
	}
	

    private subscribeToEvents(): void {
		//TODO describe
        this.signalRService.orderUpdated.subscribe((order: IOrder) => {
			if (order.UserName === this.cookieService.get("userName")) {
				return;
			}

			if (this.notificationComponent.checkCompatibility()) {

				this.notificationComponent.title = "New order is received";
				this.notificationComponent.body = `Added a new order from ${order.UserName}.`;

				this.notificationComponent.show();
			}


			this.reloadSummary();
        });
    }

}