import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../Services/OrderService";
import { ISummary, Summary, IOrderSentStatus, SummaryText } from "../../Models/order";


@Component({
    selector: "summary",
    templateUrl: "summary.component.html",
    styles: [".top-buffer {margin-top: 20px;}"],
    providers: [OrderService]
})


export class SummaryComponent implements OnInit {

    lastSentStatus: IOrderSentStatus = null;
    summary: ISummary = new Summary();
    isDetailsCollapsed = true;

    constructor(private makeOrderService: OrderService) {
    }

    ngOnInit() {
        this.reloadFromServer();
    }

    reloadFromServer() {
        this.reloadSummary();
        this.reloadSentStatus();
    }

    reloadSummary() {
        this.makeOrderService.getTodaySummary()
            .then(res => this.summary = res)
            .catch(error => console.log(error));
    }

    reloadSentStatus() {
        this.makeOrderService.getSentStatus()
            .then(res => this.lastSentStatus = res)
            .catch(error => console.log(error));
    }

    removeOrder(userName: string) {
        this.makeOrderService.removeOrder(userName)
            .then(res => this.summary = res)
            .catch(error => console.log(error));
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

    sendByEmail(textareaValue: string) {
        const summaryText = new SummaryText();
        summaryText.OrderText = textareaValue;
        this.makeOrderService.sendByEmail(summaryText)
            .then(res => {
                this.lastSentStatus = res;
                this.summary.orderText = "The order will be sent shortly. You will receive a notification.";
            })
            .catch(error => this.summary.orderText = error);
    }

    private clearSelection() {
        if (document.getSelection()) {
            document.getSelection().empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }
}