import { Injectable, EventEmitter } from "@angular/core";
import { IUserToken } from "../Models/user";

@Injectable()
export class ContextStore {
    private currentUser: IUserToken;
    userChanged: EventEmitter<IUserToken>;

	constructor() {
		console.log("ContextStore created");
	    this.userChanged = new EventEmitter<IUserToken>();
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    setCurrentUser(user: IUserToken) {
        localStorage.setItem("currentUser", JSON.stringify(user));
		this.currentUser = user;
		this.userChanged.emit(this.currentUser);
    }

    clearCurrentUser() {
        localStorage.removeItem("currentUser");
        this.currentUser = null;
        this.userChanged.emit(this.currentUser);
    }

    getCurrentUser(): IUserToken   {
        return this.currentUser;
    }

    isLoggedIn(): boolean   {
        if (this.currentUser && this.currentUser.token && this.currentUser.token.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    getToken(): string {
        if (this.currentUser) {
            return this.currentUser.token;
        };
        return null;
    }
}