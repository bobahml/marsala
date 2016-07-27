///<reference path="../typings/index.d.ts"/>
import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app";
import {appRouterProviders} from "./app.routes";

import { LocationStrategy, HashLocationStrategy} from "@angular/common";

bootstrap(AppComponent, [
    appRouterProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
])
    .catch(err => console.error(err));