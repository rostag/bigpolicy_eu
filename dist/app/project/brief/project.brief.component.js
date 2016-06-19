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
var card_1 = require('@angular2-material/card/card');
var button_1 = require('@angular2-material/button/button');
var toolbar_1 = require('@angular2-material/toolbar/toolbar');
var icon_1 = require('@angular2-material/icon/icon');
var grid_list_1 = require('@angular2-material/grid-list/grid-list');
var ProjectBriefComponent = (function () {
    function ProjectBriefComponent() {
    }
    ProjectBriefComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './project.brief.component.html',
            styleUrls: ['./project.brief.component.css'],
            directives: [grid_list_1.MD_GRID_LIST_DIRECTIVES, card_1.MdCard, button_1.MdButton, icon_1.MdIcon, toolbar_1.MdToolbar],
            providers: [icon_1.MdIconRegistry]
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectBriefComponent);
    return ProjectBriefComponent;
}());
exports.ProjectBriefComponent = ProjectBriefComponent;
//# sourceMappingURL=project.brief.component.js.map