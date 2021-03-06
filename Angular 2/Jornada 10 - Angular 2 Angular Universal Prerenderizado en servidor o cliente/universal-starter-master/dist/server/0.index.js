exports.ids = [0,1];
exports.modules = {

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var shared_module_1 = __webpack_require__(45);
var lazy_component_1 = __webpack_require__(430);
var lazy_routing_module_1 = __webpack_require__(431);
var LazyModule = (function () {
    function LazyModule() {
    }
    LazyModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                lazy_routing_module_1.LazyRoutingModule
            ],
            declarations: [
                lazy_component_1.LazyComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LazyModule);
    return LazyModule;
}());
exports.LazyModule = LazyModule;


/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
"use strict";
var import0 = __webpack_require__(166);
var import1 = __webpack_require__(281);
var import2 = __webpack_require__(282);
var import3 = __webpack_require__(169);
var import4 = __webpack_require__(284);
var import5 = __webpack_require__(285);
var import6 = __webpack_require__(45);
var import7 = __webpack_require__(431);
var import8 = __webpack_require__(63);
var import9 = __webpack_require__(46);
var import10 = __webpack_require__(168);
var import12 = __webpack_require__(432);
var import13 = __webpack_require__(164);
var import14 = __webpack_require__(430);
var import15 = __webpack_require__(47);
var LazyModuleInjector = (function (_super) {
    __extends(LazyModuleInjector, _super);
    function LazyModuleInjector(parent) {
        _super.call(this, parent, [import12.LazyComponentNgFactory], []);
    }
    Object.defineProperty(LazyModuleInjector.prototype, "_NgLocalization_8", {
        get: function () {
            if ((this.__NgLocalization_8 == null)) {
                (this.__NgLocalization_8 = new import8.NgLocaleLocalization(this.parent.get(import13.LOCALE_ID)));
            }
            return this.__NgLocalization_8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyModuleInjector.prototype, "_RadioControlRegistry_9", {
        get: function () {
            if ((this.__RadioControlRegistry_9 == null)) {
                (this.__RadioControlRegistry_9 = new import9.RadioControlRegistry());
            }
            return this.__RadioControlRegistry_9;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyModuleInjector.prototype, "_FormBuilder_10", {
        get: function () {
            if ((this.__FormBuilder_10 == null)) {
                (this.__FormBuilder_10 = new import10.FormBuilder());
            }
            return this.__FormBuilder_10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyModuleInjector.prototype, "_ROUTES_11", {
        get: function () {
            if ((this.__ROUTES_11 == null)) {
                (this.__ROUTES_11 = [[{
                            path: '',
                            component: import14.LazyComponent
                        }
                    ]]);
            }
            return this.__ROUTES_11;
        },
        enumerable: true,
        configurable: true
    });
    LazyModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new import2.CommonModule();
        this._RouterModule_1 = new import3.RouterModule(this.parent.get(import3.ROUTER_FORROOT_GUARD, null));
        this._InternalFormsSharedModule_2 = new import4.InternalFormsSharedModule();
        this._FormsModule_3 = new import5.FormsModule();
        this._ReactiveFormsModule_4 = new import5.ReactiveFormsModule();
        this._SharedModule_5 = new import6.SharedModule();
        this._LazyRoutingModule_6 = new import7.LazyRoutingModule();
        this._LazyModule_7 = new import1.LazyModule();
        return this._LazyModule_7;
    };
    LazyModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === import2.CommonModule)) {
            return this._CommonModule_0;
        }
        if ((token === import3.RouterModule)) {
            return this._RouterModule_1;
        }
        if ((token === import4.InternalFormsSharedModule)) {
            return this._InternalFormsSharedModule_2;
        }
        if ((token === import5.FormsModule)) {
            return this._FormsModule_3;
        }
        if ((token === import5.ReactiveFormsModule)) {
            return this._ReactiveFormsModule_4;
        }
        if ((token === import6.SharedModule)) {
            return this._SharedModule_5;
        }
        if ((token === import7.LazyRoutingModule)) {
            return this._LazyRoutingModule_6;
        }
        if ((token === import1.LazyModule)) {
            return this._LazyModule_7;
        }
        if ((token === import8.NgLocalization)) {
            return this._NgLocalization_8;
        }
        if ((token === import9.RadioControlRegistry)) {
            return this._RadioControlRegistry_9;
        }
        if ((token === import10.FormBuilder)) {
            return this._FormBuilder_10;
        }
        if ((token === import15.ROUTES)) {
            return this._ROUTES_11;
        }
        return notFoundResult;
    };
    LazyModuleInjector.prototype.destroyInternal = function () {
    };
    return LazyModuleInjector;
}(import0.NgModuleInjector));
exports.LazyModuleNgFactory = new import0.NgModuleFactory(LazyModuleInjector, import1.LazyModule);


/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var LazyComponent = (function () {
    function LazyComponent() {
    }
    LazyComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.Default,
            encapsulation: core_1.ViewEncapsulation.Emulated,
            selector: 'lazy',
            template: "\n    <p>\n      Lazy component\n    </p>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LazyComponent);
    return LazyComponent;
}());
exports.LazyComponent = LazyComponent;


/***/ },

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(36);
var lazy_component_1 = __webpack_require__(430);
var LazyRoutingModule = (function () {
    function LazyRoutingModule() {
    }
    LazyRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    { path: '', component: lazy_component_1.LazyComponent }
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LazyRoutingModule);
    return LazyRoutingModule;
}());
exports.LazyRoutingModule = LazyRoutingModule;


