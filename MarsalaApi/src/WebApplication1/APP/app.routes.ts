import { provideRouter, RouterConfig } from "@angular/router";

import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";
import { SummaryComponent } from "./components/management/summary.component";



const routes: RouterConfig = [
    { path: "makeAnOrder", component: MakeAnOrderComponent },
    { path: "management", component: AddDailyMenuComponent },
    { path: "summary", component: SummaryComponent },

    { path: "", component: MakeAnOrderComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];