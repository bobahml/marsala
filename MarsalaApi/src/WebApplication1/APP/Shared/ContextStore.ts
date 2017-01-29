import { Injectable } from "@angular/core";
import { IUserToken } from "../Models/user";

@Injectable()
export class ContextStore {
    private currentUser: IUserToken;

    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    setCurrentUser(user: IUserToken) {
        this.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    clear() {
        this.currentUser = null;
        localStorage.removeItem("currentUser");
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