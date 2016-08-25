import { Routes, ExtraOptions, RouterModule } from "@angular/router";

import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";
import { SummaryComponent } from "./components/management/summary.component";


export const appRoutes: Routes = [
    { path: "makeAnOrder", component: MakeAnOrderComponent },
    { path: "management", component: AddDailyMenuComponent },
    { path: "summary", component: SummaryComponent },

    { path: "", component: MakeAnOrderComponent }
];

export const routeConfig: ExtraOptions = {
	enableTracing: false,
	useHash: true
};


export const appRoutingProviders: any[] = [

];


export const routing = RouterModule.forRoot(appRoutes, routeConfig);

