import { Component, Injectable } from "@angular/core";


@Injectable()
export class FileUploadService {
    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param files
     * @returns {Promise<T>}
     */
    upload<T>(url: string, files: File[]): Promise<T> {
        return new Promise((resolve, reject) => {
            var formData: FormData = new FormData();
            var xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
	                    const result: T = JSON.parse(xhr.response);
	                    resolve(result);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
			
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}