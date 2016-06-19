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
var grid_list_1 = require('./grid-list');
var line_1 = require('@angular2-material/core/line/line');
var MdGridTile = (function () {
    function MdGridTile(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._rowspan = 1;
        this._colspan = 1;
    }
    Object.defineProperty(MdGridTile.prototype, "rowspan", {
        get: function () {
            return this._rowspan;
        },
        set: function (value) {
            this._rowspan = grid_list_1.coerceToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdGridTile.prototype, "colspan", {
        get: function () {
            return this._colspan;
        },
        set: function (value) {
            this._colspan = grid_list_1.coerceToNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the style of the grid-tile element.  Needs to be set manually to avoid
     * "Changed after checked" errors that would occur with HostBinding.
     * @internal
     */
    MdGridTile.prototype.setStyle = function (property, value) {
        this._renderer.setElementStyle(this._element.nativeElement, property, value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdGridTile.prototype, "rowspan", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdGridTile.prototype, "colspan", null);
    MdGridTile = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'md-grid-tile',
            host: { 'role': 'listitem' },
            template: "<!-- TODO(kara): Revisit why this is a figure.--> <figure> <ng-content></ng-content> </figure>",
            styles: ["/** * This mixin provides all md-line styles, changing secondary font size * based on whether the list is in dense mode. */ /** * This mixin provides base styles for the wrapper around md-line * elements in a list. */ /** * This mixin normalizes default element styles, e.g. font weight for heading text. */ /* height of tile header or footer if it has one line */ /* height of tile header or footer if it has two lines */ /* side padding for text in tile headers and footers */ /* font styles for text in tile headers and footers */ md-grid-list { display: block; position: relative; } md-grid-tile { display: block; position: absolute; } md-grid-tile figure { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; position: absolute; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; height: 100%; top: 0; right: 0; bottom: 0; left: 0; padding: 0; margin: 0; } md-grid-tile md-grid-tile-header, md-grid-tile md-grid-tile-footer { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; height: 48px; color: #fff; background: rgba(0, 0, 0, 0.18); overflow: hidden; padding: 0 16px; font-size: 16px; position: absolute; left: 0; right: 0; } md-grid-tile md-grid-tile-header [md-line], md-grid-tile md-grid-tile-footer [md-line] { display: block; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; box-sizing: border-box; } md-grid-tile md-grid-tile-header [md-line]:nth-child(n+2), md-grid-tile md-grid-tile-footer [md-line]:nth-child(n+2) { font-size: 12px; } md-grid-tile md-grid-tile-header > *, md-grid-tile md-grid-tile-footer > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-grid-tile md-grid-tile-header.md-2-line, md-grid-tile md-grid-tile-footer.md-2-line { height: 68px; } md-grid-tile .md-grid-list-text { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; width: 100%; box-sizing: border-box; overflow: hidden; } md-grid-tile .md-grid-list-text > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-grid-tile .md-grid-list-text:empty { display: none; } md-grid-tile md-grid-tile-header { top: 0; } md-grid-tile md-grid-tile-footer { bottom: 0; } md-grid-tile [md-grid-avatar] { padding-right: 16px; } [dir='rtl'] md-grid-tile [md-grid-avatar] { padding-right: 0; padding-left: 16px; } md-grid-tile [md-grid-avatar]:empty { display: none; } "],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], MdGridTile);
    return MdGridTile;
}());
exports.MdGridTile = MdGridTile;
var MdGridTileText = (function () {
    function MdGridTileText(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    MdGridTileText.prototype.ngAfterContentInit = function () {
        this._lineSetter = new line_1.MdLineSetter(this._lines, this._renderer, this._element);
    };
    __decorate([
        core_1.ContentChildren(line_1.MdLine), 
        __metadata('design:type', core_1.QueryList)
    ], MdGridTileText.prototype, "_lines", void 0);
    MdGridTileText = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'md-grid-tile-header, md-grid-tile-footer',
            template: "<ng-content select=\"[md-grid-avatar]\"></ng-content> <div class=\"md-grid-list-text\"><ng-content select=\"[md-line]\"></ng-content></div> <ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], MdGridTileText);
    return MdGridTileText;
}());
exports.MdGridTileText = MdGridTileText;
//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/components/grid-list/grid-tile.js.map