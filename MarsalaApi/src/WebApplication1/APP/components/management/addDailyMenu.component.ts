import { Component, OnInit  } from "@angular/core";

import { MenuService } from "../../Services/MenuService";
import { IDailyMenu, DailyMenu } from "../../Models/dailyMenu";


@Component({
    selector: "add-dailyMenu",
    templateUrl: "./app/components/management/addDailyMenu.component.html",
    providers: [MenuService]
})
export class AddDailyMenuComponent implements OnInit  {

    constructor(private menuService: MenuService) {
    }

    startDate: string;
    loadedMenus: IDailyMenu[] = [];

    ngOnInit() {
        this.startDate = this.dateToString(new Date());
    }

    onChange(event: EventTarget) {

        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let fileList: FileList = target.files;

        if (fileList == null || fileList.length !== 1) {
            return;
        }

        const startDay = this.startDate && this.startDate.length > 0 ? this.startDate : this.dateToString(new Date());

	    this.menuService.uploadMenuFromLocalFile(fileList.item(0), startDay)
		    .then(data => {
			    this.loadedMenus.length = 0;
			    data.forEach(v => this.loadedMenus.push(v));
		    })
			.catch(error => {
				this.setErrorMessage(error);
		    });
    }


	uploadFromEmail() {
		this.menuService.getMenuFromEmail()
			.then(data => {
				this.loadedMenus.length = 0;
				data.forEach(v => this.loadedMenus.push(v));
			})
			.catch(error => {
				this.setErrorMessage(error);
			});
	}

	private setErrorMessage(error: any) {
		this.loadedMenus.length = 0;
		const errorMenu = new DailyMenu(`Error! ${error}`, [], [], [], []);
		this.loadedMenus.push(errorMenu);
	}

    private dateToString(date: Date): string {
        return date.toISOString().substring(0, 10); 
    }
}