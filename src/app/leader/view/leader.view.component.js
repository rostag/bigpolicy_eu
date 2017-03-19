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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/leader/index");
var user_service_1 = require("../../shared/user/user.service");
var router_1 = require("@angular/router");
var LeaderViewComponent = (function () {
    function LeaderViewComponent(userService, router, route, leaderService) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.leaderService = leaderService;
        this.leader = new index_1.LeaderModel();
    }
    LeaderViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            if (id) {
                _this.leaderService.getLeader(id)
                    .subscribe(function (data) {
                    _this.setLeader(data);
                }, function (err) { return console.error(err); }, function () { });
            }
        });
    };
    LeaderViewComponent.prototype.setLeader = function (data) {
        this.leader = data;
    };
    LeaderViewComponent.prototype.deleteLeader = function (leader) {
        this.leaderService.deleteLeader(leader);
        this.router.navigate(['/leaders']);
        return false;
    };
    return LeaderViewComponent;
}());
LeaderViewComponent = __decorate([
    core_1.Component({
        templateUrl: './leader.view.component.html',
        styleUrls: ['./leader.view.component.scss']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute,
        index_1.LeaderService])
], LeaderViewComponent);
exports.LeaderViewComponent = LeaderViewComponent;
