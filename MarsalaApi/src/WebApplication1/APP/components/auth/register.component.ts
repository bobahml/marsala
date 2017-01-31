import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../Services/AuthenticationService";
import { RegisterUser } from "../../models/user"

@Component({
    moduleId: module.id,
    templateUrl: "register.component.html"
})

export class RegisterComponent implements OnInit {
    public user: RegisterUser;
    public registrationCompleted: boolean;
    public error: string;

    constructor(private authenticationService: AuthenticationService) { }


    ngOnInit() {
        this.registrationCompleted = false
        this.resetState();
    }


    private resetState() {
        this.error = null;
        this.user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    save(event) {
        event.preventDefault();
        this.authenticationService.register(this.user)
            .then(o => {
                this.registrationCompleted = true;
                this.resetState();
            })
            .catch(error => {
                this.error = error;
                this.registrationCompleted = false;
            });
    }
}