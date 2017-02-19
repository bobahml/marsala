var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../../angularApp/app/app.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/router/src/router_module';
import * as import6 from '../../../angularApp/app/shared/shared.module';
import * as import7 from '../../../angularApp/app/core/core.module';
import * as import8 from '@angular/forms/src/directives';
import * as import9 from '@angular/forms/src/form_providers';
import * as import10 from '@angular/http/src/http_module';
import * as import11 from '../../../angularApp/app/home/home.module';
import * as import12 from '@angular/common/src/localization';
import * as import13 from '@angular/core/src/application_init';
import * as import14 from '@angular/core/src/testability/testability';
import * as import15 from '@angular/core/src/application_ref';
import * as import16 from '@angular/core/src/linker/compiler';
import * as import17 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import18 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import19 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import20 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import21 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import22 from '@angular/core/src/animation/animation_queue';
import * as import23 from '@angular/core/src/linker/view_utils';
import * as import24 from '@angular/platform-browser/src/browser/title';
import * as import25 from '@angular/forms/src/directives/radio_control_value_accessor';
import * as import26 from '@angular/http/src/backends/browser_xhr';
import * as import27 from '@angular/http/src/base_response_options';
import * as import28 from '@angular/http/src/backends/xhr_backend';
import * as import29 from '@angular/http/src/base_request_options';
import * as import30 from '@angular/common/src/location/location';
import * as import31 from '@angular/router/src/url_tree';
import * as import32 from '@angular/router/src/router_outlet_map';
import * as import33 from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as import34 from '@angular/router/src/router_preloader';
import * as import35 from '../../../angularApp/app/app.constants';
import * as import36 from '../../../angularApp/app/core/services/thing-data.service';
import * as import38 from './home/components/home.component.ngfactory';
import * as import39 from './app.component.ngfactory';
import * as import40 from '@angular/core/src/i18n/tokens';
import * as import41 from '@angular/core/src/application_tokens';
import * as import42 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import43 from '@angular/platform-browser/src/dom/events/key_events';
import * as import44 from '@angular/core/src/zone/ng_zone';
import * as import45 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import46 from '../../../angularApp/app/home/components/home.component';
import * as import47 from '@angular/common/src/location/platform_location';
import * as import48 from '@angular/common/src/location/location_strategy';
import * as import49 from '@angular/router/src/url_handling_strategy';
import * as import50 from '@angular/router/src/route_reuse_strategy';
import * as import51 from '@angular/router/src/router';
import * as import52 from '@angular/core/src/console';
import * as import53 from '@angular/core/src/error_handler';
import * as import54 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import55 from '@angular/platform-browser/src/dom/animation_driver';
import * as import56 from '@angular/core/src/render/api';
import * as import57 from '@angular/core/src/security';
import * as import58 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import59 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import60 from '@angular/http/src/interfaces';
import * as import61 from '@angular/http/src/http';
import * as import62 from '@angular/router/src/router_config_loader';
import * as import63 from '@angular/core/src/linker/ng_module_factory_loader';
import * as import64 from '@angular/router/src/router_state';
var AppModuleInjector = (function (_super) {
    __extends(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        return _super.call(this, parent, [
            import38.HomeComponentNgFactory,
            import39.AppComponentNgFactory
        ], [import39.AppComponentNgFactory]) || this;
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_12", {
        get: function () {
            if ((this.__LOCALE_ID_12 == null)) {
                (this.__LOCALE_ID_12 = import3._localeFactory(this.parent.get(import40.LOCALE_ID, null)));
            }
            return this.__LOCALE_ID_12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_13", {
        get: function () {
            if ((this.__NgLocalization_13 == null)) {
                (this.__NgLocalization_13 = new import12.NgLocaleLocalization(this._LOCALE_ID_12));
            }
            return this.__NgLocalization_13;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ApplicationRef_18", {
        get: function () {
            if ((this.__ApplicationRef_18 == null)) {
                (this.__ApplicationRef_18 = this._ApplicationRef__17);
            }
            return this.__ApplicationRef_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_19", {
        get: function () {
            if ((this.__Compiler_19 == null)) {
                (this.__Compiler_19 = new import16.Compiler());
            }
            return this.__Compiler_19;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_20", {
        get: function () {
            if ((this.__APP_ID_20 == null)) {
                (this.__APP_ID_20 = import41._appIdRandomProviderFactory());
            }
            return this.__APP_ID_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_21", {
        get: function () {
            if ((this.__DOCUMENT_21 == null)) {
                (this.__DOCUMENT_21 = import4._document());
            }
            return this.__DOCUMENT_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_22", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_22 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_22 = new import17.HammerGestureConfig());
            }
            return this.__HAMMER_GESTURE_CONFIG_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_23", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_23 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_23 = [
                    new import42.DomEventsPlugin(),
                    new import43.KeyEventsPlugin(),
                    new import17.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_22)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_24", {
        get: function () {
            if ((this.__EventManager_24 == null)) {
                (this.__EventManager_24 = new import18.EventManager(this._EVENT_MANAGER_PLUGINS_23, this.parent.get(import44.NgZone)));
            }
            return this.__EventManager_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_26", {
        get: function () {
            if ((this.__AnimationDriver_26 == null)) {
                (this.__AnimationDriver_26 = import4._resolveDefaultAnimationDriver());
            }
            return this.__AnimationDriver_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_27", {
        get: function () {
            if ((this.__DomRootRenderer_27 == null)) {
                (this.__DomRootRenderer_27 = new import20.DomRootRenderer_(this._DOCUMENT_21, this._EventManager_24, this._DomSharedStylesHost_25, this._AnimationDriver_26, this._APP_ID_20));
            }
            return this.__DomRootRenderer_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgProbeToken_28", {
        get: function () {
            if ((this.__NgProbeToken_28 == null)) {
                (this.__NgProbeToken_28 = [import5.routerNgProbeToken()]);
            }
            return this.__NgProbeToken_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_29", {
        get: function () {
            if ((this.__RootRenderer_29 == null)) {
                (this.__RootRenderer_29 = import45._createConditionalRootRenderer(this._DomRootRenderer_27, this.parent.get(import45.NgProbeToken, null), this._NgProbeToken_28));
            }
            return this.__RootRenderer_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_30", {
        get: function () {
            if ((this.__DomSanitizer_30 == null)) {
                (this.__DomSanitizer_30 = new import21.DomSanitizerImpl());
            }
            return this.__DomSanitizer_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_31", {
        get: function () {
            if ((this.__Sanitizer_31 == null)) {
                (this.__Sanitizer_31 = this._DomSanitizer_30);
            }
            return this.__Sanitizer_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationQueue_32", {
        get: function () {
            if ((this.__AnimationQueue_32 == null)) {
                (this.__AnimationQueue_32 = new import22.AnimationQueue(this.parent.get(import44.NgZone)));
            }
            return this.__AnimationQueue_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_33", {
        get: function () {
            if ((this.__ViewUtils_33 == null)) {
                (this.__ViewUtils_33 = new import23.ViewUtils(this._RootRenderer_29, this._Sanitizer_31, this._AnimationQueue_32));
            }
            return this.__ViewUtils_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_34", {
        get: function () {
            if ((this.__IterableDiffers_34 == null)) {
                (this.__IterableDiffers_34 = import3._iterableDiffersFactory());
            }
            return this.__IterableDiffers_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_35", {
        get: function () {
            if ((this.__KeyValueDiffers_35 == null)) {
                (this.__KeyValueDiffers_35 = import3._keyValueDiffersFactory());
            }
            return this.__KeyValueDiffers_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_36", {
        get: function () {
            if ((this.__SharedStylesHost_36 == null)) {
                (this.__SharedStylesHost_36 = this._DomSharedStylesHost_25);
            }
            return this.__SharedStylesHost_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_37", {
        get: function () {
            if ((this.__Title_37 == null)) {
                (this.__Title_37 = new import24.Title());
            }
            return this.__Title_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RadioControlRegistry_38", {
        get: function () {
            if ((this.__RadioControlRegistry_38 == null)) {
                (this.__RadioControlRegistry_38 = new import25.RadioControlRegistry());
            }
            return this.__RadioControlRegistry_38;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_39", {
        get: function () {
            if ((this.__BrowserXhr_39 == null)) {
                (this.__BrowserXhr_39 = new import26.BrowserXhr());
            }
            return this.__BrowserXhr_39;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_40", {
        get: function () {
            if ((this.__ResponseOptions_40 == null)) {
                (this.__ResponseOptions_40 = new import27.BaseResponseOptions());
            }
            return this.__ResponseOptions_40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_41", {
        get: function () {
            if ((this.__XSRFStrategy_41 == null)) {
                (this.__XSRFStrategy_41 = import10._createDefaultCookieXSRFStrategy());
            }
            return this.__XSRFStrategy_41;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_42", {
        get: function () {
            if ((this.__XHRBackend_42 == null)) {
                (this.__XHRBackend_42 = new import28.XHRBackend(this._BrowserXhr_39, this._ResponseOptions_40, this._XSRFStrategy_41));
            }
            return this.__XHRBackend_42;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_43", {
        get: function () {
            if ((this.__RequestOptions_43 == null)) {
                (this.__RequestOptions_43 = new import29.BaseRequestOptions());
            }
            return this.__RequestOptions_43;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_44", {
        get: function () {
            if ((this.__Http_44 == null)) {
                (this.__Http_44 = import10.httpFactory(this._XHRBackend_42, this._RequestOptions_43));
            }
            return this.__Http_44;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTES_45", {
        get: function () {
            if ((this.__ROUTES_45 == null)) {
                (this.__ROUTES_45 = [
                    [{
                            path: 'home',
                            component: import46.HomeComponent
                        }
                    ],
                    [
                        {
                            path: '',
                            redirectTo: 'home',
                            pathMatch: 'full'
                        },
                        {
                            path: 'about',
                            loadChildren: './about/about.module#AboutModule'
                        }
                    ]
                ]);
            }
            return this.__ROUTES_45;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_CONFIGURATION_46", {
        get: function () {
            if ((this.__ROUTER_CONFIGURATION_46 == null)) {
                (this.__ROUTER_CONFIGURATION_46 = {});
            }
            return this.__ROUTER_CONFIGURATION_46;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_LocationStrategy_47", {
        get: function () {
            if ((this.__LocationStrategy_47 == null)) {
                (this.__LocationStrategy_47 = import5.provideLocationStrategy(this.parent.get(import47.PlatformLocation), this.parent.get(import48.APP_BASE_HREF, null), this._ROUTER_CONFIGURATION_46));
            }
            return this.__LocationStrategy_47;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Location_48", {
        get: function () {
            if ((this.__Location_48 == null)) {
                (this.__Location_48 = new import30.Location(this._LocationStrategy_47));
            }
            return this.__Location_48;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_UrlSerializer_49", {
        get: function () {
            if ((this.__UrlSerializer_49 == null)) {
                (this.__UrlSerializer_49 = new import31.DefaultUrlSerializer());
            }
            return this.__UrlSerializer_49;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RouterOutletMap_50", {
        get: function () {
            if ((this.__RouterOutletMap_50 == null)) {
                (this.__RouterOutletMap_50 = new import32.RouterOutletMap());
            }
            return this.__RouterOutletMap_50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgModuleFactoryLoader_51", {
        get: function () {
            if ((this.__NgModuleFactoryLoader_51 == null)) {
                (this.__NgModuleFactoryLoader_51 = new import33.SystemJsNgModuleLoader(this._Compiler_19, this.parent.get(import33.SystemJsNgModuleLoaderConfig, null)));
            }
            return this.__NgModuleFactoryLoader_51;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Router_52", {
        get: function () {
            if ((this.__Router_52 == null)) {
                (this.__Router_52 = import5.setupRouter(this._ApplicationRef_18, this._UrlSerializer_49, this._RouterOutletMap_50, this._Location_48, this, this._NgModuleFactoryLoader_51, this._Compiler_19, this._ROUTES_45, this._ROUTER_CONFIGURATION_46, this.parent.get(import49.UrlHandlingStrategy, null), this.parent.get(import50.RouteReuseStrategy, null)));
            }
            return this.__Router_52;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ActivatedRoute_53", {
        get: function () {
            if ((this.__ActivatedRoute_53 == null)) {
                (this.__ActivatedRoute_53 = import5.rootRoute(this._Router_52));
            }
            return this.__ActivatedRoute_53;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_PreloadAllModules_57", {
        get: function () {
            if ((this.__PreloadAllModules_57 == null)) {
                (this.__PreloadAllModules_57 = new import34.PreloadAllModules());
            }
            return this.__PreloadAllModules_57;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_INITIALIZER_58", {
        get: function () {
            if ((this.__ROUTER_INITIALIZER_58 == null)) {
                (this.__ROUTER_INITIALIZER_58 = import5.initialRouterNavigation(this._Router_52, this._ApplicationRef_18, this._RouterPreloader_56, this._ROUTER_CONFIGURATION_46));
            }
            return this.__ROUTER_INITIALIZER_58;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_BOOTSTRAP_LISTENER_59", {
        get: function () {
            if ((this.__APP_BOOTSTRAP_LISTENER_59 == null)) {
                (this.__APP_BOOTSTRAP_LISTENER_59 = [this._ROUTER_INITIALIZER_58]);
            }
            return this.__APP_BOOTSTRAP_LISTENER_59;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Configuration_60", {
        get: function () {
            if ((this.__Configuration_60 == null)) {
                (this.__Configuration_60 = new import35.Configuration());
            }
            return this.__Configuration_60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ThingService_61", {
        get: function () {
            if ((this.__ThingService_61 == null)) {
                (this.__ThingService_61 = new import36.ThingService(this._Http_44, this._Configuration_60));
            }
            return this.__ThingService_61;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new import2.CommonModule();
        this._ApplicationModule_1 = new import3.ApplicationModule();
        this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule, null));
        this._ROUTER_FORROOT_GUARD_3 = import5.provideForRootGuard(this.parent.get(import51.Router, null));
        this._RouterModule_4 = new import5.RouterModule(this._ROUTER_FORROOT_GUARD_3);
        this._SharedModule_5 = new import6.SharedModule();
        this._CoreModule_6 = new import7.CoreModule();
        this._InternalFormsSharedModule_7 = new import8.InternalFormsSharedModule();
        this._FormsModule_8 = new import9.FormsModule();
        this._HttpModule_9 = new import10.HttpModule();
        this._HomeModule_10 = new import11.HomeModule();
        this._AppModule_11 = new import1.AppModule();
        this._ErrorHandler_14 = import4.errorHandler();
        this._ApplicationInitStatus_15 = new import13.ApplicationInitStatus(this.parent.get(import13.APP_INITIALIZER, null));
        this._Testability_16 = new import14.Testability(this.parent.get(import44.NgZone));
        this._ApplicationRef__17 = new import15.ApplicationRef_(this.parent.get(import44.NgZone), this.parent.get(import52.Console), this, this._ErrorHandler_14, this, this._ApplicationInitStatus_15, this.parent.get(import14.TestabilityRegistry, null), this._Testability_16);
        this._DomSharedStylesHost_25 = new import19.DomSharedStylesHost(this._DOCUMENT_21);
        this._NoPreloading_54 = new import34.NoPreloading();
        this._PreloadingStrategy_55 = this._NoPreloading_54;
        this._RouterPreloader_56 = new import34.RouterPreloader(this._Router_52, this._NgModuleFactoryLoader_51, this._Compiler_19, this, this._PreloadingStrategy_55);
        return this._AppModule_11;
    };
    AppModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === import2.CommonModule)) {
            return this._CommonModule_0;
        }
        if ((token === import3.ApplicationModule)) {
            return this._ApplicationModule_1;
        }
        if ((token === import4.BrowserModule)) {
            return this._BrowserModule_2;
        }
        if ((token === import5.ROUTER_FORROOT_GUARD)) {
            return this._ROUTER_FORROOT_GUARD_3;
        }
        if ((token === import5.RouterModule)) {
            return this._RouterModule_4;
        }
        if ((token === import6.SharedModule)) {
            return this._SharedModule_5;
        }
        if ((token === import7.CoreModule)) {
            return this._CoreModule_6;
        }
        if ((token === import8.InternalFormsSharedModule)) {
            return this._InternalFormsSharedModule_7;
        }
        if ((token === import9.FormsModule)) {
            return this._FormsModule_8;
        }
        if ((token === import10.HttpModule)) {
            return this._HttpModule_9;
        }
        if ((token === import11.HomeModule)) {
            return this._HomeModule_10;
        }
        if ((token === import1.AppModule)) {
            return this._AppModule_11;
        }
        if ((token === import40.LOCALE_ID)) {
            return this._LOCALE_ID_12;
        }
        if ((token === import12.NgLocalization)) {
            return this._NgLocalization_13;
        }
        if ((token === import53.ErrorHandler)) {
            return this._ErrorHandler_14;
        }
        if ((token === import13.ApplicationInitStatus)) {
            return this._ApplicationInitStatus_15;
        }
        if ((token === import14.Testability)) {
            return this._Testability_16;
        }
        if ((token === import15.ApplicationRef_)) {
            return this._ApplicationRef__17;
        }
        if ((token === import15.ApplicationRef)) {
            return this._ApplicationRef_18;
        }
        if ((token === import16.Compiler)) {
            return this._Compiler_19;
        }
        if ((token === import41.APP_ID)) {
            return this._APP_ID_20;
        }
        if ((token === import54.DOCUMENT)) {
            return this._DOCUMENT_21;
        }
        if ((token === import17.HAMMER_GESTURE_CONFIG)) {
            return this._HAMMER_GESTURE_CONFIG_22;
        }
        if ((token === import18.EVENT_MANAGER_PLUGINS)) {
            return this._EVENT_MANAGER_PLUGINS_23;
        }
        if ((token === import18.EventManager)) {
            return this._EventManager_24;
        }
        if ((token === import19.DomSharedStylesHost)) {
            return this._DomSharedStylesHost_25;
        }
        if ((token === import55.AnimationDriver)) {
            return this._AnimationDriver_26;
        }
        if ((token === import20.DomRootRenderer)) {
            return this._DomRootRenderer_27;
        }
        if ((token === import15.NgProbeToken)) {
            return this._NgProbeToken_28;
        }
        if ((token === import56.RootRenderer)) {
            return this._RootRenderer_29;
        }
        if ((token === import21.DomSanitizer)) {
            return this._DomSanitizer_30;
        }
        if ((token === import57.Sanitizer)) {
            return this._Sanitizer_31;
        }
        if ((token === import22.AnimationQueue)) {
            return this._AnimationQueue_32;
        }
        if ((token === import23.ViewUtils)) {
            return this._ViewUtils_33;
        }
        if ((token === import58.IterableDiffers)) {
            return this._IterableDiffers_34;
        }
        if ((token === import59.KeyValueDiffers)) {
            return this._KeyValueDiffers_35;
        }
        if ((token === import19.SharedStylesHost)) {
            return this._SharedStylesHost_36;
        }
        if ((token === import24.Title)) {
            return this._Title_37;
        }
        if ((token === import25.RadioControlRegistry)) {
            return this._RadioControlRegistry_38;
        }
        if ((token === import26.BrowserXhr)) {
            return this._BrowserXhr_39;
        }
        if ((token === import27.ResponseOptions)) {
            return this._ResponseOptions_40;
        }
        if ((token === import60.XSRFStrategy)) {
            return this._XSRFStrategy_41;
        }
        if ((token === import28.XHRBackend)) {
            return this._XHRBackend_42;
        }
        if ((token === import29.RequestOptions)) {
            return this._RequestOptions_43;
        }
        if ((token === import61.Http)) {
            return this._Http_44;
        }
        if ((token === import62.ROUTES)) {
            return this._ROUTES_45;
        }
        if ((token === import5.ROUTER_CONFIGURATION)) {
            return this._ROUTER_CONFIGURATION_46;
        }
        if ((token === import48.LocationStrategy)) {
            return this._LocationStrategy_47;
        }
        if ((token === import30.Location)) {
            return this._Location_48;
        }
        if ((token === import31.UrlSerializer)) {
            return this._UrlSerializer_49;
        }
        if ((token === import32.RouterOutletMap)) {
            return this._RouterOutletMap_50;
        }
        if ((token === import63.NgModuleFactoryLoader)) {
            return this._NgModuleFactoryLoader_51;
        }
        if ((token === import51.Router)) {
            return this._Router_52;
        }
        if ((token === import64.ActivatedRoute)) {
            return this._ActivatedRoute_53;
        }
        if ((token === import34.NoPreloading)) {
            return this._NoPreloading_54;
        }
        if ((token === import34.PreloadingStrategy)) {
            return this._PreloadingStrategy_55;
        }
        if ((token === import34.RouterPreloader)) {
            return this._RouterPreloader_56;
        }
        if ((token === import34.PreloadAllModules)) {
            return this._PreloadAllModules_57;
        }
        if ((token === import5.ROUTER_INITIALIZER)) {
            return this._ROUTER_INITIALIZER_58;
        }
        if ((token === import41.APP_BOOTSTRAP_LISTENER)) {
            return this._APP_BOOTSTRAP_LISTENER_59;
        }
        if ((token === import35.Configuration)) {
            return this._Configuration_60;
        }
        if ((token === import36.ThingService)) {
            return this._ThingService_61;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__17.ngOnDestroy();
        this._DomSharedStylesHost_25.ngOnDestroy();
        this._RouterPreloader_56.ngOnDestroy();
    };
    return AppModuleInjector;
}(import0.NgModuleInjector));
export var AppModuleNgFactory = new import0.NgModuleFactory(AppModuleInjector, import1.AppModule);
