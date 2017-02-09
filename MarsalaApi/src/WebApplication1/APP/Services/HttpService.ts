import { Injectable } from "@angular/core";
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

    postEmpty(url: string, object: any): Promise<boolean> {
        const options: RequestOptions = this.getRequestOptions(object);

        return this.http.post(`${SETTINGS.apiUrl}${url}`, options.body, options)
            .toPromise()
            .then(o => true)
            .catch(this.handleError);
    }

    get<T>(url: string): Promise<T> {

        const options: RequestOptions = this.getRequestOptions();

        return this.http.get(`${SETTINGS.apiUrl}${url}`, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
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
            let xhr: XMLHttpRequest = new XMLHttpRequest();
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

            let formData: FormData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i], files[i].name);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Accept", "application/json");
            let token: string = this.contextStore.getToken();
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

        let token: string = this.contextStore.getToken();
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

    private handleError(error: Response): any {
        console.error("An error occurred", error);
        if (error.status === 400) {
            return Promise.reject(error.json());
        }
        return Promise.reject(error.statusText);
    }
}