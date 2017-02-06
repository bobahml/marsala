import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ContextStore } from "../../Shared/ContextStore";
import { OrderService } from "../../Services/OrderService";
import { MenuService } from "../../Services/MenuService";
import { IDailyMenu } from "../../Models/dailyMenu";
import { IOrder, Order } from "../../Models/order";
import { Product } from "../../Models/product";


@Component({
    selector: "make-order",
    templateUrl: "./app/components/makeAnOrder/makeAnOrder.component.html",
    providers: [OrderService, MenuService]
})
export class MakeAnOrderComponent implements OnInit {

    constructor(
        private orderService: OrderService,
		private menuService: MenuService,
        private contextStore: ContextStore,
        private router: Router
    ) {
    }


    userName: string;

    header: string = "Loading...";
    salad: Product = new Product("Salad");
    soup: Product = new Product("Soup");
    mainCourse: Product = new Product("MainCourse");
    drink: Product = new Product("Drink");
    snacks: Product = new Product("Snacks");

    ngOnInit() {
		const user = this.contextStore.getCurrentUser();
		if (user) {
			this.userName = user.userName;
	    }
       
        this.getDailyMenu();
    }


    isOrderValid() {

        return this.userName
            && (this.salad.weigt() + this.soup.weigt() + this.mainCourse.weigt() >= 2)
            && this.drink.hasValue();
    }


    makeAnOrder() {

        const order = new Order();
        order.UserName = this.userName ? this.userName : "Unknown";
        order.Salad = this.salad.value;
        order.Soup = this.soup.value;
        order.MainCourse = this.mainCourse.value;
        order.Drink = this.drink.value;
	    order.Snacks = this.snacks.values;

        this.orderService.makeAnOrder(order)
            .then(o => this.router.navigate(["summary"]))
            .catch(error => this.header = error.messsage || error);

    }

    private getDailyMenu() {

        this.menuService.getTodayMenu()
            .then(menu => {

                if (menu) {
                    this.header = menu.header;
                    this.salad.setCollection(menu.salad);
                    this.soup.setCollection(menu.soup);
                    this.mainCourse.setCollection(menu.mainCourse);
                    this.drink.setCollection(menu.drink);
					this.snacks.setCollection(menu.snacks);
                }
            })
            .catch(error => this.header = error.messsage || error);
    }

}