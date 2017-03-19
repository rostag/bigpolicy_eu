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
var router_1 = require("@angular/router");
var index_1 = require("../../shared/project/index");
var leader_service_1 = require("../../shared/leader/leader.service");
var ProjectEditComponent = (function () {
    function ProjectEditComponent(route, router, projectService, leaderService) {
        this.route = route;
        this.router = router;
        this.projectService = projectService;
        this.leaderService = leaderService;
        this.isUpdateMode = false;
        this.project = new index_1.ProjectModel();
    }
    Object.defineProperty(ProjectEditComponent.prototype, "showTasks", {
        get: function () {
            return this.isUpdateMode;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ProjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.leaderService.getLeadersPage().subscribe();
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            if (id) {
                _this.isUpdateMode = true;
                _this.projectService.getProject(id)
                    .subscribe(function (data) {
                    _this.setProject(data);
                }, function (err) { return console.error(err); }, function () { });
            }
        });
    };
    ProjectEditComponent.prototype.setProject = function (data) {
        this.project = new index_1.ProjectModel();
        this.project.parseData(data);
    };
    ProjectEditComponent.prototype.deleteProject = function (project) {
        this.projectService.deleteProject(project);
        this.router.navigate(['/projects']);
        return false;
    };
    ProjectEditComponent.prototype.saveProject = function () {
        var _this = this;
        if (this.isUpdateMode) {
            this.projectService.updateProject(this.project)
                .subscribe(function (data) { _this.gotoProject(data); }, function (err) { return function (er) { return console.error('Project update error: ', er); }; }, function () { });
        }
        else {
            var leader = this.leaderService.leader;
            if (!leader) {
                return false;
            }
            this.project.managerId = leader._id;
            this.project.managerEmail = leader.email;
            this.project.managerName = leader.name + ' ' + leader.surName;
            this.projectService.createProject(this.project)
                .subscribe(function (data) { _this.gotoProject(data); }, function (err) { return function (er) { return console.error('Project creation error: ', er); }; }, function () { });
        }
        return false;
    };
    ProjectEditComponent.prototype.gotoProject = function (project) {
        var projectId = project._id;
        if (projectId) {
            console.log('𝕱 𝕱 𝕱 Go to project by ID: ', projectId);
            this.router.navigate(['/project', projectId]).then(function (_) {
            });
        }
    };
    return ProjectEditComponent;
}());
ProjectEditComponent = __decorate([
    core_1.Component({
        templateUrl: './project.edit.component.html',
        styleUrls: ['./project.edit.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        index_1.ProjectService,
        leader_service_1.LeaderService])
], ProjectEditComponent);
exports.ProjectEditComponent = ProjectEditComponent;
