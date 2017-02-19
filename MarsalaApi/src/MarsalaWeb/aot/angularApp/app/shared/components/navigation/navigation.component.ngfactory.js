var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import * as import0 from '../../../../../../angularApp/app/shared/components/navigation/navigation.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../node_modules/@angular/router/src/directives/router_link.ngfactory';
import * as import9 from '@angular/router/src/router';
import * as import10 from '@angular/router/src/router_state';
import * as import11 from '@angular/common/src/location/location_strategy';
import * as import12 from '@angular/router/src/directives/router_link';
var Wrapper_NavigationComponent = (function () {
    function Wrapper_NavigationComponent() {
        this._changed = false;
        this.context = new import0.NavigationComponent();
    }
    Wrapper_NavigationComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_NavigationComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_NavigationComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        return changed;
    };
    Wrapper_NavigationComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_NavigationComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_NavigationComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_NavigationComponent;
}());
export { Wrapper_NavigationComponent };
var renderType_NavigationComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_NavigationComponent_Host0 = (function (_super) {
    __extends(View_NavigationComponent_Host0, _super);
    function View_NavigationComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_NavigationComponent_Host0, renderType_NavigationComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_NavigationComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'navigation', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_NavigationComponent0(this.viewUtils, this, 0, this._el_0);
        this._NavigationComponent_0_3 = new Wrapper_NavigationComponent();
        this.compView_0.create(this._NavigationComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._NavigationComponent_0_3.context);
    };
    View_NavigationComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.NavigationComponent) && (0 === requestNodeIndex))) {
            return this._NavigationComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_NavigationComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._NavigationComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_NavigationComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_NavigationComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_NavigationComponent_Host0;
}(import1.AppView));
export var NavigationComponentNgFactory = new import7.ComponentFactory('navigation', View_NavigationComponent_Host0, import0.NavigationComponent);
var styles_NavigationComponent = [];
var renderType_NavigationComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_NavigationComponent, {});
var View_NavigationComponent0 = (function (_super) {
    __extends(View_NavigationComponent0, _super);
    function View_NavigationComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_NavigationComponent0, renderType_NavigationComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._arr_62 = import3.pureProxy1(function (p0) {
            return [p0];
        });
        _this._arr_63 = import3.pureProxy1(function (p0) {
            return [p0];
        });
        _this._arr_64 = import3.pureProxy1(function (p0) {
            return [p0];
        });
        return _this;
    }
    View_NavigationComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = import3.createRenderElement(this.renderer, parentRenderNode, 'nav', new import3.InlineArray2(2, 'class', 'navbar navbar-inverse navbar-fixed-top'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n    ', null);
        this._el_2 = import3.createRenderElement(this.renderer, this._el_0, 'div', new import3.InlineArray2(2, 'class', 'container'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n        ', null);
        this._el_4 = import3.createRenderElement(this.renderer, this._el_2, 'div', new import3.InlineArray2(2, 'class', 'navbar-header'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n            ', null);
        this._el_6 = import3.createRenderElement(this.renderer, this._el_4, 'button', new import3.InlineArray16(12, 'aria-controls', 'navbar', 'aria-expanded', 'false', 'class', 'navbar-toggle collapsed', 'data-target', '#navbar', 'data-toggle', 'collapse', 'type', 'button'), null);
        this._text_7 = this.renderer.createText(this._el_6, '\n                ', null);
        this._el_8 = import3.createRenderElement(this.renderer, this._el_6, 'span', new import3.InlineArray2(2, 'class', 'sr-only'), null);
        this._text_9 = this.renderer.createText(this._el_8, 'Toggle navigation', null);
        this._text_10 = this.renderer.createText(this._el_6, '\n                ', null);
        this._el_11 = import3.createRenderElement(this.renderer, this._el_6, 'span', new import3.InlineArray2(2, 'class', 'icon-bar'), null);
        this._text_12 = this.renderer.createText(this._el_6, '\n                ', null);
        this._el_13 = import3.createRenderElement(this.renderer, this._el_6, 'span', new import3.InlineArray2(2, 'class', 'icon-bar'), null);
        this._text_14 = this.renderer.createText(this._el_6, '\n                ', null);
        this._el_15 = import3.createRenderElement(this.renderer, this._el_6, 'span', new import3.InlineArray2(2, 'class', 'icon-bar'), null);
        this._text_16 = this.renderer.createText(this._el_6, '\n            ', null);
        this._text_17 = this.renderer.createText(this._el_4, '\n            ', null);
        this._el_18 = import3.createRenderElement(this.renderer, this._el_4, 'a', new import3.InlineArray2(2, 'class', 'navbar-brand'), null);
        this._RouterLinkWithHref_18_3 = new import8.Wrapper_RouterLinkWithHref(this.parentView.injectorGet(import9.Router, this.parentIndex), this.parentView.injectorGet(import10.ActivatedRoute, this.parentIndex), this.parentView.injectorGet(import11.LocationStrategy, this.parentIndex));
        this._el_19 = import3.createRenderElement(this.renderer, this._el_18, 'em', import3.EMPTY_INLINE_ARRAY, null);
        this._text_20 = this.renderer.createText(this._el_19, 'ASP.NET Core Angular Webpack', null);
        this._text_21 = this.renderer.createText(this._el_4, '\n        ', null);
        this._text_22 = this.renderer.createText(this._el_2, '\n        ', null);
        this._el_23 = import3.createRenderElement(this.renderer, this._el_2, 'div', new import3.InlineArray4(4, 'class', 'collapse navbar-collapse', 'id', 'navbar'), null);
        this._text_24 = this.renderer.createText(this._el_23, '\n            ', null);
        this._el_25 = import3.createRenderElement(this.renderer, this._el_23, 'ul', new import3.InlineArray2(2, 'class', 'nav navbar-nav'), null);
        this._text_26 = this.renderer.createText(this._el_25, '\n                ', null);
        this._el_27 = import3.createRenderElement(this.renderer, this._el_25, 'li', import3.EMPTY_INLINE_ARRAY, null);
        this._el_28 = import3.createRenderElement(this.renderer, this._el_27, 'a', import3.EMPTY_INLINE_ARRAY, null);
        this._RouterLinkWithHref_28_3 = new import8.Wrapper_RouterLinkWithHref(this.parentView.injectorGet(import9.Router, this.parentIndex), this.parentView.injectorGet(import10.ActivatedRoute, this.parentIndex), this.parentView.injectorGet(import11.LocationStrategy, this.parentIndex));
        this._text_29 = this.renderer.createText(this._el_28, 'Home', null);
        this._text_30 = this.renderer.createText(this._el_25, '\n                ', null);
        this._el_31 = import3.createRenderElement(this.renderer, this._el_25, 'li', import3.EMPTY_INLINE_ARRAY, null);
        this._el_32 = import3.createRenderElement(this.renderer, this._el_31, 'a', import3.EMPTY_INLINE_ARRAY, null);
        this._RouterLinkWithHref_32_3 = new import8.Wrapper_RouterLinkWithHref(this.parentView.injectorGet(import9.Router, this.parentIndex), this.parentView.injectorGet(import10.ActivatedRoute, this.parentIndex), this.parentView.injectorGet(import11.LocationStrategy, this.parentIndex));
        this._text_33 = this.renderer.createText(this._el_32, 'About', null);
        this._text_34 = this.renderer.createText(this._el_25, '\n            ', null);
        this._text_35 = this.renderer.createText(this._el_23, '\n            ', null);
        this._el_36 = import3.createRenderElement(this.renderer, this._el_23, 'ul', new import3.InlineArray2(2, 'class', 'nav navbar-nav navbar-right'), null);
        this._text_37 = this.renderer.createText(this._el_36, '\n                ', null);
        this._el_38 = import3.createRenderElement(this.renderer, this._el_36, 'li', import3.EMPTY_INLINE_ARRAY, null);
        this._text_39 = this.renderer.createText(this._el_38, '\n                    ', null);
        this._el_40 = import3.createRenderElement(this.renderer, this._el_38, 'a', new import3.InlineArray2(2, 'href', 'https://twitter.com/damien_bod'), null);
        this._el_41 = import3.createRenderElement(this.renderer, this._el_40, 'img', new import3.InlineArray4(4, 'height', '30', 'src', 'assets/damienbod.jpg'), null);
        this._text_42 = this.renderer.createText(this._el_38, '\n                ', null);
        this._text_43 = this.renderer.createText(this._el_36, '\n                ', null);
        this._el_44 = import3.createRenderElement(this.renderer, this._el_36, 'li', import3.EMPTY_INLINE_ARRAY, null);
        this._text_45 = this.renderer.createText(this._el_44, '\n                    ', null);
        this._el_46 = import3.createRenderElement(this.renderer, this._el_44, 'a', new import3.InlineArray2(2, 'href', 'https://twitter.com/FabianGosebrink'), null);
        this._el_47 = import3.createRenderElement(this.renderer, this._el_46, 'img', new import3.InlineArray4(4, 'height', '30', 'src', 'assets/fabianGosebrink.jpg'), null);
        this._text_48 = this.renderer.createText(this._el_44, '\n                ', null);
        this._text_49 = this.renderer.createText(this._el_36, '\n                ', null);
        this._el_50 = import3.createRenderElement(this.renderer, this._el_36, 'li', import3.EMPTY_INLINE_ARRAY, null);
        this._text_51 = this.renderer.createText(this._el_50, '\n                    ', null);
        this._el_52 = import3.createRenderElement(this.renderer, this._el_50, 'a', new import3.InlineArray2(2, 'href', 'https://twitter.com/robisim74'), null);
        this._el_53 = import3.createRenderElement(this.renderer, this._el_52, 'img', new import3.InlineArray4(4, 'height', '30', 'src', 'assets/RobertoSimonetti.jpg'), null);
        this._text_54 = this.renderer.createText(this._el_50, '\n                ', null);
        this._text_55 = this.renderer.createText(this._el_36, '\n            ', null);
        this._text_56 = this.renderer.createText(this._el_23, '\n        ', null);
        this._text_57 = this.renderer.createText(this._el_2, '\n    ', null);
        this._text_58 = this.renderer.createText(this._el_0, '\n', null);
        var disposable_0 = import3.subscribeToRenderElement(this, this._el_18, new import3.InlineArray2(2, 'click', null), this.eventHandler(this.handleEvent_18));
        var disposable_1 = import3.subscribeToRenderElement(this, this._el_28, new import3.InlineArray2(2, 'click', null), this.eventHandler(this.handleEvent_28));
        var disposable_2 = import3.subscribeToRenderElement(this, this._el_32, new import3.InlineArray2(2, 'click', null), this.eventHandler(this.handleEvent_32));
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._el_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._el_19,
            this._text_20,
            this._text_21,
            this._text_22,
            this._el_23,
            this._text_24,
            this._el_25,
            this._text_26,
            this._el_27,
            this._el_28,
            this._text_29,
            this._text_30,
            this._el_31,
            this._el_32,
            this._text_33,
            this._text_34,
            this._text_35,
            this._el_36,
            this._text_37,
            this._el_38,
            this._text_39,
            this._el_40,
            this._el_41,
            this._text_42,
            this._text_43,
            this._el_44,
            this._text_45,
            this._el_46,
            this._el_47,
            this._text_48,
            this._text_49,
            this._el_50,
            this._text_51,
            this._el_52,
            this._el_53,
            this._text_54,
            this._text_55,
            this._text_56,
            this._text_57,
            this._text_58
        ]), [
            disposable_0,
            disposable_1,
            disposable_2
        ]);
        return null;
    };
    View_NavigationComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import12.RouterLinkWithHref) && ((18 <= requestNodeIndex) && (requestNodeIndex <= 20)))) {
            return this._RouterLinkWithHref_18_3.context;
        }
        if (((token === import12.RouterLinkWithHref) && ((28 <= requestNodeIndex) && (requestNodeIndex <= 29)))) {
            return this._RouterLinkWithHref_28_3.context;
        }
        if (((token === import12.RouterLinkWithHref) && ((32 <= requestNodeIndex) && (requestNodeIndex <= 33)))) {
            return this._RouterLinkWithHref_32_3.context;
        }
        return notFoundResult;
    };
    View_NavigationComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_18_0_0 = this._arr_62('/home');
        this._RouterLinkWithHref_18_3.check_routerLink(currVal_18_0_0, throwOnChange, false);
        this._RouterLinkWithHref_18_3.ngDoCheck(this, this._el_18, throwOnChange);
        var currVal_28_0_0 = this._arr_63('/home');
        this._RouterLinkWithHref_28_3.check_routerLink(currVal_28_0_0, throwOnChange, false);
        this._RouterLinkWithHref_28_3.ngDoCheck(this, this._el_28, throwOnChange);
        var currVal_32_0_0 = this._arr_64('/about');
        this._RouterLinkWithHref_32_3.check_routerLink(currVal_32_0_0, throwOnChange, false);
        this._RouterLinkWithHref_32_3.ngDoCheck(this, this._el_32, throwOnChange);
        this._RouterLinkWithHref_18_3.checkHost(this, this, this._el_18, throwOnChange);
        this._RouterLinkWithHref_28_3.checkHost(this, this, this._el_28, throwOnChange);
        this._RouterLinkWithHref_32_3.checkHost(this, this, this._el_32, throwOnChange);
    };
    View_NavigationComponent0.prototype.destroyInternal = function () {
        this._RouterLinkWithHref_18_3.ngOnDestroy();
        this._RouterLinkWithHref_28_3.ngOnDestroy();
        this._RouterLinkWithHref_32_3.ngOnDestroy();
    };
    View_NavigationComponent0.prototype.handleEvent_18 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._RouterLinkWithHref_18_3.handleEvent(eventName, $event) && result);
        return result;
    };
    View_NavigationComponent0.prototype.handleEvent_28 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._RouterLinkWithHref_28_3.handleEvent(eventName, $event) && result);
        return result;
    };
    View_NavigationComponent0.prototype.handleEvent_32 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._RouterLinkWithHref_32_3.handleEvent(eventName, $event) && result);
        return result;
    };
    return View_NavigationComponent0;
}(import1.AppView));
export { View_NavigationComponent0 };
