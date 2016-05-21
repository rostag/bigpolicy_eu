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
var leader_details_component_1 = require('../details/leader-details.component');
var leader_service_1 = require('../leader/leader.service');
var LeadersListComponent = (function () {
    function LeadersListComponent(_leaderService, _router) {
        this._leaderService = _leaderService;
        this._router = _router;
    }
    LeadersListComponent.prototype.getLeaders = function () {
        var _this = this;
        this._leaderService.getLeaders().then(function (leaders) { return _this.leaders = leaders; });
    };
    LeadersListComponent.prototype.ngOnInit = function () {
        this.getLeaders();
    };
    LeadersListComponent.prototype.onSelect = function (leader) { this.selectedLeader = leader; };
    LeadersListComponent.prototype.gotoDetail = function () {
        var link = ['LeaderDetails', { id: this.selectedLeader.id }];
        this._router.navigate(link);
    };
    LeadersListComponent = __decorate([
        core_1.Component({
            selector: 'my-leaders',
            templateUrl: 'app/leader/list/leaders.list.component.html',
            styleUrls: ['app/leader/list/leaders.list.component.css'],
            directives: [leader_details_component_1.LeaderDetailsComponent],
            providers: [leader_service_1.LeaderService]
        }), 
        __metadata('design:paramtypes', [leader_service_1.LeaderService, router_deprecated_1.Router])
    ], LeadersListComponent);
    return LeadersListComponent;
}());
exports.LeadersListComponent = LeadersListComponent;
//# sourceMappingURL=leaders.list.component.js.map