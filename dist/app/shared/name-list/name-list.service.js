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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
/**
 * This class provides the NameList service with methods to read names and add names.
 */
var NameListService = (function () {
    /**
     * Creates a new NameListService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function NameListService(http) {
        this.http = http;
        /**
         * The array of initial names provided by the service.
         * @type {Array}
         */
        this.names = [];
    }
    /**
     * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
     * (the local names array is defined and has elements), the cached version is returned
     * @return {string[]} The Observable for the HTTP request.
     */
    NameListService.prototype.get = function () {
        var _this = this;
        if (this.names && this.names.length) {
            return Observable_1.Observable.from([this.names]);
        }
        if (!this.request) {
            this.request = this.http.get('/assets/data.json')
                .map(function (response) { return response.json(); })
                .map(function (data) {
                _this.request = null;
                return _this.names = data;
            });
        }
        return this.request;
    };
    /**
     * Adds the given name to the array of names.
     * @param {string} value - The name to add.
     */
    NameListService.prototype.add = function (value) {
        this.names.push(value);
    };
    NameListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NameListService);
    return NameListService;
}());
exports.NameListService = NameListService;
//# sourceMappingURL=name-list.service.js.map