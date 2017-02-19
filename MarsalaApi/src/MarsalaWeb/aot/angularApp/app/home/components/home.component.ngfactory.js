var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import * as import0 from '../../../../../angularApp/app/home/components/home.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '../../../../../angularApp/app/core/services/thing-data.service';
import * as import9 from '@angular/core/src/linker/view_container';
import * as import10 from '@angular/core/src/change_detection/change_detection_util';
import * as import11 from '../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import12 from '@angular/core/src/linker/template_ref';
import * as import13 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import14 from '@angular/common/src/directives/ng_for';
import * as import15 from '../../../../node_modules/@angular/forms/src/directives/ng_form.ngfactory';
import * as import16 from '../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import17 from '../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import18 from '../../../../node_modules/@angular/forms/src/directives/validators.ngfactory';
import * as import19 from '../../../../node_modules/@angular/forms/src/directives/ng_model.ngfactory';
import * as import20 from '../../../../node_modules/@angular/common/src/directives/ng_if.ngfactory';
import * as import21 from '@angular/core/src/linker/element_ref';
import * as import22 from '@angular/forms/src/directives/default_value_accessor';
import * as import23 from '@angular/forms/src/directives/validators';
import * as import24 from '@angular/forms/src/validators';
import * as import25 from '@angular/forms/src/directives/control_value_accessor';
import * as import26 from '@angular/forms/src/directives/ng_model';
import * as import27 from '@angular/forms/src/directives/ng_control';
import * as import28 from '@angular/forms/src/directives/ng_control_status';
import * as import29 from '@angular/forms/src/directives/ng_form';
import * as import30 from '@angular/forms/src/directives/control_container';
import * as import31 from '@angular/common/src/directives/ng_if';
var Wrapper_HomeComponent = (function () {
    function Wrapper_HomeComponent(p0) {
        this._changed = false;
        this.context = new import0.HomeComponent(p0);
    }
    Wrapper_HomeComponent.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_HomeComponent.prototype.ngOnDestroy = function () {
    };
    Wrapper_HomeComponent.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_HomeComponent.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_HomeComponent.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_HomeComponent.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_HomeComponent;
}());
export { Wrapper_HomeComponent };
var renderType_HomeComponent_Host = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, [], {});
var View_HomeComponent_Host0 = (function (_super) {
    __extends(View_HomeComponent_Host0, _super);
    function View_HomeComponent_Host0(viewUtils, parentView, parentIndex, parentElement) {
        return _super.call(this, View_HomeComponent_Host0, renderType_HomeComponent_Host, import5.ViewType.HOST, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
    }
    View_HomeComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer, 'home-component', import3.EMPTY_INLINE_ARRAY, rootSelector, null);
        this.compView_0 = new View_HomeComponent0(this.viewUtils, this, 0, this._el_0);
        this._HomeComponent_0_3 = new Wrapper_HomeComponent(this.injectorGet(import8.ThingService, this.parentIndex));
        this.compView_0.create(this._HomeComponent_0_3.context);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [this._el_0]), null);
        return new import7.ComponentRef_(0, this, this._el_0, this._HomeComponent_0_3.context);
    };
    View_HomeComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.HomeComponent) && (0 === requestNodeIndex))) {
            return this._HomeComponent_0_3.context;
        }
        return notFoundResult;
    };
    View_HomeComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._HomeComponent_0_3.ngDoCheck(this, this._el_0, throwOnChange);
        this.compView_0.internalDetectChanges(throwOnChange);
    };
    View_HomeComponent_Host0.prototype.destroyInternal = function () {
        this.compView_0.destroy();
    };
    View_HomeComponent_Host0.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_HomeComponent_Host0;
}(import1.AppView));
export var HomeComponentNgFactory = new import7.ComponentFactory('home-component', View_HomeComponent_Host0, import0.HomeComponent);
var styles_HomeComponent = [];
var View_HomeComponent2 = (function (_super) {
    __extends(View_HomeComponent2, _super);
    function View_HomeComponent2(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        var _this = _super.call(this, View_HomeComponent2, renderType_HomeComponent, import5.ViewType.EMBEDDED, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways, declaredViewContainer) || this;
        _this._expr_14 = import10.UNINITIALIZED;
        _this._expr_15 = import10.UNINITIALIZED;
        return _this;
    }
    View_HomeComponent2.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.createRenderElement(this.renderer, null, 'tr', import3.EMPTY_INLINE_ARRAY, null);
        this._text_1 = this.renderer.createText(this._el_0, '\n                        ', null);
        this._el_2 = import3.createRenderElement(this.renderer, this._el_0, 'td', import3.EMPTY_INLINE_ARRAY, null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n                        ', null);
        this._el_5 = import3.createRenderElement(this.renderer, this._el_0, 'td', import3.EMPTY_INLINE_ARRAY, null);
        this._text_6 = this.renderer.createText(this._el_5, '', null);
        this._text_7 = this.renderer.createText(this._el_0, '\n                        ', null);
        this._el_8 = import3.createRenderElement(this.renderer, this._el_0, 'td', new import3.InlineArray2(2, 'class', 'text-right'), null);
        this._text_9 = this.renderer.createText(this._el_8, '\n                            ', null);
        this._el_10 = import3.createRenderElement(this.renderer, this._el_8, 'button', new import3.InlineArray4(4, 'class', 'btn btn-xs btn-danger', 'type', 'button'), null);
        this._text_11 = this.renderer.createText(this._el_10, 'Delete', null);
        this._text_12 = this.renderer.createText(this._el_8, '\n                        ', null);
        this._text_13 = this.renderer.createText(this._el_0, '\n                    ', null);
        var disposable_0 = import3.subscribeToRenderElement(this, this._el_10, new import3.InlineArray2(2, 'click', null), this.eventHandler(this.handleEvent_10));
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._text_12,
            this._text_13
        ]), [disposable_0]);
        return null;
    };
    View_HomeComponent2.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_14 = import3.inlineInterpolate(1, '', (this.context.index + 1), '');
        if (import3.checkBinding(throwOnChange, this._expr_14, currVal_14)) {
            this.renderer.setText(this._text_3, currVal_14);
            this._expr_14 = currVal_14;
        }
        var currVal_15 = import3.inlineInterpolate(1, '', this.context.$implicit.name, '');
        if (import3.checkBinding(throwOnChange, this._expr_15, currVal_15)) {
            this.renderer.setText(this._text_6, currVal_15);
            this._expr_15 = currVal_15;
        }
    };
    View_HomeComponent2.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_HomeComponent2.prototype.handleEvent_10 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        if ((eventName == 'click')) {
            var pd_sub_0 = (this.parentView.parentView.context.deleteThing(this.context.$implicit) !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_HomeComponent2;
}(import1.AppView));
var View_HomeComponent1 = (function (_super) {
    __extends(View_HomeComponent1, _super);
    function View_HomeComponent1(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        return _super.call(this, View_HomeComponent1, renderType_HomeComponent, import5.ViewType.EMBEDDED, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways, declaredViewContainer) || this;
    }
    View_HomeComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.createRenderElement(this.renderer, null, 'div', new import3.InlineArray2(2, 'class', 'row'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_2 = import3.createRenderElement(this.renderer, this._el_0, 'div', new import3.InlineArray2(2, 'class', 'table-responsive'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n            ', null);
        this._el_4 = import3.createRenderElement(this.renderer, this._el_2, 'table', new import3.InlineArray2(2, 'class', 'table table-striped'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n                ', null);
        this._el_6 = import3.createRenderElement(this.renderer, this._el_4, 'thead', import3.EMPTY_INLINE_ARRAY, null);
        this._text_7 = this.renderer.createText(this._el_6, '\n                    ', null);
        this._el_8 = import3.createRenderElement(this.renderer, this._el_6, 'tr', import3.EMPTY_INLINE_ARRAY, null);
        this._text_9 = this.renderer.createText(this._el_8, '\n                        ', null);
        this._el_10 = import3.createRenderElement(this.renderer, this._el_8, 'th', import3.EMPTY_INLINE_ARRAY, null);
        this._text_11 = this.renderer.createText(this._el_10, '#', null);
        this._text_12 = this.renderer.createText(this._el_8, '\n                        ', null);
        this._el_13 = import3.createRenderElement(this.renderer, this._el_8, 'th', import3.EMPTY_INLINE_ARRAY, null);
        this._text_14 = this.renderer.createText(this._el_13, 'Name', null);
        this._text_15 = this.renderer.createText(this._el_8, '\n                        ', null);
        this._el_16 = import3.createRenderElement(this.renderer, this._el_8, 'th', new import3.InlineArray2(2, 'class', 'text-right'), null);
        this._text_17 = this.renderer.createText(this._el_8, '\n                    ', null);
        this._text_18 = this.renderer.createText(this._el_6, '\n                ', null);
        this._text_19 = this.renderer.createText(this._el_4, '\n                ', null);
        this._el_20 = import3.createRenderElement(this.renderer, this._el_4, 'tbody', import3.EMPTY_INLINE_ARRAY, null);
        this._text_21 = this.renderer.createText(this._el_20, '\n                    ', null);
        this._anchor_22 = this.renderer.createTemplateAnchor(this._el_20, null);
        this._vc_22 = new import9.ViewContainer(22, 20, this, this._anchor_22);
        this._TemplateRef_22_5 = new import12.TemplateRef_(this, 22, this._anchor_22);
        this._NgFor_22_6 = new import11.Wrapper_NgFor(this._vc_22.vcRef, this._TemplateRef_22_5, this.parentView.parentView.injectorGet(import13.IterableDiffers, this.parentView.parentIndex), this.parentView.ref);
        this._text_23 = this.renderer.createText(this._el_20, '\n                ', null);
        this._text_24 = this.renderer.createText(this._el_4, '\n            ', null);
        this._text_25 = this.renderer.createText(this._el_2, '\n        ', null);
        this._text_26 = this.renderer.createText(this._el_0, '\n    ', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
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
            this._el_10,
            this._text_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._text_15,
            this._el_16,
            this._text_17,
            this._text_18,
            this._text_19,
            this._el_20,
            this._text_21,
            this._anchor_22,
            this._text_23,
            this._text_24,
            this._text_25,
            this._text_26
        ]), null);
        return null;
    };
    View_HomeComponent1.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import12.TemplateRef) && (22 === requestNodeIndex))) {
            return this._TemplateRef_22_5;
        }
        if (((token === import14.NgFor) && (22 === requestNodeIndex))) {
            return this._NgFor_22_6.context;
        }
        return notFoundResult;
    };
    View_HomeComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_22_0_0 = this.parentView.context.things;
        this._NgFor_22_6.check_ngForOf(currVal_22_0_0, throwOnChange, false);
        this._NgFor_22_6.ngDoCheck(this, this._anchor_22, throwOnChange);
        this._vc_22.detectChangesInNestedViews(throwOnChange);
    };
    View_HomeComponent1.prototype.destroyInternal = function () {
        this._vc_22.destroyNestedViews();
    };
    View_HomeComponent1.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    View_HomeComponent1.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 22)) {
            return new View_HomeComponent2(this.viewUtils, this, 22, this._anchor_22, this._vc_22);
        }
        return null;
    };
    return View_HomeComponent1;
}(import1.AppView));
var View_HomeComponent3 = (function (_super) {
    __extends(View_HomeComponent3, _super);
    function View_HomeComponent3(viewUtils, parentView, parentIndex, parentElement, declaredViewContainer) {
        return _super.call(this, View_HomeComponent3, renderType_HomeComponent, import5.ViewType.EMBEDDED, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways, declaredViewContainer) || this;
    }
    View_HomeComponent3.prototype.createInternal = function (rootSelector) {
        this._el_0 = import3.createRenderElement(this.renderer, null, 'div', new import3.InlineArray2(2, 'class', 'row'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n        ', null);
        this._el_2 = import3.createRenderElement(this.renderer, this._el_0, 'span', import3.EMPTY_INLINE_ARRAY, null);
        this._text_3 = this.renderer.createText(this._el_2, 'No items found', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        this.init(this._el_0, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ]), null);
        return null;
    };
    View_HomeComponent3.prototype.visitRootNodesInternal = function (cb, ctx) {
        cb(this._el_0, ctx);
    };
    return View_HomeComponent3;
}(import1.AppView));
var renderType_HomeComponent = import3.createRenderComponentType('', 0, import4.ViewEncapsulation.None, styles_HomeComponent, {});
var View_HomeComponent0 = (function (_super) {
    __extends(View_HomeComponent0, _super);
    function View_HomeComponent0(viewUtils, parentView, parentIndex, parentElement) {
        var _this = _super.call(this, View_HomeComponent0, renderType_HomeComponent, import5.ViewType.COMPONENT, viewUtils, parentView, parentIndex, parentElement, import6.ChangeDetectorStatus.CheckAlways) || this;
        _this._expr_42 = import10.UNINITIALIZED;
        _this._expr_43 = import10.UNINITIALIZED;
        return _this;
    }
    View_HomeComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.parentElement);
        this._el_0 = import3.createRenderElement(this.renderer, parentRenderNode, 'div', new import3.InlineArray2(2, 'class', 'container-fluid'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n\n    ', null);
        this._el_2 = import3.createRenderElement(this.renderer, this._el_0, 'h1', import3.EMPTY_INLINE_ARRAY, null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n\n    ', null);
        this._el_5 = import3.createRenderElement(this.renderer, this._el_0, 'div', new import3.InlineArray2(2, 'class', 'row'), null);
        this._text_6 = this.renderer.createText(this._el_5, '\n        ', null);
        this._el_7 = import3.createRenderElement(this.renderer, this._el_5, 'form', new import3.InlineArray2(2, 'class', 'form-inline'), null);
        this._NgForm_7_3 = new import15.Wrapper_NgForm(null, null);
        this._ControlContainer_7_4 = this._NgForm_7_3.context;
        this._NgControlStatusGroup_7_5 = new import16.Wrapper_NgControlStatusGroup(this._ControlContainer_7_4);
        this._text_8 = this.renderer.createText(this._el_7, '\n            ', null);
        this._el_9 = import3.createRenderElement(this.renderer, this._el_7, 'div', new import3.InlineArray2(2, 'class', 'form-group'), null);
        this._text_10 = this.renderer.createText(this._el_9, '\n                ', null);
        this._el_11 = import3.createRenderElement(this.renderer, this._el_9, 'label', new import3.InlineArray4(4, 'class', 'sr-only', 'for', 'exampleInputThing'), null);
        this._text_12 = this.renderer.createText(this._el_11, 'Thing', null);
        this._text_13 = this.renderer.createText(this._el_9, '\n                ', null);
        this._el_14 = import3.createRenderElement(this.renderer, this._el_9, 'input', new import3.InlineArray16(12, 'class', 'form-control', 'id', 'exampleInputThing', 'name', 'thing', 'placeholder', 'Name of the thing ...', 'required', '', 'type', 'text'), null);
        this._DefaultValueAccessor_14_3 = new import17.Wrapper_DefaultValueAccessor(this.renderer, new import21.ElementRef(this._el_14));
        this._RequiredValidator_14_4 = new import18.Wrapper_RequiredValidator();
        this._NG_VALIDATORS_14_5 = [this._RequiredValidator_14_4.context];
        this._NG_VALUE_ACCESSOR_14_6 = [this._DefaultValueAccessor_14_3.context];
        this._NgModel_14_7 = new import19.Wrapper_NgModel(this._ControlContainer_7_4, this._NG_VALIDATORS_14_5, null, this._NG_VALUE_ACCESSOR_14_6);
        this._NgControl_14_8 = this._NgModel_14_7.context;
        this._NgControlStatus_14_9 = new import16.Wrapper_NgControlStatus(this._NgControl_14_8);
        this._text_15 = this.renderer.createText(this._el_9, '\n            ', null);
        this._text_16 = this.renderer.createText(this._el_7, '\n            ', null);
        this._el_17 = import3.createRenderElement(this.renderer, this._el_7, 'button', new import3.InlineArray4(4, 'class', 'btn btn-primary', 'type', 'submit'), null);
        this._text_18 = this.renderer.createText(this._el_17, 'Create new Thing', null);
        this._text_19 = this.renderer.createText(this._el_7, '\n        ', null);
        this._text_20 = this.renderer.createText(this._el_5, '\n    ', null);
        this._text_21 = this.renderer.createText(this._el_0, '\n\n    ', null);
        this._anchor_22 = this.renderer.createTemplateAnchor(this._el_0, null);
        this._vc_22 = new import9.ViewContainer(22, 0, this, this._anchor_22);
        this._TemplateRef_22_5 = new import12.TemplateRef_(this, 22, this._anchor_22);
        this._NgIf_22_6 = new import20.Wrapper_NgIf(this._vc_22.vcRef, this._TemplateRef_22_5);
        this._text_23 = this.renderer.createText(this._el_0, '\n\n    ', null);
        this._anchor_24 = this.renderer.createTemplateAnchor(this._el_0, null);
        this._vc_24 = new import9.ViewContainer(24, 0, this, this._anchor_24);
        this._TemplateRef_24_5 = new import12.TemplateRef_(this, 24, this._anchor_24);
        this._NgIf_24_6 = new import20.Wrapper_NgIf(this._vc_24.vcRef, this._TemplateRef_24_5);
        this._text_25 = this.renderer.createText(this._el_0, '\n\n', null);
        var disposable_0 = import3.subscribeToRenderElement(this, this._el_7, new import3.InlineArray8(6, 'ngSubmit', null, 'submit', null, 'reset', null), this.eventHandler(this.handleEvent_7));
        this._NgForm_7_3.subscribe(this, this.eventHandler(this.handleEvent_7), true);
        var disposable_1 = import3.subscribeToRenderElement(this, this._el_14, new import3.InlineArray8(6, 'ngModelChange', null, 'input', null, 'blur', null), this.eventHandler(this.handleEvent_14));
        this._NgModel_14_7.subscribe(this, this.eventHandler(this.handleEvent_14), true);
        this.init(null, (this.renderer.directRenderer ? null : [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._el_7,
            this._text_8,
            this._el_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._text_13,
            this._el_14,
            this._text_15,
            this._text_16,
            this._el_17,
            this._text_18,
            this._text_19,
            this._text_20,
            this._text_21,
            this._anchor_22,
            this._text_23,
            this._anchor_24,
            this._text_25
        ]), [
            disposable_0,
            disposable_1
        ]);
        return null;
    };
    View_HomeComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import22.DefaultValueAccessor) && (14 === requestNodeIndex))) {
            return this._DefaultValueAccessor_14_3.context;
        }
        if (((token === import23.RequiredValidator) && (14 === requestNodeIndex))) {
            return this._RequiredValidator_14_4.context;
        }
        if (((token === import24.NG_VALIDATORS) && (14 === requestNodeIndex))) {
            return this._NG_VALIDATORS_14_5;
        }
        if (((token === import25.NG_VALUE_ACCESSOR) && (14 === requestNodeIndex))) {
            return this._NG_VALUE_ACCESSOR_14_6;
        }
        if (((token === import26.NgModel) && (14 === requestNodeIndex))) {
            return this._NgModel_14_7.context;
        }
        if (((token === import27.NgControl) && (14 === requestNodeIndex))) {
            return this._NgControl_14_8;
        }
        if (((token === import28.NgControlStatus) && (14 === requestNodeIndex))) {
            return this._NgControlStatus_14_9.context;
        }
        if (((token === import29.NgForm) && ((7 <= requestNodeIndex) && (requestNodeIndex <= 19)))) {
            return this._NgForm_7_3.context;
        }
        if (((token === import30.ControlContainer) && ((7 <= requestNodeIndex) && (requestNodeIndex <= 19)))) {
            return this._ControlContainer_7_4;
        }
        if (((token === import28.NgControlStatusGroup) && ((7 <= requestNodeIndex) && (requestNodeIndex <= 19)))) {
            return this._NgControlStatusGroup_7_5.context;
        }
        if (((token === import12.TemplateRef) && (22 === requestNodeIndex))) {
            return this._TemplateRef_22_5;
        }
        if (((token === import31.NgIf) && (22 === requestNodeIndex))) {
            return this._NgIf_22_6.context;
        }
        if (((token === import12.TemplateRef) && (24 === requestNodeIndex))) {
            return this._TemplateRef_24_5;
        }
        if (((token === import31.NgIf) && (24 === requestNodeIndex))) {
            return this._NgIf_24_6.context;
        }
        return notFoundResult;
    };
    View_HomeComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        this._NgForm_7_3.ngDoCheck(this, this._el_7, throwOnChange);
        this._NgControlStatusGroup_7_5.ngDoCheck(this, this._el_7, throwOnChange);
        this._DefaultValueAccessor_14_3.ngDoCheck(this, this._el_14, throwOnChange);
        var currVal_14_1_0 = '';
        this._RequiredValidator_14_4.check_required(currVal_14_1_0, throwOnChange, false);
        this._RequiredValidator_14_4.ngDoCheck(this, this._el_14, throwOnChange);
        var currVal_14_2_0 = 'thing';
        this._NgModel_14_7.check_name(currVal_14_2_0, throwOnChange, false);
        var currVal_14_2_1 = this.context.thing.name;
        this._NgModel_14_7.check_model(currVal_14_2_1, throwOnChange, false);
        this._NgModel_14_7.ngDoCheck(this, this._el_14, throwOnChange);
        this._NgControlStatus_14_9.ngDoCheck(this, this._el_14, throwOnChange);
        var currVal_22_0_0 = (this.context.things.length > 0);
        this._NgIf_22_6.check_ngIf(currVal_22_0_0, throwOnChange, false);
        this._NgIf_22_6.ngDoCheck(this, this._anchor_22, throwOnChange);
        var currVal_24_0_0 = (this.context.things.length <= 0);
        this._NgIf_24_6.check_ngIf(currVal_24_0_0, throwOnChange, false);
        this._NgIf_24_6.ngDoCheck(this, this._anchor_24, throwOnChange);
        this._vc_22.detectChangesInNestedViews(throwOnChange);
        this._vc_24.detectChangesInNestedViews(throwOnChange);
        var currVal_42 = import3.inlineInterpolate(1, '', this.context.message, '');
        if (import3.checkBinding(throwOnChange, this._expr_42, currVal_42)) {
            this.renderer.setText(this._text_3, currVal_42);
            this._expr_42 = currVal_42;
        }
        this._NgControlStatusGroup_7_5.checkHost(this, this, this._el_7, throwOnChange);
        this._RequiredValidator_14_4.checkHost(this, this, this._el_14, throwOnChange);
        this._NgControlStatus_14_9.checkHost(this, this, this._el_14, throwOnChange);
        var currVal_43 = !this._NgForm_7_3.context.valid;
        if (import3.checkBinding(throwOnChange, this._expr_43, currVal_43)) {
            this.renderer.setElementProperty(this._el_17, 'disabled', currVal_43);
            this._expr_43 = currVal_43;
        }
    };
    View_HomeComponent0.prototype.destroyInternal = function () {
        this._vc_22.destroyNestedViews();
        this._vc_24.destroyNestedViews();
        this._NgModel_14_7.ngOnDestroy();
        this._NgForm_7_3.ngOnDestroy();
    };
    View_HomeComponent0.prototype.createEmbeddedViewInternal = function (nodeIndex) {
        if ((nodeIndex == 22)) {
            return new View_HomeComponent1(this.viewUtils, this, 22, this._anchor_22, this._vc_22);
        }
        if ((nodeIndex == 24)) {
            return new View_HomeComponent3(this.viewUtils, this, 24, this._anchor_24, this._vc_24);
        }
        return null;
    };
    View_HomeComponent0.prototype.handleEvent_7 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._NgForm_7_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'ngSubmit')) {
            var pd_sub_0 = (this.context.addThing() !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    View_HomeComponent0.prototype.handleEvent_14 = function (eventName, $event) {
        this.markPathToRootAsCheckOnce();
        var result = true;
        result = (this._DefaultValueAccessor_14_3.handleEvent(eventName, $event) && result);
        if ((eventName == 'ngModelChange')) {
            var pd_sub_0 = ((this.context.thing.name = $event) !== false);
            result = (pd_sub_0 && result);
        }
        return result;
    };
    return View_HomeComponent0;
}(import1.AppView));
export { View_HomeComponent0 };
