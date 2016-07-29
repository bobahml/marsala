import { Component, Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";


import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";

import { SETTINGS } from "../shared/settings";
import {IDailyMenu} from "../Models/dailyMenu";
import {IOrder, ISummary} from "../Models/order";


@Injectable()
export class MakeOrderService {
    private http: Http;


    constructor(http: Http) {
        this.http = http;
    }

    getTodayMenu(): Promise<IDailyMenu> {
        return this.get<IDailyMenu>(`${SETTINGS.apiUrl}DailyMenu`);
    }

    getTodaySummary(): Promise<ISummary> {
        return this.get<ISummary>(`${SETTINGS.apiUrl}order/summary`);
    }

    removeOrder(userName: string): Promise<ISummary> {
        return this.delete<ISummary>(`${SETTINGS.apiUrl}order/${userName}`);
    }

    makeAnOrder(order: IOrder): Promise<IOrder> {

        var body = JSON.stringify(order);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("api/order", body, options)
            .toPromise()
            .then(res => res.json())
            .catch(error => {
                console.error(error);
                Promise.reject(error.messsage || error)
            });


    }

	private delete<T>(url: string): Promise<T> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(url, options)
            .toPromise()
            .then(res => res.json())
            .catch(error => {
                console.error(error);
                Promise.reject(error.messsage || error)
            });
    }

    private get<T>(url: string): Promise<T> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(url, options)
            .toPromise()
            .then(res => res.json())
            .catch(error => {
                console.error(error);
                Promise.reject(error.messsage || error)
            });
    }
}