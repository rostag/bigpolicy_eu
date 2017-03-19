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
var leader_1 = require("../../shared/leader");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var drive_1 = require("../../shared/drive");
var user_1 = require("../../shared/user");
var LeaderEditComponent = (function () {
    function LeaderEditComponent(route, router, leaderService, userService, dialog, driveService) {
        this.route = route;
        this.router = router;
        this.leaderService = leaderService;
        this.userService = userService;
        this.dialog = dialog;
        this.driveService = driveService;
        this.leader = new leader_1.LeaderModel();
        this.isUpdateMode = false;
    }
    LeaderEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var p = this.userService.userProfile;
        var fullname = p ? p['name'] : '';
        this.leader.name = fullname.split(' ')[0];
        this.leader.surName = fullname.split(' ')[1];
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            if (id && _this.userService.authenticated()) {
                _this.isUpdateMode = true;
                _this.leaderService.getLeader(id)
                    .subscribe(function (data) {
                    _this.setLeader(data);
                }, function (err) { return console.error(err); }, function () { });
            }
        });
    };
    LeaderEditComponent.prototype.setLeader = function (data) {
        this.leader = new leader_1.LeaderModel();
        this.leader.parseData(data);
        this.driveService.checkConnection();
    };
    LeaderEditComponent.prototype.deleteLeader = function (leader) {
        this.leaderService.deleteLeader(leader);
        this.router.navigate(['/leaders']);
        return false;
    };
    LeaderEditComponent.prototype.onFileListUpdate = function (fileList) {
        var files = [];
        for (var i = 0; i < fileList.length; i++) {
            files.push({
                link: fileList[i].webViewLink,
                name: fileList[i].name
            });
        }
        this.leader.leaderFiles = files;
    };
    LeaderEditComponent.prototype.onSaveLeaderClick = function () {
        var _this = this;
        if (this.isUpdateMode) {
            this.leaderService.updateLeader(this.leader)
                .subscribe(function (data) { _this.leaderService.gotoLeaderView(data); }, function (err) { return function (er) { return console.error('Leader update error: ', er); }; }, function () { });
        }
        else {
            if (!this.userService.authenticated()) {
                this.saveToLocalStorage(this.leader);
                return false;
            }
            this.leaderService.createLeader(this.leader, this.userService.getEmail());
        }
        return false;
    };
    LeaderEditComponent.prototype.saveToLocalStorage = function (leader) {
        console.log('≥≥≥ unauthorised, saving to localStorage');
        localStorage.setItem('BigPolicyLeaderRegistration', leader);
        this.showRegistrationIsNeededWarning();
    };
    LeaderEditComponent.prototype.showRegistrationIsNeededWarning = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ContinueRegistrationDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Заходимо у систему');
            _this.userService.login();
        });
    };
    return LeaderEditComponent;
}());
LeaderEditComponent = __decorate([
    core_1.Component({
        templateUrl: './leader.edit.component.html',
        styleUrls: ['./leader.edit.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        leader_1.LeaderService,
        user_1.UserService,
        material_1.MdDialog,
        drive_1.DriveService])
], LeaderEditComponent);
exports.LeaderEditComponent = LeaderEditComponent;
var ContinueRegistrationDialogComponent = (function () {
    function ContinueRegistrationDialogComponent(dialog) {
        this.dialog = dialog;
    }
    return ContinueRegistrationDialogComponent;
}());
ContinueRegistrationDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-dialog-result-example-dialog',
        template: "\n      <h2 md-dialog-title>\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F</h2>\n      <md-dialog-content>\n        <p>\n          \u0414\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u0457 \u0442\u0440\u0435\u0431\u0430 \u0443\u0432\u0456\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u2014 \u043D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \"\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438\"'\n        </p>\n      </md-dialog-content>\n      <md-dialog-actions [attr.align]=\"actionsAlignment\">\n        <button\n          md-raised-button\n          color=\"primary\"\n          md-dialog-close>\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438</button>\n      </md-dialog-actions>\n  ",
    }),
    __metadata("design:paramtypes", [material_1.MdDialog])
], ContinueRegistrationDialogComponent);
exports.ContinueRegistrationDialogComponent = ContinueRegistrationDialogComponent;
