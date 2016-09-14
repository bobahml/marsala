import { NgModule }       from "@angular/core";
import { BrowserModule  } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent }   from "./app.component";
import { routing } from "./app.routes";


import { CookieService } from "angular2-cookie/core";
import { SignalRService } from "./Services/SignalRService";


import { MakeAnOrderComponent } from "./components/makeAnOrder/makeAnOrder.component";
import { CollectionSelectorComponent } from "./components/makeAnOrder/productSelector.component";
import { MultiselectDropdown  } from "./components/makeAnOrder/multiProductSelector.component";


import { AddDailyMenuComponent } from "./components/management/addDailyMenu.component";


import { SummaryComponent } from "./components/management/summary.component";
import { CollapseDirective } from "./Directives/CollapseDirective";



@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,
		MakeAnOrderComponent,
		CollectionSelectorComponent,
		MultiselectDropdown,



		AddDailyMenuComponent,


		SummaryComponent,
		CollapseDirective
	],

	providers: [
		SignalRService,
		CookieService
	],

	bootstrap: [ AppComponent ]
})
export class AppModule {
}