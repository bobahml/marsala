import { Component, OnInit } from "@angular/core";

import { MenuService } from "../../Services/MenuService";
import { IDailyMenu, DailyMenu } from "../../Models/dailyMenu";


@Component({
    moduleId: module.id,
    selector: "add-dailyMenu",
    templateUrl: "addDailyMenu.component.html",
    providers: [MenuService]
})
export class AddDailyMenuComponent implements OnInit {

    startDate: string;
    loadedMenus: IDailyMenu[] = [];

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.startDate = this.dateToString(new Date());
    }

    onChange(event: any) {
        let target = <HTMLInputElement>(event.target || event.srcElement);
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