import { Component, Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";

import { SETTINGS } from "../shared/settings";
import { IDailyMenu } from "../Models/dailyMenu";
import { IOrder, ISummary } from "../Models/order";


@Injectable()
export class MakeOrderService {

	private baseHeaders = this.getHeaders();

    constructor(private http: Http) {
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
        const body = JSON.stringify(order);
        const options = new RequestOptions({ headers: this.baseHeaders });

        return this.http.post("api/order", body, options)
			.toPromise()
			.then(this.extractData)
			.catch(this.handleError);
    }



	private delete<T>(url: string): Promise<T> {
		const options = new RequestOptions({ body: "", headers: this.baseHeaders });

		return this.http.delete(url, options)
            .toPromise()
			.then(this.extractData)
			.catch(this.handleError);
	}

	private get<T>(url: string): Promise<T> {

	    const options = new RequestOptions({
		    body: "",
			headers: this.baseHeaders
	    });
		
	    return this.http.get(url, options)
			.toPromise()
			.then(this.extractData)
			.catch(this.handleError);
	}

	private getHeaders(): Headers {
		const res = new Headers();
		res.append("Content-Type", "application/json");
		res.append("Accept", "application/json");

		return res;
	}

	private extractData<T>(res: Response): T {
		return res.json() || {} ;
	}

	private handleError(error: any): any {
		console.error("An error occurred", error);
		return Promise.reject(error.message || error);
	}
}