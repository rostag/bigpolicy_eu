"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var compiler_1 = require('@angular/compiler');
var router_deprecated_1 = require('@angular/router-deprecated');
var testing_3 = require('@angular/common/testing');
var common_1 = require('@angular/common');
var router_deprecated_2 = require('@angular/router-deprecated');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var app_component_1 = require('./app.component');
function main() {
    testing_1.describe('App component', function () {
        testing_1.beforeEachProviders(function () { return [
            router_deprecated_1.RouteRegistry,
            compiler_1.DirectiveResolver,
            core_1.provide(common_1.Location, { useClass: testing_3.SpyLocation }),
            core_1.provide(router_deprecated_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_component_1.AppComponent }),
            core_1.provide(router_deprecated_1.Router, { useClass: router_deprecated_2.RootRouter })
        ]; });
        testing_1.it('should work', testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            tcb.createAsync(TestComponent)
                .then(function (rootTC) {
                rootTC.detectChanges();
                var appDOMEl = rootTC.debugElement.children[0].nativeElement;
                testing_1.expect(dom_adapter_1.getDOM().querySelectorAll(appDOMEl, 'sd-app > sd-navbar > nav > a')[1].href).toMatch(/http:\/\/localhost:\d+\/about/);
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test-cmp',
            template: '<sd-app></sd-app>',
            directives: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
//# sourceMappingURL=app.component.spec.js.map