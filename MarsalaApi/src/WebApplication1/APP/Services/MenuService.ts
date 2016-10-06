import { Injectable } from "@angular/core";

import { HttpService } from "../Services/HttpService";
import { FileUploadService } from "../Services/FileUploadService";
import { IDailyMenu } from "../Models/dailyMenu";


@Injectable()
export class MenuService {

	constructor(private request: HttpService, private fileUploadService: FileUploadService) {
    }

    getTodayMenu(): Promise<IDailyMenu> {
        return this.request.get<IDailyMenu>("DailyMenu");
    }

	getMenuFromEmail(): Promise<IDailyMenu[]>  {
        return this.request.post<IDailyMenu[]>("DailyMenu/uploadByEmail", "");
    }

	uploadMenuFromLocalFile(file: File, startDay: string): Promise<IDailyMenu[]>  {
		return this.fileUploadService.upload<IDailyMenu[]>(`${this.request.getapiUrl()}DailyMenu/upload?date=${startDay}`, [file]);
	}


}