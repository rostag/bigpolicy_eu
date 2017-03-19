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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this.apiUrl = '/project-api/';
    }
    ProjectService.prototype.createProject = function (model) {
        var body = encodeURIComponent(model.toString());
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl, body, options)
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.getProjectsPage = function (projectId, leaderId, page, limit) {
        if (projectId === void 0) { projectId = null; }
        if (leaderId === void 0) { leaderId = null; }
        if (page === void 0) { page = null; }
        if (limit === void 0) { limit = null; }
        var requestUrl = this.apiUrl;
        if (projectId) {
            requestUrl = this.apiUrl + projectId;
        }
        if (page !== null && limit !== null) {
            requestUrl = this.apiUrl + 'page/' + page + '/' + limit;
        }
        if (leaderId) {
            requestUrl = this.apiUrl + 'leader/' + leaderId;
        }
        if (page !== null && limit !== null && leaderId !== null) {
            requestUrl = this.apiUrl + 'leader/' + leaderId + '/page/' + page + '/' + limit;
        }
        return this.http.get(requestUrl)
            .map(function (responsePage) {
            return responsePage.json();
        });
    };
    ProjectService.prototype.getProject = function (projectId) {
        return this.getProjectsPage(projectId);
    };
    ProjectService.prototype.updateProject = function (model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.apiUrl + model._id, model.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProjectService.prototype.deleteProject = function (model) {
        this.http.delete(this.apiUrl + model._id)
            .map(function (res) { return console.log('Project deleted:', res.json()); })
            .catch(this.handleError)
            .subscribe(function (res) { });
    };
    ProjectService.prototype.handleError = function (error) {
        console.error('Error occured:', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return ProjectService;
}());
ProjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProjectService);
exports.ProjectService = ProjectService;
