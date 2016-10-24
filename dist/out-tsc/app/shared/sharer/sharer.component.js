var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { ShareService } from './share.service';
import { NgForm } from '@angular/forms';
var SharerComponent = (function () {
    function SharerComponent(shareService) {
        this.shareService = shareService;
        this.emailToShare = {
            from: '',
            toEmails: {},
            subject: '',
            html: '',
            videoUrl: ''
        };
        this.state = '';
        this.emailSent = false;
        this.textToReader = 'Друже, хочу поділитися з тобою своїм задумом: ';
        this.showDialog = false;
        this.showEmailPreview = false;
        this.showHtmlPreview = false;
        this.formErrors = {
            'toEmail': ''
        };
        this.validationMessages = {
            'toEmail': {
                'validateEmail': 'Будь ласка, уведи коректну адресу.'
            }
        };
    }
    SharerComponent.prototype.formState = function (stateName) {
        return this.state === stateName;
    };
    ;
    SharerComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    SharerComponent.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.shareForm) {
            return;
        }
        this.shareForm = this.currentForm;
        if (this.shareForm) {
            this.shareForm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    SharerComponent.prototype.onValueChanged = function (data) {
        if (!this.shareForm) {
            return;
        }
        var form = this.shareForm.form;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.touched && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    SharerComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(SharerComponent.prototype, "videoUrl", {
        get: function () {
            return this.emailToShare.videoUrl || this.project.videoUrl || '';
        },
        set: function (url) {
            this.emailToShare.videoUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(SharerComponent.prototype, "emailSubject", {
        get: function () {
            return 'Проект "' + this.project.title + '" - BigPolicy';
        },
        enumerable: true,
        configurable: true
    });
    SharerComponent.prototype.shareProject = function () {
        var _this = this;
        if (!this.shareForm.form.valid) {
            this.state = 'formIsNotComplete';
            return false;
        }
        this.state = 'emailIsBeingSent';
        this.emailToShare.html = this.emailHtml;
        this.emailToShare.from = this.project.managerId;
        this.emailToShare.subject = this.emailSubject;
        this.emailToShare.toEmails[this.toEmail] = this.toEmail;
        this.shareService.shareProject(this.emailToShare)
            .subscribe(function (data) {
            _this.state = 'emailSent';
            console.log('Project Shared', data);
        }, function (err) { return function (err) {
            _this.state = 'emailSendError';
            console.error('Project creation error: ', err);
        }; }, function () { });
        return false;
    };
    Object.defineProperty(SharerComponent.prototype, "emailHtml", {
        get: function () {
            return this.textToReader
                + "<h1 align=\"center\">\n            "
                + this.project.title + "</h1>\n            <p>\n            "
                + this.project.description + "<br><br></p><p align=\"center\">\n            "
                + this.shareService.getYouTubeThumbnail(this.videoUrl, "full")
                + "<br><br>\n            <a href=\"" + this.shareService.getUrl() + "\">\u0422\u0443\u0442 \u043C\u043E\u0436\u043D\u0430 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442</a><br><br></p><p>\n\n            \u0429\u0438\u0440\u043E \u0432\u0434\u044F\u0447\u043D\u0438\u0439,<br>" + this.project.managerName + "<br>\n            <small>" + this.project.managerId + "</small></p>"
                + "\n            <a href=\"http://bigpolicy.eu/\"><img src=\"http://bigpolicy.eu/assets/img/logo.png\" width=\"40\"></a>";
        },
        enumerable: true,
        configurable: true
    });
    SharerComponent.prototype.showSharer = function () {
        this.showDialog = !this.showDialog;
        return false;
    };
    SharerComponent.prototype.toggleEmailPreview = function () {
        this.showEmailPreview = !this.showEmailPreview;
        return false;
    };
    SharerComponent.prototype.toggleHtmlPreview = function () {
        this.showHtmlPreview = !this.showHtmlPreview;
        return false;
    };
    return SharerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", ProjectModel)
], SharerComponent.prototype, "project", void 0);
__decorate([
    ViewChild('shareForm'),
    __metadata("design:type", NgForm)
], SharerComponent.prototype, "currentForm", void 0);
SharerComponent = __decorate([
    Component({
        selector: 'bp-sharer',
        templateUrl: './sharer.component.html',
        styleUrls: ['./sharer.component.css'],
        providers: [ShareService]
    }),
    __metadata("design:paramtypes", [ShareService])
], SharerComponent);
export { SharerComponent };
//# sourceMappingURL=../../../../../src/app/shared/sharer/sharer.component.js.map