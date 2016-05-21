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
var leader_service_1 = require('../leader/leader.service');
var leaders_list_component_1 = require('../list/leaders.list.component');
var leader_details_component_1 = require('../details/leader-details.component');
var dashboard_component_1 = require('../dashboard/dashboard.component');
var LeadersComponent = (function () {
    function LeadersComponent(router) {
        this.router = router;
        this.title = 'Leaders';
    }
    LeadersComponent = __decorate([
        core_1.Component({
            selector: 'sd-leader',
            templateUrl: 'app/leader/leader/leader.component.html',
            styleUrls: ['app/leader/leader/leader.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [leader_service_1.LeaderService]
        }),
        router_deprecated_1.RouteConfig([
            {
                useAsDefault: true,
                path: '',
                component: leaders_list_component_1.LeadersListComponent,
                name: 'LeadersList',
            },
            {
                path: '/:id',
                component: leader_details_component_1.LeaderDetailsComponent,
                name: 'LeaderDetails'
            },
            {
                path: '/dashboard',
                component: dashboard_component_1.DashboardComponent,
                name: 'Dashboard'
            }
        ]), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], LeadersComponent);
    return LeadersComponent;
}());
exports.LeadersComponent = LeadersComponent;
//# sourceMappingURL=leader.component.js.map