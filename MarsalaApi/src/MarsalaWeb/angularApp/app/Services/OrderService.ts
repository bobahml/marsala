import { Injectable } from "@angular/core";

import { HttpService } from "../Services/HttpService";
import { IOrder, ISummary, IOrderSentStatus, ISummaryText } from "../Models/order";


@Injectable()
export class OrderService {

    constructor(private request: HttpService) {
    }

    getTodaySummary(): Promise<ISummary> {
        return this.request.get<ISummary>("order/summary");
    }

    getSentStatus(): Promise<IOrderSentStatus> {
        return this.request.get<IOrderSentStatus>("order/status");
    }

    sendByEmail(summaryText: ISummaryText): Promise<IOrderSentStatus> {
        return this.request.post<IOrderSentStatus>("order/send", summaryText);
    }

    removeOrder(userName: string): Promise<ISummary> {
        return this.request.delete<ISummary>(`order/${userName}`);
    }

    makeAnOrder(order: IOrder): Promise<boolean> {
        return this.request.postEmpty("order", order);
    }
}