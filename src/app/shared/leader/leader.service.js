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
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var router_1 = require("@angular/router");
var LeaderService = (function () {
    function LeaderService(http, router) {
        this.http = http;
        this.router = router;
        this.apiUrl = '/leader-api/';
        this.leaderSource = new BehaviorSubject_1.BehaviorSubject(this.leader);
        this.leaderStream = this.leaderSource.asObservable();
    }
    LeaderService.prototype.createLeader = function (model, email) {
        var _this = this;
        model.email = email;
        var body = encodeURIComponent(model.toString());
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.apiUrl, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.gotoLeaderView(data);
            console.log('Finalizing leader registration, cleaning localLeader');
            localStorage.removeItem('BigPolicyLeaderRegistration');
        }, function (err) { return function (er) { return console.error('Leader creation error: ', er); }; }, function () { });
    };
    LeaderService.prototype.getLeadersPage = function (leaderId, groupId, page, limit) {
        if (leaderId === void 0) { leaderId = null; }
        if (groupId === void 0) { groupId = null; }
        if (page === void 0) { page = null; }
        if (limit === void 0) { limit = null; }
        var requestUrl = this.apiUrl;
        if (leaderId) {
            requestUrl = this.apiUrl + leaderId;
        }
        if (page !== null && limit !== null) {
            requestUrl = this.apiUrl + 'page/' + page + '/' + limit;
        }
        if (groupId) {
            requestUrl = this.apiUrl + 'group/' + groupId;
        }
        if (page !== null && limit !== null && groupId !== null) {
            requestUrl = this.apiUrl + 'group/' + groupId + '/page/' + page + '/' + limit;
        }
        return this.http.get(requestUrl)
            .map(function (responsePage) {
            return responsePage.json();
        });
    };
    LeaderService.prototype.getLeader = function (leaderId) {
        return this.getLeadersPage(leaderId);
    };
    LeaderService.prototype.requestLeaderByEmail = function (email) {
        var _this = this;
        var leaderResponse = this.http.get(this.apiUrl + 'email/' + email)
            .map(function (res) {
            return res.json();
        });
        leaderResponse.subscribe(function (lead) { return _this.setLeaderForUser(lead); });
        return leaderResponse;
    };
    LeaderService.prototype.findCachedLeaderByEmail = function (email) {
        var leaders = this.models;
        var foundLeader;
        for (var l in leaders) {
            if (leaders[l].email === email) {
                foundLeader = leaders[l];
            }
        }
        return foundLeader;
    };
    LeaderService.prototype.updateLeader = function (model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.apiUrl + model._id, model.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LeaderService.prototype.deleteLeader = function (model) {
        var _this = this;
        this.http.delete(this.apiUrl + model._id)
            .map(function (res) {
            console.log('Leader deleted:', res.json());
            return res;
        })
            .catch(this.handleError)
            .subscribe(function (res) {
            _this.setLeaderForUser(null);
        });
    };
    LeaderService.prototype.get = function () {
        return this.getLeadersPage();
    };
    LeaderService.prototype.setLeaderForUser = function (leader) {
        console.log('👤 Leader service. Set leader for ', leader.email);
        this.leader = leader;
        this.leaderSource.next(leader);
    };
    LeaderService.prototype.handleError = function (error) {
        console.error('Error occured: ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    LeaderService.prototype.gotoLeaderView = function (leader) {
        this.setLeaderForUser(leader);
        var leaderId = leader._id;
        if (leaderId) {
            this.router.navigate(['/leader', leaderId]).then(function (_) {
            });
        }
    };
    return LeaderService;
}());
LeaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router])
], LeaderService);
exports.LeaderService = LeaderService;
