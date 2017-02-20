import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserContextStore } from "../../Shared/UserContextStore";
import { OrderService } from "../../Services/OrderService";
import { UsersService } from "../../Services/UsersService";
import { AuthGuard } from "../../Services/AuthGuard";
import { MenuService } from "../../Services/MenuService";
import { Order, PaymentMethod } from "../../Models/order";
import { Product } from "../../Models/product";


@Component({
    moduleId: module.id,
    selector: "make-order",
    templateUrl: "makeAnOrder.component.html",
    providers: [OrderService, MenuService, UsersService]
})
export class MakeAnOrderComponent implements OnInit {

    checkAnotherUser: boolean = false;
    userName: string = "";
    paymentMethod: PaymentMethod = PaymentMethod.Cash;
    users: string[] = [];

    header: string = "Loading...";
    salad: Product = new Product("Salad");
    soup: Product = new Product("Soup");
    mainCourse: Product = new Product("MainCourse");
    drink: Product = new Product("Drink");
    snacks: Product = new Product("Snacks");

    private contextStore: UserContextStore;

    constructor(
        private orderService: OrderService,
        private menuService: MenuService,
        private usersService: UsersService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        this.contextStore = authGuard.contextStore;
    }

    ngOnInit() {
        const user = this.contextStore.getCurrentUser();
        if (user) {
            this.userName = user.userName;
            this.users.push(this.userName);
        }

        this.getDailyMenu();
    }

    readUsersList() {
        this.checkAnotherUser = true;
        this.usersService.getAllUsers()
            .then((arr: string[]) => {
                for (let i = 0; i < arr.length; i++) {
                    if (this.users.indexOf(arr[i]) === -1) {
                        this.users.push(arr[i]);
                    }
                }
            })
            .catch(error => this.header = error.messsage || error);
    }

    isOrderValid() {
        return this.userName
            && (this.salad.weigt() + this.soup.weigt() + this.mainCourse.weigt() >= 2)
            && this.drink.hasValue();
    }


    makeAnOrder() {

        const order = new Order();
        order.UserName = this.userName;
        order.PaymentMethod = this.paymentMethod;
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