/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
"use strict";
var import0 = __webpack_require__(430);
var import1 = __webpack_require__(283);
var import3 = __webpack_require__(98);
var import4 = __webpack_require__(66);
var import6 = __webpack_require__(65);
var import7 = __webpack_require__(64);
var import8 = __webpack_require__(167);
var import9 = __webpack_require__(165);
var Wrapper_LazyComponent = (function () {
    function Wrapper_LazyComponent() {
        this.changed = false;
        this.context = new import0.LazyComponent();
    }
    Wrapper_LazyComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_LazyComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_LazyComponent;
}());
exports.Wrapper_LazyComponent = Wrapper_LazyComponent;
var renderType_LazyComponent_Host = null;
var _View_LazyComponent_Host0 = (function (_super) {
    __extends(_View_LazyComponent_Host0, _super);
    function _View_LazyComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_LazyComponent_Host0, renderType_LazyComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_LazyComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4.selectOrCreateRenderHostElement(this.renderer, 'lazy', import4.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_LazyComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._LazyComponent_0_4 = new Wrapper_LazyComponent();
        this._appEl_0.initComponent(this._LazyComponent_0_4.context, [], compView_0);
        compView_0.create(this._LazyComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_LazyComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import0.LazyComponent) && (0 === requestNodeIndex))) {
            return this._LazyComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_LazyComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._LazyComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._LazyComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_LazyComponent_Host0;
}(import1.AppView));
function viewFactory_LazyComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_LazyComponent_Host === null)) {
        (renderType_LazyComponent_Host = viewUtils.createRenderComponentType('', 0, import8.ViewEncapsulation.None, [], {}));
    }
    return new _View_LazyComponent_Host0(viewUtils, parentInjector, declarationEl);
}
exports.LazyComponentNgFactory = new import9.ComponentFactory('lazy', viewFactory_LazyComponent_Host0, import0.LazyComponent);
var styles_LazyComponent = [];
var renderType_LazyComponent = null;
var _View_LazyComponent0 = (function (_super) {
    __extends(_View_LazyComponent0, _super);
    function _View_LazyComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_LazyComponent0, renderType_LazyComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_LazyComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._text_0 = this.renderer.createText(parentRenderNode, '\n    ', null);
        this._el_1 = import4.createRenderElement(this.renderer, parentRenderNode, 'p', import4.EMPTY_INLINE_ARRAY, null);
        this._text_2 = this.renderer.createText(this._el_1, '\n      Lazy component\n    ', null);
        this._text_3 = this.renderer.createText(parentRenderNode, '\n  ', null);
        this.init([], [
            this._text_0,
            this._el_1,
            this._text_2,
            this._text_3
        ], [], []);
        return null;
    };
    return _View_LazyComponent0;
}(import1.AppView));
function viewFactory_LazyComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_LazyComponent === null)) {
        (renderType_LazyComponent = viewUtils.createRenderComponentType('', 0, import8.ViewEncapsulation.None, styles_LazyComponent, {}));
    }
    return new _View_LazyComponent0(viewUtils, parentInjector, declarationEl);
}
exports.viewFactory_LazyComponent0 = viewFactory_LazyComponent0;


/***/ }

};;
//# sourceMappingURL=0.index.js.map