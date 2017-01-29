import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user'
import { AuthenticationService } from '../../Services/AuthenticationService';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: User = new User();
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "";
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .then(o => {
                this.router.navigate([this.returnUrl]);
            })
            .catch(error => {
                console.error(error);
                this.loading = false;
            });
    }
}