import { Component, OnInit  } from '@angular/core';

import {FileUploadService} from '../../Services/FileUploadService';
import {IDailyMenu} from '../../Models/dailyMenu';


@Component({
    selector: 'add-dailyMenu',
    templateUrl: './app/components/management/addDailyMenu.component.html',
    providers: [FileUploadService]
})

export class AddDailyMenuComponent implements OnInit  {

    constructor(private fileUploadService: FileUploadService) {
    }

    startDate: string;
    loadedMenus: IDailyMenu[] = [];

    ngOnInit() {
        this.startDate = this.dateToString(new Date());
    }

    onChange(fileList: FileList) {
        if (fileList == null || fileList.length !== 1) {
            return;
        }

        var startDay = this.startDate && this.startDate.length > 0 ? this.startDate : this.dateToString(new Date());

	    this.fileUploadService.upload<IDailyMenu[]>("/api/Parsing/upload?date=" + startDay, [fileList.item(0)])
		    .then(data =>{
				this.loadedMenus.length = 0;
				data.forEach(v => this.loadedMenus.push(v));
            })
            .catch(error => console.log(error));
    }

    private dateToString(date: Date): string {
        return date.toISOString().substring(0, 10); 
    }
}