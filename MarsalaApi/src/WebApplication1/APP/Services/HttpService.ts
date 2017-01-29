﻿import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { SETTINGS } from "../shared/settings";
import { ContextStore } from "../shared/ContextStore";

@Injectable()
export class HttpService {

    constructor(private http: Http, private contextStore: ContextStore) {
    }

    getapiUrl(): string {
        return SETTINGS.apiUrl;
    }


    delete<T>(url: string): Promise<T> {
        return this.http.delete(`${SETTINGS.apiUrl}${url}`, this.getRequestOptions())
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    post<T>(url: string, object: any): Promise<T> {
        const options: RequestOptions = this.getRequestOptions(object);

        return this.http.post(`${SETTINGS.apiUrl}${url}`, options.body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    get<T>(url: string): Promise<T> {

        const options: RequestOptions = this.getRequestOptions();

        return this.http.get(`${SETTINGS.apiUrl}${url}`, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private getHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        var token: string = this.contextStore.getToken();
        if (token) {
            headers.append("Authorization", "Bearer " + token);
        }

        return headers;
    }

    private getRequestOptions(object?: any): RequestOptions {
        var body: string;

        if (object != null) {
            body = JSON.stringify(object);
        } else {
            body = "";
        }
        return new RequestOptions({ body: body, headers: this.getHeaders() });
    }

    private extractData<T>(res: Response): T {
        return res.json() || {};
    }

    private handleError(error: any): any {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}