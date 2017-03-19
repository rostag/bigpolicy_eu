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
var project_1 = require("../../shared/project");
var leader_1 = require("../../shared/leader");
var user_1 = require("../../shared/user");
var LandingComponent = (function () {
    function LandingComponent(userService, projectService, leaderService) {
        this.userService = userService;
        this.projectService = projectService;
        this.leaderService = leaderService;
        this.app = {
            donors: 0,
            totalDonationsReceived: 0,
            projects: [],
            leaders: []
        };
    }
    LandingComponent.prototype.ngOnInit = function () {
        this.getProjects();
        this.getLeaders();
    };
    LandingComponent.prototype.getLeaders = function () {
        var _this = this;
        this.leaderService.getLeadersPage()
            .subscribe(function (data) { return _this.setLeaders(data); }, function (err) { return console.error(err); }, function () { return _this.app.leaders; });
    };
    LandingComponent.prototype.setLeaders = function (data) {
        this.app.leaders = data;
        return data;
    };
    LandingComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjectsPage()
            .subscribe(function (data) { return _this.setProjects(data); }, function (err) { return console.error(err); }, function () { return _this.app.projects; });
    };
    LandingComponent.prototype.setProjects = function (data) {
        this.app.projects = data;
        return data;
    };
    LandingComponent.prototype.supportLeader = function () {
        console.log('support leader');
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    core_1.Component({
        selector: 'app-bp-landing',
        templateUrl: './landing.component.html',
        styleUrls: ['./skeleton.css', './landing.component.scss'],
    }),
    __metadata("design:paramtypes", [user_1.UserService,
        project_1.ProjectService,
        leader_1.LeaderService])
], LandingComponent);
exports.LandingComponent = LandingComponent;
