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
var button_1 = require('@angular2-material/button/button');
var grid_list_1 = require('@angular2-material/grid-list/grid-list');
var card_1 = require('@angular2-material/card');
var icon_1 = require('@angular2-material/icon/icon');
var router_1 = require('@angular/router');
var LandingComponent = (function () {
    function LandingComponent() {
        this.leaderCount = '4';
        this.donorCount = '40';
        this.coinCount = '1344';
    }
    LandingComponent.prototype.supportLeader = function () {
        console.log('support leader');
    };
    LandingComponent = __decorate([
        core_1.Component({
            selector: 'bp-landing',
            moduleId: module.id,
            templateUrl: './landing.component.html',
            styleUrls: ['./skeleton.css', './landing.component.css'],
            directives: [grid_list_1.MD_GRID_LIST_DIRECTIVES, router_1.ROUTER_DIRECTIVES, card_1.MD_CARD_DIRECTIVES, button_1.MdButton, icon_1.MdIcon],
            providers: [icon_1.MdIconRegistry]
        }), 
        __metadata('design:paramtypes', [])
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map