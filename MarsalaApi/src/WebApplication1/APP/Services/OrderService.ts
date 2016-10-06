import { Injectable } from "@angular/core";

import { HttpService } from "../Services/HttpService";
import { IOrder, ISummary } from "../Models/order";


@Injectable()
export class OrderService {

    constructor(private request: HttpService) {
    }

    getTodaySummary(): Promise<ISummary> {
        return this.request.get<ISummary>("order/summary");
    }

	sendByEmail(): Promise<ISummary> {
        return this.request.post<ISummary>("order/send", "");
    }

    removeOrder(userName: string): Promise<ISummary> {
        return this.request.delete<ISummary>(`order/${userName}`);
    }

    makeAnOrder(order: IOrder): Promise<IOrder> {
		return this.request.post<IOrder>("order", order);
    }
}