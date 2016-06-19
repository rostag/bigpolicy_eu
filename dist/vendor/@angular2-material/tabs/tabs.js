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
var core_2 = require('@angular/core');
var core_3 = require('@angular/core');
var portal_directives_1 = require('@angular2-material/core/portal/portal-directives');
var tab_label_1 = require('./tab-label');
var tab_content_1 = require('./tab-content');
var tab_label_wrapper_1 = require('./tab-label-wrapper');
var ink_bar_1 = require('./ink-bar');
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
var MdTabGroup = (function () {
    function MdTabGroup(_zone) {
        this._zone = _zone;
        this.selectedIndex = 0;
        this._focusIndex = 0;
        this._groupId = nextId++;
    }
    /**
     * Waits one frame for the view to update, then upates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    MdTabGroup.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            window.requestAnimationFrame(function () {
                _this._updateInkBar();
            });
        });
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    MdTabGroup.prototype._updateInkBar = function () {
        this._inkBar.toArray()[0].alignToElement(this._currentLabelWrapper);
    };
    Object.defineProperty(MdTabGroup.prototype, "_currentLabelWrapper", {
        /**
         * Reference to the current label wrapper; defaults to null for initial render before the
         * ViewChildren references are ready.
         */
        get: function () {
            return this._labelWrappers
                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () {
            return this._focusIndex;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            this._focusIndex = value;
            if (this._labelWrappers && this._labelWrappers.length) {
                this._labelWrappers.toArray()[value].focus();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a unique id for each tab label element
     * @internal
     */
    MdTabGroup.prototype.getTabLabelId = function (i) {
        return "md-tab-label-" + this._groupId + "-" + i;
    };
    /**
     * Returns a unique id for each tab content element
     * @internal
     */
    MdTabGroup.prototype.getTabContentId = function (i) {
        return "md-tab-content-" + this._groupId + "-" + i;
    };
    /** Increment the focus index by 1; prevent going over the number of tabs */
    MdTabGroup.prototype.focusNextTab = function () {
        if (this._labelWrappers && this.focusIndex < this._labelWrappers.length - 1) {
            this.focusIndex++;
        }
    };
    /** Decrement the focus index by 1; prevent going below 0 */
    MdTabGroup.prototype.focusPreviousTab = function () {
        if (this.focusIndex > 0) {
            this.focusIndex--;
        }
    };
    __decorate([
        core_3.ContentChildren(tab_label_1.MdTabLabel), 
        __metadata('design:type', core_2.QueryList)
    ], MdTabGroup.prototype, "labels", void 0);
    __decorate([
        core_3.ContentChildren(tab_content_1.MdTabContent), 
        __metadata('design:type', core_2.QueryList)
    ], MdTabGroup.prototype, "contents", void 0);
    __decorate([
        core_1.ViewChildren(tab_label_wrapper_1.MdTabLabelWrapper), 
        __metadata('design:type', core_2.QueryList)
    ], MdTabGroup.prototype, "_labelWrappers", void 0);
    __decorate([
        core_1.ViewChildren(ink_bar_1.MdInkBar), 
        __metadata('design:type', core_2.QueryList)
    ], MdTabGroup.prototype, "_inkBar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MdTabGroup.prototype, "selectedIndex", void 0);
    MdTabGroup = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'md-tab-group',
            template: "<div class=\"md-tab-header\" role=\"tablist\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\"> <div class=\"md-tab-label\" role=\"tab\" md-tab-label-wrapper *ngFor=\"let label of labels; let i = index\" [id]=\"getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.md-active]=\"selectedIndex == i\" (click)=\"focusIndex = selectedIndex = i\"> <template [portalHost]=\"label\"></template> </div> <md-ink-bar></md-ink-bar> </div> <div class=\"md-tab-body-wrapper\"> <div class=\"md-tab-body\" *ngFor=\"let content of contents; let i = index\" [id]=\"getTabContentId(i)\" [class.md-active]=\"selectedIndex == i\" [attr.aria-labelledby]=\"getTabLabelId(i)\"> <template role=\"tabpanel\" [portalHost]=\"content\" *ngIf=\"selectedIndex == i\"></template> </div> </div> ",
            styles: [":host { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; font-family: Roboto, \"Helvetica Neue\", sans-serif; min-height: 248px; } /** The top section of the view; contains the tab labels */ .md-tab-header { overflow: hidden; position: relative; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; border-bottom: 1px solid #e0e0e0; -webkit-flex-shrink: 0; -ms-flex-negative: 0; flex-shrink: 0; } /** Wraps each tab label */ .md-tab-label { line-height: 48px; height: 48px; padding: 0 12px; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; cursor: pointer; box-sizing: border-box; color: currentColor; opacity: 0.6; min-width: 160px; text-align: center; } .md-tab-label:focus { outline: none; opacity: 1; background-color: rgba(178, 223, 219, 0.3); } /** The bottom section of the view; contains the tab bodies */ .md-tab-body-wrapper { position: relative; overflow: hidden; -webkit-box-flex: 1; -webkit-flex-grow: 1; -ms-flex-positive: 1; flex-grow: 1; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; } /** Wraps each tab body */ .md-tab-body { display: none; overflow: auto; box-sizing: border-box; -webkit-box-flex: 1; -webkit-flex-grow: 1; -ms-flex-positive: 1; flex-grow: 1; -webkit-flex-shrink: 1; -ms-flex-negative: 1; flex-shrink: 1; } .md-tab-body.md-active { display: block; } /** The colored bar that underlines the active tab */ md-ink-bar { position: absolute; bottom: 0; height: 2px; background-color: #009688; -webkit-transition: 0.35s ease-out; transition: 0.35s ease-out; } "],
            directives: [portal_directives_1.PortalHostDirective, tab_label_wrapper_1.MdTabLabelWrapper, ink_bar_1.MdInkBar],
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], MdTabGroup);
    return MdTabGroup;
}());
exports.MdTabGroup = MdTabGroup;
exports.MD_TABS_DIRECTIVES = [MdTabGroup, tab_label_1.MdTabLabel, tab_content_1.MdTabContent];
//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/components/tabs/tabs.js.map