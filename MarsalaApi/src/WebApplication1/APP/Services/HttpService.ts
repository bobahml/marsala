import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";

import { SETTINGS } from "../shared/settings";


@Injectable()
export class HttpService {

	private baseHeaders = this.getHeaders();

    constructor(private http: Http) {
    }

	getapiUrl() : string {
		return SETTINGS.apiUrl;
	}


    delete<T>(url: string): Promise<T> {
		const options = new RequestOptions({ body: "", headers: this.baseHeaders });

		return this.http.delete(`${SETTINGS.apiUrl}${url}`, options)
            .toPromise()
			.then(this.extractData)
			.catch(this.handleError);
	}

	post<T>(url: string, object: any): Promise<T> {

		const body = JSON.stringify(object);
        const options = new RequestOptions({ headers: this.baseHeaders });

        return this.http.post(`${SETTINGS.apiUrl}${url}`, body, options)
			.toPromise()
			.then(this.extractData)
			.catch(this.handleError);
	}

	get<T>(url: string): Promise<T> {

		const options = new RequestOptions({
			body: "",
			headers: this.baseHeaders
		});

		return this.http.get(`${SETTINGS.apiUrl}${url}`, options)
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
		return res.json() || {};
	}

	private handleError(error: any): any {
		console.error("An error occurred", error);
		return Promise.reject(error.message || error);
	}
}