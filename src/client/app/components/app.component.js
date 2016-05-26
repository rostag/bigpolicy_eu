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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var navbar_component_1 = require('./navbar.component');
var toolbar_component_1 = require('./toolbar.component');
var index_1 = require('../shared/index');
var index_2 = require('../home/index');
var index_3 = require('../about/index');
var index_4 = require('../leader/index');
var donors_component_1 = require('../donors/donors.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'sd-app',
            viewProviders: [index_1.NameListService],
            templateUrl: 'app/components/app.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, navbar_component_1.NavbarComponent, toolbar_component_1.ToolbarComponent]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/',
                name: 'Home',
                component: index_2.HomeComponent,
                useAsDefault: true
            },
            {
                path: '/about',
                name: 'About',
                component: index_3.AboutComponent
            },
            {
                path: '/leaders/...',
                name: 'Leaders',
                component: index_4.LeadersComponent
            },
            {
                path: '/donors',
                name: 'Donors',
                component: donors_component_1.DonorsComponent
            }
        ]),
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
