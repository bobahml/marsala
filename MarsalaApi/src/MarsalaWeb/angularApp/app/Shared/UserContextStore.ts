﻿import { Injectable, EventEmitter } from "@angular/core";
import { IUserToken } from "../Models/user";

@Injectable()
export class UserContextStore {
    private currentUser: IUserToken;
    userChanged: EventEmitter<IUserToken>;

    constructor() {
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
        return this.currentUser && this.currentUser.token && this.currentUser.token.length > 0;
    }

    getToken(): string {
        if (this.currentUser) {
            return this.currentUser.token;
        };
        return null;
    }
}