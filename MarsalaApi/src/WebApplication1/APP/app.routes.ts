import { Routes, ExtraOptions, RouterModule } from "@angular/router";

import { AuthGuard } from "./services/AuthGuard";
import { LoginComponent } from "./components/login/login.component";
import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";
import { SummaryComponent } from "./components/management/summary.component";


const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "makeAnOrder", component: MakeAnOrderComponent, canActivate: [AuthGuard] },
    { path: "management", component: AddDailyMenuComponent, canActivate: [AuthGuard] },
    { path: "summary", component: SummaryComponent, canActivate: [AuthGuard] },
    { path: "", component: MakeAnOrderComponent, canActivate: [AuthGuard] }
];

const routeConfig: ExtraOptions = {
    enableTracing: false,
    useHash: true
};

export const routing = RouterModule.forRoot(appRoutes, routeConfig);