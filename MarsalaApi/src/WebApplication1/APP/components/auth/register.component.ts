import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../Services/AuthenticationService";
import { RegisterUser } from "../../models/user"

@Component({
    moduleId: module.id,
	templateUrl: "register.component.html",
	providers: [AuthenticationService]
})

export class RegisterComponent implements OnInit {
    user: RegisterUser;
    registrationCompleted: boolean;
    error: JSON;

    constructor(private authenticationService: AuthenticationService) { }


    ngOnInit() {
	    this.registrationCompleted = false;
        this.resetState();
    }


    private resetState() {
        this.error = null;
        this.user = {
            UserName: '',
            Email: '',
            Password: '',
            ConfirmPassword: ''
        }
    }

    save(event: Event) {
        event.preventDefault();
        this.authenticationService.register(this.user)
            .then(o => {
                console.log("register Completed");
                this.registrationCompleted = true;
                this.resetState();
            })
            .catch(error => {
                console.log("register error");
                this.error = error;
                this.registrationCompleted = false;
            });
    }
}