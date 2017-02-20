import { Injectable } from "@angular/core";
import { HttpService } from "../Services/HttpService";
import { IUserToken, IUser, RegisterUser } from "../Models/user";
import { UserContextStore } from "../Shared/UserContextStore";

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpService, private contextStore: UserContextStore) {
    }

    login(userName: string, password: string): Promise<boolean> {
        const loginRequest: IUser = { UserName: userName, Password: password };

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