///<reference path="../typings/index.d.ts"/>
///<reference path="../typings/tsd.d.ts"/>

import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app";
import {appRouterProviders} from "./app.routes";

import { LocationStrategy, HashLocationStrategy} from "@angular/common";
import { SignalRService } from "./Services/SignalRService";

bootstrap(AppComponent, [
    appRouterProviders, SignalRService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
])
    .catch(err => console.error(err));