import { Injectable } from "@angular/core";
import { HttpService } from "../Services/HttpService";
import { IUserToken, User, RegisterUser } from "../Models/user";
import { ContextStore } from "../shared/ContextStore";

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpService, private contextStore: ContextStore) {
    }

    login(userName: string, password: string): Promise<boolean> {
        var loginRequest: User = { UserName: userName, Password: password };

        return this.http.post<IUserToken>("account/login", loginRequest)
            .then(data => {
                if (data.token) {
                    this.contextStore.setCurrentUser(data);
                    return true;
                }
                return false;
            })
            .catch(error => {
                return false;
            });
    }

    logout(): void {
        this.contextStore.clear();
    }

    register(model: RegisterUser): Promise<void> {
        console.log(model);
        return this.http.post<IUserToken>("account/register", model)
			.then(data => {
				if (data.token) {
					this.contextStore.setCurrentUser(data);
				}
			});
	}
}