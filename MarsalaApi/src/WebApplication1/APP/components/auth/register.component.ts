import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../Services/AuthenticationService";
import { RegisterUser } from "../../models/user"

@Component({
    moduleId: module.id,
    templateUrl: "register.component.html"
})

export class RegisterComponent {
	model = new RegisterUser();
	error = "";
    loading = false;

    constructor(
        private router: Router,
		private authenticationService: AuthenticationService) { }

    register() {
        this.loading = true;
		this.authenticationService.register(this.model)
			.then(o => {
				this.router.navigate(["login"]);
			})
			.catch(error => {
				error = error;
				this.loading = false;
			});
    }
}