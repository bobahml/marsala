import { Component, OnInit } from "@angular/core";
import {OrderService} from "../../Services/OrderService";
import {IOrder, ISummary, Summary} from "../../Models/order";


@Component({
    selector: "summary",
    templateUrl: "./app/components/management/summary.component.html",
    styles: [".top-buffer {margin-top: 20px;}"],
	providers: [OrderService]
})


export class SummaryComponent implements OnInit {

    summary: ISummary = new Summary();
    isDetailsCollapsed: boolean = true;

    constructor(private makeOrderService: OrderService) {
    }


    ngOnInit() {
        this.reloadSummary();
    }

    reloadSummary() {
        this.makeOrderService.getTodaySummary()
            .then(res => this.summary = res)
            .catch(error => console.log(error.messsage || error));
    }

	removeOrder(userName: string) {
		this.makeOrderService.removeOrder(userName)
            .then(res => this.summary = res)
            .catch(error => console.log(error.messsage || error));
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

	sendByEmail(copyTextarea: any) {
		this.makeOrderService.sendByEmail()
			.then(res => this.summary = res)
            .catch(error => console.log(error.messsage || error));
	}

	private clearSelection() {
		if (document.getSelection()) {
			document.getSelection().empty();
		} else if (window.getSelection) {
			window.getSelection().removeAllRanges();
		}
	}
}