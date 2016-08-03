import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService} from "angular2-cookie/core";

import { MakeOrderService } from "../../Services/MakeOrderService";
import { IDailyMenu } from "../../Models/dailyMenu";
import { IOrder, Order } from "../../Models/order";
import { Product } from "../../Models/product";

import {CollectionSelectorComponent} from "./productSelector.component";

@Component({
    selector: "make-order",
    templateUrl: "./app/components/makeAnOrder/makeAnOrder.component.html",
    directives: [CollectionSelectorComponent],
    providers: [MakeOrderService, CookieService]
})
export class MakeAnOrderComponent implements OnInit {

    constructor(
        private makeOrderService: MakeOrderService,
        private cookieService: CookieService,
        private router: Router
    ) {
    }


    userName: string;

    header: string = "Loading...";
    salad: Product = new Product("Salad");
    soup: Product = new Product("Soup");
    mainCourse: Product = new Product("MainCourse");
    drink: Product = new Product("Drink");

    ngOnInit() {
        this.userName = this.cookieService.get("userName");
        this.getDailyMenu();
    }


    isOrderValid() {

        return this.userName
            && (this.salad.weigt() + this.soup.weigt() + this.mainCourse.weigt() >= 2)
            && this.drink.hasValue();
    }


    makeAnOrder() {

        var expires = new Date();
        expires.setDate(new Date().getDate() + 10);

        this.cookieService.put("userName", this.userName, { expires: expires });

        var order = new Order();
        order.UserName = this.userName ? this.userName : "Unknown";
        order.Salad = this.salad.value;
        order.Soup = this.soup.value;
        order.MainCourse = this.mainCourse.value;
        order.Drink = this.drink.value;

        this.makeOrderService.makeAnOrder(order)
            .then(o => this.router.navigate(["summary"]))
            .catch(error => this.header = error.messsage || error);

    }

    private getDailyMenu() {

        this.makeOrderService.getTodayMenu()
            .then(menu => {

                if (menu) {
                    this.header = menu.header;
                    this.salad.setCollection(menu.salad);
                    this.soup.setCollection(menu.soup);
                    this.mainCourse.setCollection(menu.mainCourse);
                    this.drink.setCollection(menu.drink);
                }
            })
            .catch(error => this.header = error.messsage || error);
    }

}