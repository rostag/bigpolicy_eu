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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var index_1 = require("../../shared/leader/index");
var http_1 = require("@angular/http");
var user_service_1 = require("../../shared/user/user.service");
var LeaderListComponent = (function () {
    function LeaderListComponent(userService, http, leaderService) {
        this.userService = userService;
        this.http = http;
        this.leaderService = leaderService;
        this.pageSize = 5;
        this.leadersUrl = '/leader-api/';
        this.leaders = new BehaviorSubject_1.BehaviorSubject([{ title: 'Loading...' }]);
        this.itemsPage = {
            docs: this.leaders,
            limit: this.pageSize,
            page: 1,
            pages: 0,
            total: 0
        };
    }
    LeaderListComponent.prototype.ngOnInit = function () {
        this.requestLeaders();
    };
    LeaderListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.groupId && changes.groupId.currentValue) {
            this.requestLeaders();
        }
        else if (changes.pageSize && changes.pageSize.currentValue) {
            this.requestLeaders();
        }
    };
    LeaderListComponent.prototype.pageChanged = function (pageNumber) {
        this.itemsPage.page = pageNumber;
        this.requestLeaders();
    };
    LeaderListComponent.prototype.requestLeaders = function () {
        var _this = this;
        var proxySub = this.leaderService.getLeadersPage(null, this.groupId, this.itemsPage.page, this.pageSize)
            .subscribe(function (responsePage) {
            _this.itemsPage.docs.next(responsePage['docs']);
            _this.itemsPage.limit = responsePage['limit'];
            _this.itemsPage.page = responsePage['page'];
            _this.itemsPage.pages = responsePage['pages'];
            _this.itemsPage.total = responsePage['total'];
            proxySub.unsubscribe();
        });
    };
    LeaderListComponent.prototype.deleteLeader = function (leaderToRemove) {
        var updatedLeaders;
        this.leaders.subscribe(function (projects) {
            updatedLeaders = projects.filter(function (project) { return project._id !== leaderToRemove._id; });
        });
        this.leaders.next(updatedLeaders);
        this.leaderService.deleteLeader(leaderToRemove);
        return false;
    };
    return LeaderListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LeaderListComponent.prototype, "groupId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LeaderListComponent.prototype, "pageSize", void 0);
LeaderListComponent = __decorate([
    core_1.Component({
        selector: 'app-leader-list',
        templateUrl: './leader.list.component.html',
        styleUrls: ['./leader.list.component.scss']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        http_1.Http,
        index_1.LeaderService])
], LeaderListComponent);
exports.LeaderListComponent = LeaderListComponent;
