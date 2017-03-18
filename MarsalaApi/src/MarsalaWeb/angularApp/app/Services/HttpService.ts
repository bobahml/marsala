import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { SETTINGS } from "../Shared/settings";
import { UserContextStore } from "../Shared/UserContextStore";

@Injectable()
export class HttpService {

    constructor(private http: Http, private contextStore: UserContextStore,
        private router: Router) {
    }

    getapiUrl(): string {
        return SETTINGS.apiUrl;
    }

    delete<T>(url: string): Promise<T> {
        return this.http.delete(`${SETTINGS.apiUrl}${url}`, this.getRequestOptions())
            .toPromise()
            .then(this.extractData)
            .catch(e => this.handleError(e, this.router));
    }

    post<T>(url: string, object: any): Promise<T> {
        const options: RequestOptions = this.getRequestOptions(object);

        return this.http.post(`${SETTINGS.apiUrl}${url}`, options.body, options)
            .toPromise()
            .then(this.extractData)
            .catch(e => this.handleError(e, this.router));
    }

    postEmpty(url: string, object: any): Promise<boolean> {
        const options: RequestOptions = this.getRequestOptions(object);

        return this.http.post(`${SETTINGS.apiUrl}${url}`, options.body, options)
            .toPromise()
            .then(o => true)
            .catch(e => this.handleError(e, this.router));
    }

    get<T>(url: string): Promise<T> {

        const options = this.getRequestOptions();

        return this.http.get(`${SETTINGS.apiUrl}${url}`, options)
            .toPromise()
            .then(this.extractData)
            .catch(e => this.handleError(e, this.router));
    }

    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param files
     * @returns {Promise<T>}
     */
    upload<T>(url: string, files: File[]): Promise<T> {
        return new Promise((resolve, reject) => {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const result: T = JSON.parse(xhr.response);
                        resolve(result);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            const formData: FormData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i], files[i].name);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Accept", "application/json");
            const token: string = this.contextStore.getToken();
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
            xhr.send(formData);
        });
    }

    private getHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        const token: string = this.contextStore.getToken();
        if (token) {
            headers.append("Authorization", "Bearer " + token);
        }
        return headers;
    }

    private getRequestOptions(object?: any): RequestOptions {
        let body: string;

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

    private handleError(error: Response, router: Router): any {
        console.error("An error occurred", error);
        if (error.status === 400) {
            return Promise.reject(error.json());
        } else if (error.status === 401) {
            router.navigate(["login"]);
        }
        return Promise.reject(error.statusText);
    }
}