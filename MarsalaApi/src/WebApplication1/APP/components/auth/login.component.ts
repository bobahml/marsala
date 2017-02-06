﻿import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../../models/user"
import { AuthenticationService } from "../../Services/AuthenticationService";

@Component({
    moduleId: module.id,
	templateUrl: "login.component.html",
	providers: [AuthenticationService]
})

export class LoginComponent implements OnInit {
	user = new User();
    error: JSON;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login(event: Event) {
        event.preventDefault();
        this.authenticationService.login(this.user.UserName, this.user.Password)
            .then(o => {
                this.router.navigate(["makeAnOrder"]);
            })
            .catch(error => {
                this.error = error;
            });
    }
}