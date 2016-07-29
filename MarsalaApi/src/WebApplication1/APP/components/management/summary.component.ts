import { Component, Inject, OnInit } from "@angular/core";
import {MakeOrderService} from "../../Services/MakeOrderService";
import {IOrder, ISummary, Summary} from "../../Models/order";
import {Collapse} from "../../Directives/collapse";
import { SignalRService } from "../../Services/SignalRService";


@Component({
    selector: "summary",
    templateUrl: "./app/components/management/summary.component.html",
    styleUrls: [ "./app/components/management/summary.component.css"],
	directives: [Collapse],
    providers: [MakeOrderService]
})


export class SummaryComponent implements OnInit {

    summary: ISummary = new Summary();
    isDetailsCollapsed: boolean = true;

    constructor(private makeOrderService: MakeOrderService, private signalRService: SignalRService) {
    }


    ngOnInit() {
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


	connectionEstablished: boolean;

    private subscribeToEvents(): void {
        this.signalRService.connectionEstablished.subscribe(() => {
            this.connectionEstablished = true;
        });

        this.signalRService.orderUpdated.subscribe((message: IOrder) => {
            console.log(message);
        });
    }

}