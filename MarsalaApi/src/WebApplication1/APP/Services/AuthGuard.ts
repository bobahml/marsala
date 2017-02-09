﻿import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ContextStore } from "../shared/ContextStore";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public contextStore: ContextStore) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.contextStore.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["login"]);
        return false;
    }
}