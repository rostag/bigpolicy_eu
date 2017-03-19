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
require("rxjs/Rx");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var core_1 = require("@angular/core");
var project_1 = require("../../shared/project");
var http_1 = require("@angular/http");
var user_service_1 = require("../../shared/user/user.service");
var ProjectListComponent = (function () {
    function ProjectListComponent(userService, projectService, http) {
        this.userService = userService;
        this.projectService = projectService;
        this.http = http;
        this.pageSize = 5;
        this.projects = new BehaviorSubject_1.BehaviorSubject([{ title: 'Loading...' }]);
        this.itemsPage = {
            docs: this.projects,
            limit: this.pageSize,
            page: 1,
            pages: 0,
            total: 0
        };
        this.isAddingTaskMode = false;
    }
    ProjectListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.leaderId && changes.leaderId.currentValue) {
            this.requestProjects();
        }
        else if (changes.pageSize && changes.pageSize.currentValue) {
            this.requestProjects();
        }
    };
    ProjectListComponent.prototype.pageChanged = function (pageNumber) {
        this.itemsPage.page = pageNumber;
        this.requestProjects();
    };
    ProjectListComponent.prototype.requestProjects = function () {
        var _this = this;
        var proxySub = this.projectService.getProjectsPage(null, this.leaderId, this.itemsPage.page, this.pageSize)
            .subscribe(function (responsePage) {
            _this.itemsPage.docs.next(responsePage['docs']);
            _this.itemsPage.limit = responsePage['limit'];
            _this.itemsPage.page = responsePage['page'];
            _this.itemsPage.pages = responsePage['pages'];
            _this.itemsPage.total = responsePage['total'];
            proxySub.unsubscribe();
        });
    };
    ProjectListComponent.prototype.deleteProject = function (projectToRemove) {
        var updatedProjects;
        this.projects.subscribe(function (projects) {
            updatedProjects = projects.filter(function (project) { return project._id !== projectToRemove._id; });
        });
        this.projects.next(updatedProjects);
        console.log('removed index:', projectToRemove, updatedProjects);
        this.projectService.deleteProject(projectToRemove);
        return false;
    };
    return ProjectListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProjectListComponent.prototype, "leaderId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProjectListComponent.prototype, "pageSize", void 0);
ProjectListComponent = __decorate([
    core_1.Component({
        selector: 'app-project-list',
        templateUrl: './project.list.component.html',
        styleUrls: ['./project.list.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        project_1.ProjectService,
        http_1.Http])
], ProjectListComponent);
exports.ProjectListComponent = ProjectListComponent;
