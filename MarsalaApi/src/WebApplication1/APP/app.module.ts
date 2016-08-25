import { NgModule }       from "@angular/core";
import { BrowserModule  } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent }   from "./app.component";
import { routing } from "./app.routes";



import { HTTP_PROVIDERS } from "@angular/http";
import { CookieService } from "angular2-cookie/core";

import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";
import { SummaryComponent } from "./components/management/summary.component";

import { SignalRService } from "./Services/SignalRService";

@NgModule({
    declarations: [
		AppComponent,
		MakeAnOrderComponent,
		AddDailyMenuComponent,
		SummaryComponent],
    imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
	],
    bootstrap: [AppComponent],

	providers: [
		SignalRService,
		HTTP_PROVIDERS,
		CookieService
	],
})
export class AppModule { }