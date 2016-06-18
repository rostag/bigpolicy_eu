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
var common_1 = require('@angular/common');
var card_1 = require('@angular2-material/card/card');
var button_1 = require('@angular2-material/button/button');
var toolbar_1 = require('@angular2-material/toolbar/toolbar');
var checkbox_1 = require('@angular2-material/checkbox/checkbox');
var input_1 = require('@angular2-material/input/input');
var icon_1 = require('@angular2-material/icon/icon');
var grid_list_1 = require('@angular2-material/grid-list/grid-list');
var index_1 = require('../../shared/name-list/index');
var EditLeaderComponent = (function () {
    function EditLeaderComponent(nameListService) {
        this.nameListService = nameListService;
        this.items = [
            { value: 10 },
            { value: 20 },
            { value: 30 },
            { value: 40 },
            { value: 50 },
        ];
    }
    /*
     * @param newname  any text as input.
     * @returns return false to prevent default form submit behavior to refresh the page.
     */
    EditLeaderComponent.prototype.addName = function () {
        this.nameListService.add(this.newName);
        this.newName = '';
        console.log(this.newName);
        return false;
    };
    EditLeaderComponent.prototype.addABunch = function (n) {
        for (var x = 0; x < n; x++) {
            this.items.push({ value: 5 });
        }
    };
    EditLeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './leader.edit.component.html',
            styleUrls: ['./leader.edit.component.css'],
            directives: [common_1.FORM_DIRECTIVES, card_1.MdCard, checkbox_1.MdCheckbox, button_1.MdButton, icon_1.MdIcon, toolbar_1.MdToolbar, input_1.MD_INPUT_DIRECTIVES, grid_list_1.MD_GRID_LIST_DIRECTIVES],
            providers: [icon_1.MdIconRegistry, index_1.NameListService]
        }), 
        __metadata('design:paramtypes', [index_1.NameListService])
    ], EditLeaderComponent);
    return EditLeaderComponent;
}());
exports.EditLeaderComponent = EditLeaderComponent;
//# sourceMappingURL=leader.edit.component.js.map