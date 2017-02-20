import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserContextStore } from "../Shared/UserContextStore";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public contextStore: UserContextStore) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.contextStore.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["login"]);
        return false;
    }
}