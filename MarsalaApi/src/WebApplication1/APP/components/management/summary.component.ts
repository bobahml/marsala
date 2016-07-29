import { Component, Inject, OnInit } from "@angular/core";
import {MakeOrderService} from "../../Services/MakeOrderService";
import {IOrder, ISummary, Summary} from "../../Models/order";
import {Collapse} from "../../Directives/collapse";
import { SignalRService } from "../../Services/SignalRService";
import { PushNotificationComponent } from "ng2-notifications/ng2-notifications";

@Component({
    selector: "summary",
    templateUrl: "./app/components/management/summary.component.html",
    styleUrls: [ "./app/components/management/summary.component.css"],
	directives: [Collapse, PushNotificationComponent],
    providers: [MakeOrderService]
})


export class SummaryComponent implements OnInit {

    summary: ISummary = new Summary();
    isDetailsCollapsed: boolean = true;

    constructor(private makeOrderService: MakeOrderService, private signalRService: SignalRService) {
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


	notification: any = {
		show: false,
		title: "",
		body: ""
	}


	connectionEstablished: boolean;

    private subscribeToEvents(): void {
        this.signalRService.connectionEstablished.subscribe(() => {
            this.connectionEstablished = true;
        });

        this.signalRService.orderUpdated.subscribe((user: IOrder) => {
			this.notification.title = "New order is received";
			this.notification.body = `User ${user.userName} make an order.`;
			this.notification.show = true;
        });
    }

}