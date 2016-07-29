import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from "@angular/http";

import { MakeAnOrderComponent } from './components/makeAnOrder/makeAnOrder.component';
import { AddDailyMenuComponent } from './components/management/addDailyMenu.component';
import { SummaryComponent } from "./components/management/summary.component";


@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS],
    precompile: [MakeAnOrderComponent, AddDailyMenuComponent, SummaryComponent]
})


export class AppComponent { }