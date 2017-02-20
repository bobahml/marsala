import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/auth/login.component";
import { RegisterComponent } from "./components/auth/register.component";
import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { CollectionSelectorComponent } from "./components/makeAnOrder/productSelector.component";
import { MultiselectDropdown } from "./components/makeAnOrder/multiProductSelector.component";
import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";
import { SummaryComponent } from "./components/management/summary.component";
import { CollapseDirective } from "./Directives/CollapseDirective";
import { EqualValidator } from "./Directives/EqualValidator";


import { AuthGuard } from "./Services/AuthGuard";
import { HttpService } from "./Services/HttpService";
import { SignalRService } from "./Services/SignalRService";
import { UserContextStore } from "./Shared/UserContextStore";
import { Routes, ExtraOptions, RouterModule } from "@angular/router";

const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "makeAnOrder", component: MakeAnOrderComponent, canActivate: [AuthGuard] },
    { path: "management", component: AddDailyMenuComponent, canActivate: [AuthGuard] },
    { path: "summary", component: SummaryComponent, canActivate: [AuthGuard] },
    { path: "", component: MakeAnOrderComponent, canActivate: [AuthGuard] }
];

const routeConfig: ExtraOptions = {
    enableTracing: false,
    useHash: true
};

const routing = RouterModule.forRoot( appRoutes, routeConfig );


@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],

    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MakeAnOrderComponent,
        CollectionSelectorComponent,
        MultiselectDropdown,
        AddDailyMenuComponent,
        SummaryComponent,
        CollapseDirective,
        EqualValidator
    ],

    providers: [
        AuthGuard,
        UserContextStore,
        SignalRService,
        HttpService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }