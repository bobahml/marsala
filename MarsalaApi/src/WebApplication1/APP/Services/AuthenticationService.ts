import { Injectable } from "@angular/core";
import { HttpService } from "../Services/HttpService";
import { IUserToken, User, RegisterUser } from "../Models/user";
import { ContextStore } from "../shared/ContextStore";

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpService, private contextStore: ContextStore) {
    }

    login(userName: string, password: string): Promise<boolean> {
	    const loginRequest: User = { UserName: userName, Password: password };

	    return this.http.post<IUserToken>("account/login", loginRequest)
            .then(data => {
                if (data.token) {
                    this.contextStore.setCurrentUser(data);
                    return true;
                }
                return false;
            });
	}

	logout(): void {
        this.contextStore.clearCurrentUser();
    }

    register(model: RegisterUser): Promise<boolean> {
        return this.http.postEmpty("account/register", model);
	}
}