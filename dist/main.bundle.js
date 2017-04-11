webpackJsonp([1,4],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_service__ = __webpack_require__(43);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__user_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_model__ = __webpack_require__(631);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_component__ = __webpack_require__(222);
/* unused harmony namespace reexport */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1314:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(536);


/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dialog_component__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.confirm = function (title, message, btnOkText, btnCancelText, viewContainerRef) {
        // Docs: https://material.angular.io/components/component/dialog
        // http://www.madhur.co.in/blog/2017/03/26/angular-confirmation-dialog.html
        if (btnOkText === void 0) { btnOkText = 'Ok'; }
        if (btnCancelText === void 0) { btnCancelText = 'Cancel'; }
        var dialogRef;
        var dialogConfig = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogConfig */]();
        dialogConfig.viewContainerRef = viewContainerRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_0__dialog_component__["a" /* DialogComponent */], dialogConfig);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        var result = dialogRef.afterClosed();
        return result;
    };
    return DialogService;
}());
DialogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _a || Object])
], DialogService);

var _a;
//# sourceMappingURL=dialog.service.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_dialog_dialog_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_task_task_service__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_model__ = __webpack_require__(375);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Provides ProjectList service with methods to get and save projects.
 */
var ProjectService = (function () {
    /**
     * Creates a new ProjectService with the injected Http.
     * @param {http} http - The injected Http.
     * @constructor
     */
    function ProjectService(http, router, dialogService, taskService) {
        this.http = http;
        this.router = router;
        this.dialogService = dialogService;
        this.taskService = taskService;
        this.projectApiUrl = '/project-api/';
    }
    ProjectService.cacheProject = function (project) {
        this._cachedProjects[project._id] = project;
        // console.log('cache project: ', this._cachedProjects[project._id]);
    };
    ProjectService.getCachedProject = function (projectId) {
        // console.log('get cached project by id:', projectId, ': ', this._cachedProjects[projectId]);
        return this._cachedProjects[projectId] || {};
    };
    /**
     * Creates new Project.
     * @param {ProjectModel} model Project to create.
     */
    ProjectService.prototype.createProject = function (model) {
        var body = encodeURIComponent(model.toString());
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.post(this.projectApiUrl, body, options)
            .map(function (res) { return res.json(); });
    };
    /**
     * Gets Projects page from DB by given projectId, leaderId, page and limit
     * Returns an Observable for the HTTP GET request.
     * @return {string[]} The Observable for the HTTP request.
     */
    ProjectService.prototype.getProjectsPage = function (projectId, leaderId, page, limit, dbQuery) {
        if (projectId === void 0) { projectId = null; }
        if (leaderId === void 0) { leaderId = null; }
        if (page === void 0) { page = null; }
        if (limit === void 0) { limit = null; }
        if (dbQuery === void 0) { dbQuery = '{}'; }
        var requestUrl;
        // Project by ID :: project-api/:projectId
        if (projectId) {
            requestUrl = this.projectApiUrl + projectId;
        }
        // Page of Projects :: project-api/page/:page/:limit/q/:dbQuery
        if (page !== null && limit !== null) {
            requestUrl = this.projectApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
        }
        // Page of Projects for Leader :: project-api/leader/:leaderId/page/:page/:limit/q/:dbQuery
        if (page !== null && limit !== null && leaderId !== null) {
            requestUrl = this.projectApiUrl + 'leader/' + leaderId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
        }
        // console.log('get Projects Page:', projectId, leaderId, page, limit);
        return this.http.get(requestUrl)
            .map(function (responsePage) {
            // console.log('Projects Page loaded, response: ', responsePage);
            return responsePage.json();
        });
    };
    /**
     * Returns single project from DB
     */
    ProjectService.prototype.getProject = function (projectId) {
        return this.getProjectsPage(projectId);
    };
    /**
     * Updates a model by performing a request with PUT HTTP method.
     * @param ProjectModel A Project to update
     */
    ProjectService.prototype.updateProject = function (model) {
        // TODO Consider encoding the body like in create project above
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.projectApiUrl + model._id, model.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
     * Updates multiple projects by performing a request with PUT HTTP method.
     * @param ids {Array} Project IDs to update
     * @param data {Object} The data to be applied during update in {field: name} format
     */
    ProjectService.prototype.bulkUpdateProjects = function (ids, data) {
        // TODO Consider encoding the body like in create project above
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify({ ids: ids, data: data });
        console.log('Project service, try to update:', ids, data, body);
        return this.http.put(this.projectApiUrl + 'bulk-update', body, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
     * Deletes a Project by performing a request with DELETE HTTP method.
     * @param ProjectModel A Project to delete
     */
    ProjectService.prototype.deleteProject = function (model, navigateToList) {
        var _this = this;
        if (navigateToList === void 0) { navigateToList = true; }
        // Show Delete Confirmation Dialog
        var dialogResult = this.dialogService.confirm('Точно видалити?', 'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');
        dialogResult.subscribe(function (toDelete) {
            if (toDelete === true) {
                // Delete Project immediately and, if there are tasks, re-assign them to other Project (placeholder)
                _this.finalizeProjectDeletion(model, navigateToList);
                if (model.tasks && model.tasks.length > 0) {
                    _this.dialogService.confirm('Що робити з заходами?', "\u041F\u0440\u043E\u0435\u043A\u0442 \u043C\u0430\u0454 \u0437\u0430\u0445\u043E\u0434\u0438. \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0457\u0445, \u0447\u0438 \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0443 \u0441\u0438\u0441\u0442\u0435\u043C\u0456, \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0448\u0438\n            \u0434\u043E \u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0435\u043A\u0442\u0443 \"\u041D\u0435 \u043D\u0430 \u0447\u0430\u0441\u0456\"?", 'Видалити', 'Залишити у системі')
                        .subscribe(function (toDeleteTasks) {
                        if (toDeleteTasks === true) {
                            // Delete Tasks from DB
                            // TODO Delete Tasks Firebase data
                            // TODO Delete Donations and Task Donations?
                            _this.taskService.bulkDeleteTasks(model.tasks)
                                .subscribe(function (deleteResult) { console.log('Tasks deleted:', deleteResult); });
                        }
                        else {
                            // Reassign tasks to another Project (placeholder)
                            // FIXME - Retrieve real Placeholder project
                            var newProject = new __WEBPACK_IMPORTED_MODULE_7__project_model__["a" /* ProjectModel */]();
                            newProject._id = 'NE_NA_CHASI';
                            var tasksUpdate = _this.taskService.bulkUpdateTasks(model.tasks, { projectId: newProject._id });
                            tasksUpdate.subscribe(function (updateResult) { console.log('Tasks update result:', updateResult); });
                        }
                        _this.finalizeProjectDeletion(model, navigateToList);
                    });
                } // If Task reassignment was needed
            }
        });
        return dialogResult;
    };
    /*
     * Deletes Project
     */
    ProjectService.prototype.finalizeProjectDeletion = function (projectModel, navigateToList) {
        var _this = this;
        if (navigateToList === void 0) { navigateToList = true; }
        // TODO Delete Project Firebase data
        this.http.delete(this.projectApiUrl + projectModel._id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe(function (res) {
            if (navigateToList) {
                _this.router.navigate(['/projects']);
            }
        });
    };
    /**
     * Deletes multiple projects by performing a request with PUT HTTP method.
     * @param ids Project IDs to delete
     */
    ProjectService.prototype.bulkDeleteProjects = function (ids) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify({ ids: ids });
        console.log('Project service, try to delete:', ids, body);
        return this.http.put(this.projectApiUrl + 'bulk-delete', body, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProjectService.prototype.handleError = function (error) {
        console.error('Error occured:', error);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return ProjectService;
}());
// TODO Implement caching
ProjectService._cachedProjects = [];
ProjectService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_dialog_dialog_service__["a" /* DialogService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared_task_task_service__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_task_task_service__["a" /* TaskService */]) === "function" && _d || Object])
], ProjectService);

var _a, _b, _c, _d;
//# sourceMappingURL=project.service.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_service__ = __webpack_require__(377);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__task_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task_model__ = __webpack_require__(627);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__task_model__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leader__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2____ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(leaderService, userService) {
        this.leaderService = leaderService;
        this.userService = userService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.leaderService.leaderStream
            .subscribe(function (item) {
            console.log('ProfileComponent. set profile leader:', item);
            _this.profileLeader = item;
        });
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(973),
        styles: [__webpack_require__(903)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__leader__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__leader__["b" /* LeaderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2____["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2____["a" /* UserService */]) === "function" && _b || Object])
], ProfileComponent);

var _a, _b;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "/*\n* Skeleton V2.0.4\n* Copyright 2014, Dave Gamache\n* www.getskeleton.com\n* Free to use under the MIT license.\n* http://www.opensource.org/licenses/mit-license.php\n* 12/29/2014\n*/\n\n\n/* Table of contents\n––––––––––––––––––––––––––––––––––––––––––––––––––\n- Grid\n- Base Styles\n- Typography\n- Links\n- Buttons\n- Forms\n- Lists\n- Code\n- Tables\n- Spacing\n- Utilities\n- Clearing\n- Media Queries\n*/\n\n\n/* Grid\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.container {\n  position: relative;\n  width: 100%;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 0 20px;\n  box-sizing: border-box; }\n.column,\n.columns {\n  width: 100%;\n  float: left;\n  box-sizing: border-box; }\n\n/* For devices larger than 400px */\n@media (min-width: 400px) {\n  .container {\n    width: 85%;\n    padding: 0; }\n}\n\n/* For devices larger than 550px */\n@media (min-width: 550px) {\n  .container {\n    width: 80%; }\n  .column,\n  .columns {\n    margin-left: 4%; }\n  .column:first-child,\n  .columns:first-child {\n    margin-left: 0; }\n\n  .one.column,\n  .one.columns                    { width: 4.66666666667%; }\n  .two.columns                    { width: 13.3333333333%; }\n  .three.columns                  { width: 22%;            }\n  .four.columns                   { width: 30.6666666667%; }\n  .five.columns                   { width: 39.3333333333%; }\n  .six.columns                    { width: 48%;            }\n  .seven.columns                  { width: 56.6666666667%; }\n  .eight.columns                  { width: 65.3333333333%; }\n  .nine.columns                   { width: 74.0%;          }\n  .ten.columns                    { width: 82.6666666667%; }\n  .eleven.columns                 { width: 91.3333333333%; }\n  .twelve.columns                 { width: 100%; margin-left: 0; }\n\n  .one-third.column               { width: 30.6666666667%; }\n  .two-thirds.column              { width: 65.3333333333%; }\n\n  .one-half.column                { width: 48%; }\n\n  /* Offsets */\n  .offset-by-one.column,\n  .offset-by-one.columns          { margin-left: 8.66666666667%; }\n  .offset-by-two.column,\n  .offset-by-two.columns          { margin-left: 17.3333333333%; }\n  .offset-by-three.column,\n  .offset-by-three.columns        { margin-left: 26%;            }\n  .offset-by-four.column,\n  .offset-by-four.columns         { margin-left: 34.6666666667%; }\n  .offset-by-five.column,\n  .offset-by-five.columns         { margin-left: 43.3333333333%; }\n  .offset-by-six.column,\n  .offset-by-six.columns          { margin-left: 52%;            }\n  .offset-by-seven.column,\n  .offset-by-seven.columns        { margin-left: 60.6666666667%; }\n  .offset-by-eight.column,\n  .offset-by-eight.columns        { margin-left: 69.3333333333%; }\n  .offset-by-nine.column,\n  .offset-by-nine.columns         { margin-left: 78.0%;          }\n  .offset-by-ten.column,\n  .offset-by-ten.columns          { margin-left: 86.6666666667%; }\n  .offset-by-eleven.column,\n  .offset-by-eleven.columns       { margin-left: 95.3333333333%; }\n\n  .offset-by-one-third.column,\n  .offset-by-one-third.columns    { margin-left: 34.6666666667%; }\n  .offset-by-two-thirds.column,\n  .offset-by-two-thirds.columns   { margin-left: 69.3333333333%; }\n\n  .offset-by-one-half.column,\n  .offset-by-one-half.columns     { margin-left: 52%; }\n\n}\n\n\n/* Base Styles\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n/* NOTE\nhtml is set to 62.5% so that all the REM measurements throughout Skeleton\nare based on 10px sizing. So basically 1.5rem = 15px :) */\nhtml {\n  font-size: 62.5%; }\nbody {\n  font-size: 1.5em; /* currently ems cause chrome bug misinterpreting rems on body element */\n  line-height: 1.6;\n  font-weight: 400;\n  font-family: \"Raleway\", \"HelveticaNeue\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  color: #222; }\n\n\n/* Typography\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: 300; }\nh1 { font-size: 4.0rem; line-height: 1.2;  letter-spacing: -.1rem;}\nh2 { font-size: 3.6rem; line-height: 1.25; letter-spacing: -.1rem; }\nh3 { font-size: 3.0rem; line-height: 1.3;  letter-spacing: -.1rem; }\nh4 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -.08rem; }\nh5 { font-size: 1.8rem; line-height: 1.5;  letter-spacing: -.05rem; }\nh6 { font-size: 1.5rem; line-height: 1.6;  letter-spacing: 0; }\n\n/* Larger than phablet */\n@media (min-width: 550px) {\n  h1 { font-size: 5.0rem; }\n  h2 { font-size: 4.2rem; }\n  h3 { font-size: 3.6rem; }\n  h4 { font-size: 3.0rem; }\n  h5 { font-size: 2.4rem; }\n  h6 { font-size: 1.5rem; }\n}\n\np {\n  margin-top: 0; }\n\n\n/* Links\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\na {\n  color: #1EAEDB; }\na:hover {\n  color: #0FA0CE; }\n\n\n/* Buttons\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.button,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  display: inline-block;\n  /*height: 38px;*/\n  /*padding: 0 30px;*/\n  /*color: #555;*/\n  /*text-align: center;*/\n  /*font-size: 11px;*/\n  /*font-weight: 600;*/\n  /*line-height: 38px;*/\n  /*letter-spacing: .1rem;*/\n  /*text-transform: uppercase;*/\n  text-decoration: none;\n  white-space: nowrap;\n  /*background-color: transparent;\n  border-radius: 4px;\n  border: 1px solid #bbb;*/\n  cursor: pointer;\n  box-sizing: border-box; }\n.button:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.button:focus,\nbutton:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  color: #333;\n  border-color: #888;\n  outline: 0; }\n.button.button-primary,\nbutton.button-primary,\ninput[type=\"submit\"].button-primary,\ninput[type=\"reset\"].button-primary,\ninput[type=\"button\"].button-primary {\n  color: #FFF;\n  background-color: #33C3F0;\n  border-color: #33C3F0; }\n.button.button-primary:hover,\nbutton.button-primary:hover,\ninput[type=\"submit\"].button-primary:hover,\ninput[type=\"reset\"].button-primary:hover,\ninput[type=\"button\"].button-primary:hover,\n.button.button-primary:focus,\nbutton.button-primary:focus,\ninput[type=\"submit\"].button-primary:focus,\ninput[type=\"reset\"].button-primary:focus,\ninput[type=\"button\"].button-primary:focus {\n  color: #FFF;\n  background-color: #1EAEDB;\n  border-color: #1EAEDB; }\n\n\n/* Forms\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ntextarea,\nselect {\n  height: 38px;\n  padding: 6px 10px; /* The 6px vertically centers text on FF, ignored by Webkit */\n  background-color: #fff;\n  border: 1px solid #D1D1D1;\n  border-radius: 4px;\n  box-shadow: none;\n  box-sizing: border-box; }\n/* Removes awkward default styles on some inputs for iOS */\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ntextarea {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\ntextarea {\n  min-height: 65px;\n  padding-top: 6px;\n  padding-bottom: 6px; }\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ntextarea:focus,\nselect:focus {\n  border: 1px solid #33C3F0;\n  outline: 0; }\nlabel,\nlegend {\n  display: block;\n  margin-bottom: .5rem;\n  font-weight: 600; }\nfieldset {\n  padding: 0;\n  border-width: 0; }\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\nlabel > .label-body {\n  display: inline-block;\n  margin-left: .5rem;\n  font-weight: normal; }\n\n\n/* Lists\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nul {\n  list-style: circle inside; }\nol {\n  list-style: decimal inside; }\nol, ul {\n  padding-left: 0;\n  margin-top: 0; }\nul ul,\nul ol,\nol ol,\nol ul {\n  margin: 1.5rem 0 1.5rem 3rem;\n  font-size: 90%; }\nli {\n  margin-bottom: 1rem; }\n\n\n/* Code\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\ncode {\n  padding: .2rem .5rem;\n  margin: 0 .2rem;\n  font-size: 90%;\n  white-space: nowrap;\n  background: #F1F1F1;\n  border: 1px solid #E1E1E1;\n  border-radius: 4px; }\npre > code {\n  display: block;\n  padding: 1rem 1.5rem;\n  white-space: pre; }\n\n\n/* Tables\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nth,\ntd {\n  padding: 12px 15px;\n  text-align: left;\n  border-bottom: 1px solid #E1E1E1; }\nth:first-child,\ntd:first-child {\n  padding-left: 0; }\nth:last-child,\ntd:last-child {\n  padding-right: 0; }\n\n\n/* Spacing\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nbutton,\n.button {\n  margin-bottom: 1rem; }\ninput,\ntextarea,\nselect,\nfieldset {\n  margin-bottom: 1.5rem; }\npre,\nblockquote,\ndl,\nfigure,\ntable,\np,\nul,\nol,\nform {\n  margin-bottom: 2.5rem; }\n\n\n/* Utilities\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.u-full-width {\n  width: 100%;\n  box-sizing: border-box; }\n.u-max-full-width {\n  max-width: 100%;\n  box-sizing: border-box; }\n.u-pull-right {\n  float: right; }\n.u-pull-left {\n  float: left; }\n\n\n/* Misc\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nhr {\n  margin-top: 3rem;\n  margin-bottom: 3.5rem;\n  border-width: 0;\n  border-top: 1px solid #E1E1E1; }\n\n\n/* Clearing\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n\n/* Self Clearing Goodness */\n.container:after,\n.row:after,\n.u-cf {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n\n/* Media Queries\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n/*\nNote: The best way to structure the use of media queries is to create the queries\nnear the relevant code. For example, if you wanted to change the styles for buttons\non small devices, paste the mobile query code up in the buttons section and style it\nthere.\n*/\n\n\n/* Larger than mobile */\n@media (min-width: 400px) {}\n\n/* Larger than phablet (also point when grid becomes active) */\n@media (min-width: 550px) {}\n\n/* Larger than tablet */\n@media (min-width: 750px) {}\n\n/* Larger than desktop */\n@media (min-width: 1000px) {}\n\n/* Larger than Desktop HD */\n@media (min-width: 1200px) {}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_about_component__ = __webpack_require__(600);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_about_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_project_project_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_version_json__ = __webpack_require__(938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_version_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__app_version_json__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(userService, projectService) {
        this.userService = userService;
        this.projectService = projectService;
        this.title = 'BigPolicy';
        this.version = __WEBPACK_IMPORTED_MODULE_3__app_version_json__["app-version"];
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('• BP app v. ' + this.version + '. User service: ', this.userService);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(952),
        styles: [__webpack_require__(882)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_user_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_project_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_project_project_service__["a" /* ProjectService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_user__ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(userService) {
        this.userService = userService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(953),
        styles: [__webpack_require__(883)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_user__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_user__["a" /* UserService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_landing_component__ = __webpack_require__(606);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_landing_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leader_edit_component__ = __webpack_require__(608);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__leader_edit_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leader_list_component__ = __webpack_require__(609);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__leader_list_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leader_view_component__ = __webpack_require__(610);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__leader_view_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__project_edit_component__ = __webpack_require__(612);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__project_edit_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__projects_component__ = __webpack_require__(613);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__projects_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__project_view_component__ = __webpack_require__(616);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__project_view_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
  * Dialog — for FTUX's lazy registration, content deletion etc
  */
var DialogComponent = (function () {
    function DialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return DialogComponent;
}());
DialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dialog',
        template: " <md-icon class=\"inline-icon\">info</md-icon>\n\n      <div class=\"styled\">\n        <h3 md-dialog-title>{{title}}</h3>\n\n        <md-dialog-content>\n          {{ message }}\n        </md-dialog-content>\n\n        <md-dialog-actions>\n          <button md-raised-button color=\"primary\" (click)=\"dialogRef.close(true)\">{{btnOkText}}</button>\n          <button md-button color=\"primary\" (click)=\"dialogRef.close(false)\">{{btnCancelText}}</button>\n        </md-dialog-actions>\n      </div>\n    ",
        styles: [__webpack_require__(894)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialogRef */]) === "function" && _a || Object])
], DialogComponent);

var _a;
//# sourceMappingURL=dialog.component.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DonateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DonateComponent = (function () {
    function DonateComponent(sanitizer, donationService, userService) {
        this.sanitizer = sanitizer;
        this.donationService = donationService;
        this.userService = userService;
        this.targetType = 'leader';
        this.label = 'Підтримати:';
        this.donationFormHtml = '';
        this.readyToDonate = false;
        this.donationsListVisible = false;
    }
    /**
     * Populate target properties when it's ready from parent component
     */
    DonateComponent.prototype.ngOnChanges = function (changes) {
        if (changes.target) {
        }
    };
    DonateComponent.prototype.onDonateToggle = function () {
        var _this = this;
        console.log('onDonateToggle:', this.target, this.amount);
        this.target.totalDonationsReceived += this.amount;
        // FIXME implement order status check
        this.donationService.createDonation(this.getDonationModel())
            .subscribe(function (res) {
            var b = res['_body'];
            var id = b.substring(1, b.length - 1);
            // TODO if not virtual transaction
            _this.readyToDonate = !_this.readyToDonate;
            _this.getDonationForm(id);
        });
        return false;
    };
    DonateComponent.prototype.getDonationModel = function () {
        var d = new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* DonationModel */]();
        var userProfile = this.userService.userProfile;
        var donorName = userProfile && userProfile['name'] || 'Анонімний донор';
        // FIXME
        d.targetType = this.targetType;
        d.targetId = this.target._id;
        d.donorId = this.userService.getEmail() || 'Anonymous';
        d.amount = this.amount;
        d.dateStarted = new Date();
        var wl = window.location;
        d.server_url = wl.protocol + '//' + wl.host;
        d.result_url = wl.href;
        console.log('##server_url: ', d.server_url);
        if (this.targetType === 'leader') {
            d.description = 'Переказ ' + d.amount + ' UAH. Отримувач: ' + this.target.name + ' ' + this.target.surName +
                '. Донор: ' + donorName + '. Дякуємо!';
        }
        else if (this.targetType === 'project') {
            d.description = 'Переказ ' + d.amount + ' UAH. Призначення: проект "' + this.target.title + '". Донор: ' + donorName + '. Дякуємо!';
        }
        else if (this.targetType === 'task') {
            d.description = 'Переказ ' + d.amount + ' UAH. Призначення: захід "' + this.target.title + '". Донор: ' + donorName + '. Дякуємо!';
        }
        return d;
    };
    // FIXME Fix Button Display
    DonateComponent.prototype.getDonationForm = function (_id) {
        var _this = this;
        var model = this.getDonationModel();
        model._id = _id;
        return this.donationService.requireSign(model)
            .map(function (res) {
            return res;
        })
            .subscribe(function (res) {
            var sgndta = res['_body'].split('-BGPLCXX-');
            var formStr = '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8"><input type="hidden" name="data" ' +
                'value="' + sgndta[0] + '" /><input type="hidden" name="signature" value="' + sgndta[1] + '" />' +
                '<button md-raised-button style="font-size:1.1em;font-weight:bold;padding:0.8em;cursor:pointer;" color="accent">Переказати '
                + _this.amount + ' UAH</button>' +
                '</form>';
            // FIXME - Update button visual style, broken after ng update
            _this.donationFormHtml = _this.sanitizer.bypassSecurityTrustHtml(formStr);
        });
    };
    DonateComponent.prototype.onToggleDonationsList = function () {
        this.donationsListVisible = !this.donationsListVisible;
    };
    return DonateComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonateComponent.prototype, "target", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], DonateComponent.prototype, "amount", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonateComponent.prototype, "targetType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonateComponent.prototype, "label", void 0);
DonateComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-donate',
        template: __webpack_require__(964),
        styles: [__webpack_require__(895)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__index__["a" /* DonationService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__index__["a" /* DonationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__index__["a" /* DonationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */]) === "function" && _c || Object])
], DonateComponent);

var _a, _b, _c;
//# sourceMappingURL=donate.component.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DonationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Provides the donation service with methods to create, read, update and delete models.
 * Forwards donation requests to liqpay
 */
var DonationService = (function () {
    /**
     * Creates a new DonationService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function DonationService(http) {
        this.http = http;
        this.apiUrl = '/donation-api/';
    }
    /**
     * Create a donation for target
     * @param DonationModel A Donation to create
     */
    DonationService.prototype.createDonation = function (model) {
        var p = this.getPostData(model);
        return this.http.post(this.apiUrl + 'create-donation', p.body, p.options);
    };
    // TODO: implement local cache
    /**
     * Gets page of donations for given target type and ID
     * Returns an Observable for the HTTP GET request.
     * @return {string[]} The Observable for the HTTP request.
     */
    DonationService.prototype.getDonationsPage = function (donationId, targetId, targetType, page, limit, dbQuery) {
        if (donationId === void 0) { donationId = null; }
        if (targetId === void 0) { targetId = null; }
        if (targetType === void 0) { targetType = 'leader'; }
        if (page === void 0) { page = null; }
        if (limit === void 0) { limit = null; }
        if (dbQuery === void 0) { dbQuery = '{}'; }
        // FIXME Implement interface for three types of targets
        var requestUrl;
        // Page of Donations for Target:     /donation-api/target/:targetType/:targetId/page/:page/:limit
        if (targetId !== null && targetType !== null && page !== null && limit !== null) {
            requestUrl =
                this.apiUrl + 'target/' + targetType + '/' + targetId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
        }
        console.log('Donation Service: get by', requestUrl);
        var responseObservable = this.http.get(requestUrl)
            .map(function (responsePage) {
            var donations = responsePage.json();
            return donations;
        });
        return responseObservable;
    };
    /**
     * Get a model from DB or from cache.
     */
    DonationService.prototype.getDonation = function (donationId) {
        return this.getDonationsPage(donationId);
    };
    //////////////////////////////////////////////////////////////////////////////
    // LIQ
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Requires donation form
     * @param DonationModel A Donation to send
     */
    DonationService.prototype.requireSign = function (model) {
        var p = this.getPostData(model);
        return this.http.post(this.apiUrl + 'getsgndta', p.body, p.options);
    };
    /**
     * Internal utility to get post data
     */
    DonationService.prototype.getPostData = function (model) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return {
            body: encodeURIComponent(model.toString()),
            options: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers })
        };
    };
    return DonationService;
}());
DonationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], DonationService);

var _a;
//# sourceMappingURL=donation.service.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__donate_component__ = __webpack_require__(368);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__donation_service__ = __webpack_require__(369);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__donation_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__donation_model__ = __webpack_require__(617);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__donation_model__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drive_service__ = __webpack_require__(619);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__drive_service__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderModel; });
var LeaderModel = (function () {
    function LeaderModel() {
        this.totalDonationsReceived = 0;
    }
    /**
     * It's necessary to have a string representation for sending it to DB
     * @returns String Serialized Leader
     */
    LeaderModel.prototype.toString = function () {
        // FIXME TEST_1 -- Somehow it stops saving if switch to next string instead of bulky code
        console.log('leader model.toString', this);
        return JSON.stringify(this);
    };
    /**
   * Populate model from a json representation loaded from DB or local storage
   */
    LeaderModel.prototype.parseData = function (data) {
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                this[item] = data[item];
            }
        }
    };
    LeaderModel.prototype.onPhotoUrlChange = function (newUrlValue) {
        console.log('Leader photo url:', newUrlValue);
        this.photo = newUrlValue;
    };
    LeaderModel.prototype.applyFormGroupToModel = function (f) {
        this.name = f.get('name').value;
        this.surName = f.get('surName').value;
        this.vision = f.get('vision').value;
        this.mission = f.get('mission').value;
        this.videoUrl = f.get('videoUrl').value;
    };
    LeaderModel.prototype.applyModelToFormGroup = function (formGroup) {
        formGroup.patchValue(this);
    };
    return LeaderModel;
}());

//# sourceMappingURL=leader.model.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_dialog_dialog_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_project_project_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_from__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Provides the Leader service with methods to create, read, update and delete models.
 */
var LeaderService = (function () {
    /**
     * Creates a new LeaderService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function LeaderService(http, router, dialogService, projectService) {
        this.http = http;
        this.router = router;
        this.dialogService = dialogService;
        this.projectService = projectService;
        this.leaderApiUrl = '/leader-api/';
        this.leaderSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](this.leader);
        this.leaderStream = this.leaderSource.asObservable();
    }
    /**
     * Creates the Leader.
     * @param {LeaderModel} model - The Leader to create.
     */
    LeaderService.prototype.createLeader = function (model, email) {
        var _this = this;
        model.email = email;
        var body = encodeURIComponent(model.toString());
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestOptions"]({ headers: headers });
        this.http.post(this.leaderApiUrl, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // Normal Save
            _this.gotoLeaderView(data);
            // Post-FTUX
            // console.log('Finalizing leader registration, cleaning localLeader');
            localStorage.removeItem('BigPolicyLeaderRegistration');
        }, function (err) { return function (er) { return console.error('Leader creation error: ', er); }; }, function () { });
    };
    /**
     * Gets Leaders page from DB by given leaderId, groupId, page and limit
     * Returns an Observable for the HTTP GET request.
     * @param leaderId Leader ID to get.
     * @param groupId Group to get Leaders for. Unused.
     * @param page Page number.
     * @param limit Qualntity of items to get.
     * @param dbQuery Database search query.
     * @return {Observable<LeaderModel>} The Observable for the HTTP request.
     */
    LeaderService.prototype.getLeadersPage = function (leaderId, groupId, page, limit, dbQuery) {
        if (leaderId === void 0) { leaderId = null; }
        if (groupId === void 0) { groupId = null; }
        if (page === void 0) { page = null; }
        if (limit === void 0) { limit = null; }
        if (dbQuery === void 0) { dbQuery = '{}'; }
        var requestUrl;
        // Leader by ID
        // leader-api/:leaderId
        if (leaderId) {
            requestUrl = this.leaderApiUrl + leaderId;
        }
        // Page of Leaders
        // leader-api/page/:page/:limit/q/:dbQuery
        if (page !== null && limit !== null) {
            requestUrl = this.leaderApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
        }
        // OBSOLETE: All Leaders for Group:         /leader-api/group/:groupId/
        // if (groupId) {
        //   requestUrl = this.apiUrl + 'group/' + groupId;
        // }
        // RESERVED: Page of leaders for Group:     /leader-api/group/:groupId/page/:page/:limit
        // if (page !== null && limit !== null && groupId !== null) {
        //   requestUrl = this.apiUrl + 'group/' + groupId + '/page/' + page + '/' + limit;
        // }
        // console.log('get Leaders Page:', leaderId, groupId, page, limit);
        return this.http.get(requestUrl)
            .map(function (responsePage) {
            // console.log('Leaders Page loaded, response: ', responsePage);
            return responsePage.json();
        });
    };
    /**
     * Returns single leader from DB.
     */
    LeaderService.prototype.getLeader = function (leaderId) {
        return this.getLeadersPage(leaderId);
    };
    /**
     * Seaches for leader by user email in DB
     * If found, saves it via callback as userService.leader propery.
     */
    LeaderService.prototype.requestLeaderByEmail = function (email) {
        // FIXME Optimize - use caching, no need to load leaders each time
        // let leader: any = this.findCachedLeaderByEmail(email);
        // if (leader) {
        //   leader = Observable.from({leader});
        // } else {
        // }
        var _this = this;
        var leaderResponse = this.getLeadersPage(null, null, 1, 1, '{ "email": "' + email + '" }');
        leaderResponse.subscribe(function (leader) { return _this.setLeaderForUser(leader['docs'][0]); });
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
    /**
     * Updates a model by performing a request with PUT HTTP method.
     * @param LeaderModel A Leader to update
     */
    LeaderService.prototype.updateLeader = function (model) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.leaderApiUrl + model._id, model.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // TODO Bulk Update Leaders (Like Project and Tasks).
    /**
     * Deletes a model by performing a request with DELETE HTTP method.
     * @param LeaderModel A Leader to delete
     */
    LeaderService.prototype.deleteLeader = function (model, navigateToList) {
        var _this = this;
        if (navigateToList === void 0) { navigateToList = true; }
        // Show Delete Confirmation Dialog
        var dialogResult = this.dialogService.confirm('Точно видалити?', 'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');
        dialogResult.subscribe(function (toDelete) {
            if (toDelete === true) {
                // Delete Leader immediately and, if there are projects, re-assign them to other Leader (admin)
                _this.finalizeLeaderDeletion(model, navigateToList);
                if (model.projects && model.projects.length > 0) {
                    _this.dialogService.confirm('Що робити з проектами?', "\u0423 \u0434\u0456\u044F\u0447\u0430 \u0454 \u043F\u0440\u043E\u0435\u043A\u0442\u0438. \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0457\u0445, \u0447\u0438 \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0443 \u0441\u0438\u0441\u0442\u0435\u043C\u0456, \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0448\u0438\n            \u0434\u043E \u0442\u0438\u043C\u0447\u0430\u0441\u043E\u0432\u043E\u0457 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u0457?", 'Видалити', 'Залишити у системі')
                        .subscribe(function (toDeleteProjects) {
                        if (toDeleteProjects === true) {
                            // Delete Projects and Tasks in DB
                            // TODO Delete Projects Firebase data
                            // TODO Delete Donations and Task Donations?
                            _this.projectService.bulkDeleteProjects(model.projects)
                                .subscribe(function (deleteResult) { console.log('Projects deleted:', deleteResult); });
                        }
                        else {
                            // Reassign projects to another Leader (this/Admin)
                            // FIXME STOP Mixing Logged in / Profile / User Leader and Leader which is to be deleted
                            var newLeader = _this.leader;
                            var projectsUpdate = _this.projectService.bulkUpdateProjects(model.projects, {
                                managerId: newLeader._id,
                                managerEmail: newLeader.email,
                                managerName: newLeader.name + ' ' + newLeader.surName
                            });
                            projectsUpdate.subscribe(function (updateResult) { console.log('Projects update result:', updateResult); });
                        }
                        _this.finalizeLeaderDeletion(model, navigateToList);
                    });
                } // If Project reassignment was needed
            }
        });
        return dialogResult;
    };
    /*
     * Deletes Leader
     */
    LeaderService.prototype.finalizeLeaderDeletion = function (leaderModel, navigateToList) {
        var _this = this;
        if (navigateToList === void 0) { navigateToList = true; }
        // TODO Delete Leader Firebase data
        this.http.delete(this.leaderApiUrl + leaderModel._id)
            .map(function (res) { return res; })
            .catch(this.handleError)
            .subscribe(function (res) {
            _this.setLeaderForUser(null);
            if (navigateToList) {
                _this.router.navigate(['/leaders']);
            }
        });
    };
    // TODO Check if the same can be done for projects
    LeaderService.prototype.gotoLeaderView = function (leader) {
        this.setLeaderForUser(leader);
        var leaderId = leader._id;
        if (leaderId) {
            this.router.navigate(['/leader', leaderId]).then(function (_) {
                // navigation is done
            });
        }
    };
    LeaderService.prototype.setLeaderForUser = function (leader) {
        if (!leader) {
            return;
        }
        // FIXME Impersonation happens - check with admin editing different leaders (and see Profile then)
        console.log('👤 Leader service. Set leader for', leader.email);
        this.leader = leader;
        // Notify observers;
        // http://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2/35568924#35568924
        this.leaderSource.next(leader);
    };
    LeaderService.prototype.handleError = function (error) {
        console.error('Error occured: ', error);
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return LeaderService;
}());
LeaderService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_dialog_dialog_service__["a" /* DialogService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_project_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_project_project_service__["a" /* ProjectService */]) === "function" && _d || Object])
], LeaderService);

var _a, _b, _c, _d;
//# sourceMappingURL=leader.service.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_service__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggedInGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Restricting access
 * For each route definition we can restrict access by creating a guard
 * and adding it to the canActivate property.
 */
var LoggedInGuard = (function () {
    function LoggedInGuard(user) {
        this.user = user;
    }
    /**
     * Returns a boolean, but it can be also a Promise resolving to a boolean.
     */
    LoggedInGuard.prototype.canActivate = function () {
        // return this.user.isLoggedIn();
        // FIXME
        return true;
    };
    return LoggedInGuard;
}());
LoggedInGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__user_user_service__["a" /* UserService */]) === "function" && _a || Object])
], LoggedInGuard);

var _a;
//# sourceMappingURL=logged-in.guard.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectModel; });
var ProjectModel = (function () {
    function ProjectModel() {
        this.cost = 1;
        this.managerName = 'John Doe';
        this.managerId = '';
        this.managerEmail = '';
        this.imageUrl = '';
        // String type is used for conversion between DB and Date input formats
        this.dateStarted = this.toDateInputValue(new Date());
        this.dateEnded = this.toDateInputValue(new Date());
        this.videoUrl = '';
        this.totalDonationsReceived = 0;
    }
    /**
     * It's necessary to have a string representation for sending it to DB
     * @returns String Serialized Leader
     */
    ProjectModel.prototype.toString = function () {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            cost: this.cost,
            managerName: this.managerName,
            managerId: this.managerId,
            managerEmail: this.managerEmail,
            dateStarted: this.dateStarted,
            dateEnded: this.dateEnded,
            imageUrl: this.imageUrl,
            videoUrl: this.videoUrl,
            tasks: this.tasks,
            totalDonationsReceived: this.totalDonationsReceived
        });
    };
    /**
     * Populates model from a JSON representation loaded from DB
     */
    ProjectModel.prototype.parseData = function (data) {
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                this[item] = data[item];
            }
        }
        this.dateStarted = this.toDateInputValue(this.dateStarted);
        this.dateEnded = this.toDateInputValue(this.dateEnded);
    };
    /**
     * Adopts date from Mongo DB format for UI datepicker
     */
    ProjectModel.prototype.toDateInputValue = function (dateToParse) {
        var date = new Date(dateToParse);
        var local = new Date(dateToParse);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        // Convert date string like this: 2017-03-19T13:11:33.615Z into this: 2017-03-19
        return local.toJSON().slice(0, 10);
    };
    ProjectModel.prototype.onImageUrlChange = function (newUrlValue) {
        console.log('Project image url:', newUrlValue);
        this.imageUrl = newUrlValue;
    };
    return ProjectModel;
}());

//# sourceMappingURL=project.model.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
var ShareService = (function () {
    /**
     * Creates a new ShareService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function ShareService(http) {
        this.http = http;
        this.mailApiUrl = '/mail-api/';
    }
    /**
     * Shares a model
     * @param ProjectModel A Project to share
     */
    ShareService.prototype.share = function (modelToShare) {
        var body = encodeURIComponent(JSON.stringify(modelToShare));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.post(this.mailApiUrl + 'share', body, options).map(function (res) { return res.json(); });
        // TODO: Upsert model in DB:
        // model.events.push({'type': 'share'});
    };
    ShareService.prototype.handleError = function (error) {
        console.error('Error occured:', error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    /**
     * Takes videoUrl and returns thumbnail images for it
     * Standard YouTube Thumbs:
     * 1: Small (120x90)
     * 2: Small (120x90) (Default)
     * 3: Small (120x90)
     * Default Thumbnail Image: Full-Size (480x360)
     */
    ShareService.prototype.getYouTubeThumbnail = function (url, thumbType) {
        var videoId = this.getYouTubeId(url);
        var prefix = 'http://img.youtube.com/vi/';
        var thumbs = {
            small1: '/1.jpg',
            small2: '/2.jpg',
            small3: '/3.jpg',
            full: '/0.jpg'
        };
        return videoId !== null
            ? '<a href="' + this.getUrl() + '" ><img src="' + prefix + videoId + thumbs[thumbType] + '" /></a>'
            : '';
    };
    ShareService.prototype.getUrl = function () {
        return location.href;
    };
    /**
      * Get video Thumbnail by given yotube URL.
      * Supported URL formats:
        http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
        http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
        http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
        http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
        http://www.youtube.com/embed/0zM3nApSvMg?rel=0
        http://www.youtube.com/watch?v=0zM3nApSvMg
        http://youtu.be/0zM3nApSvMg
        @origin: http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
      */
    ShareService.prototype.getYouTubeId = function (url) {
        if (url === void 0) { url = ''; }
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };
    return ShareService;
}());
ShareService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], ShareService);

var _a;
//# sourceMappingURL=share.service.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * This class provides the TaskList service with methods to get and save tasks.
 */
var TaskService = (function () {
    /**
     * Creates a new TaskService with the injected Http
     */
    function TaskService(http) {
        this.http = http;
        this.apiUrl = '/task-api/';
    }
    /**
     * Creates new Task in DB
     * @param {TaskModel} model Task model to create.
     */
    TaskService.prototype.createTask = function (model) {
        var body = encodeURIComponent(model.toString());
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.post(this.apiUrl, body, options)
            .map(function (res) { return res.json(); });
    };
    // TODO: implement local cache
    /**
     * Gets tasks page from DB by given taskId, projectId, page and limit
     * Returns an Observable for the HTTP GET request.
     * @return {string[]} The Observable for the HTTP request.
     */
    TaskService.prototype.getTasksPage = function (taskId, projectId, page, limit, dbQuery) {
        if (taskId === void 0) { taskId = null; }
        if (projectId === void 0) { projectId = null; }
        if (page === void 0) { page = null; }
        if (limit === void 0) { limit = null; }
        if (dbQuery === void 0) { dbQuery = '{}'; }
        var requestUrl;
        // Task by ID :: task-api/:taskId
        if (taskId) {
            requestUrl = this.apiUrl + taskId;
        }
        // Page of Tasks :: task-api/page/:page/:limit/q/:dbQuery
        if (page !== null && limit !== null) {
            requestUrl = this.apiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
        }
        // Page of tasks for Project :: task-api/project/:projectId/page/:page/:limit/q/:dbQuery
        if (page !== null && limit !== null && projectId !== null) {
            requestUrl = this.apiUrl + 'project/' + projectId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
        }
        // console.log('get TasksPage:', taskId, projectId, page, limit, dbQuery);
        return this.http.get(requestUrl)
            .map(function (responsePage) {
            // console.log('Tasks Page loaded, response: ', responsePage);
            return responsePage.json();
        });
    };
    /**
     * Returns single Task from DB, reuses get TasksPage.
     */
    TaskService.prototype.getTask = function (taskId) {
        // FIXME Request cached / Load project data to populate on loaded task
        return this.getTasksPage(taskId);
    };
    /**
     * Updates a model by performing a request with PUT HTTP method.
     * @param TaskModel A Task to update
     */
    TaskService.prototype.updateTask = function (model) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.apiUrl + model._id, model.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
     * Updates multiple tasks by performing a request with PUT HTTP method.
     * @param ids {Array} Task IDs to update
     * @param data {Object} The data to be applied during update in {field: name} format
     */
    TaskService.prototype.bulkUpdateTasks = function (ids, data) {
        // TODO Consider encoding the body like in create project above
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify({ ids: ids, data: data });
        console.log('Tasks service, try to update:', ids, data, body);
        return this.http.put(this.apiUrl + 'bulk-update', body, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
     * Deletes a model by performing a request with DELETE HTTP method.
     * @param TaskModel A Task to delete
     */
    TaskService.prototype.deleteTask = function (model) {
        this.http.delete(this.apiUrl + model._id)
            .map(function (res) { return console.log('Task deleted:', res.json()); })
            .catch(this.handleError)
            .subscribe();
    };
    /**
     * Deletes multiple Tasks by performing a request with PUT HTTP method.
     * @param ids Task IDs to delete
     */
    TaskService.prototype.bulkDeleteTasks = function (ids) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify({ ids: ids });
        console.log('Task service, try to delete:', ids, body);
        return this.http.put(this.apiUrl + 'bulk-delete', body, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.handleError = function (error) {
        console.error('Error occured:', error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return TaskService;
}());
TaskService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], TaskService);

var _a;
//# sourceMappingURL=task.service.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_edit_component__ = __webpack_require__(634);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__task_edit_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_list_component__ = __webpack_require__(635);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__task_list_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task_view_component__ = __webpack_require__(636);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__task_view_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_auth0_lock__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_auth0_lock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_auth0_lock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__leader__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_dialog_dialog_service__ = __webpack_require__(158);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// declare var Auth0Lock: any;
// declare var require: any;
// const Auth0Lock = require('auth0-lock').default;
var UserService = (function () {
    function UserService(leaderService, projectService, dialogService) {
        var _this = this;
        this.leaderService = leaderService;
        this.projectService = projectService;
        this.dialogService = dialogService;
        // Store profile object in auth class
        this.userProfile = {
            name: '',
            email: ''
        };
        // Configure Auth0
        // FIXME Redirect user to special place, not just landing
        // 1. Redirect to Leader creation if user was in the process of creation
        // 2. E.T.C.
        this.options = {
            auth: {
                redirectUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/profile',
                responseType: 'token'
            }
        };
        // FIXME_SEC
        this.lock = new __WEBPACK_IMPORTED_MODULE_0_auth0_lock___default.a('IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J', 'bigpolicy.eu.auth0.com', this.options);
        // Set userProfile attribute of already saved profile
        if (this.authenticated()) {
            this.userProfile = JSON.parse(localStorage.getItem('BigPolicyProfile'));
            this.leaderService.requestLeaderByEmail(this.getEmail());
        }
        // Add callback for the Lock `authenticated` event
        this.lock.on('authenticated', function (authResult) {
            // Auth0 data
            localStorage.setItem('id_token', authResult.idToken);
            // console.log('Authenticated, lock.showSignin =', this.lock.showSignin);
            // Fetch profile information
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    // Handle error
                    console.log(error);
                    return;
                }
                localStorage.setItem('BigPolicyProfile', JSON.stringify(profile));
                _this.userProfile = profile;
                _this.leaderService.requestLeaderByEmail(_this.getEmail())
                    .subscribe(function (leaderResponse) {
                    _this.showStatus();
                    _this.tryToContinueLeaderRegistration();
                });
            });
        });
        if (this.authenticated) {
            this.showStatus();
        }
    }
    ;
    UserService.prototype.showStatus = function () {
        var status = "Email: " + this.getEmail() +
            "\nAuthenticated: " + this.authenticated() +
            "\nHas Leader: " + this.hasLeader() +
            "\nIs Admin: " + this.isAdmin() +
            "\nLeader: " + this.leaderService.leader +
            "\nSaved registration: " + localStorage.getItem('BigPolicyLeaderRegistration');
        console.log('User status: ' + status);
    };
    /**
     * Returns true if leader matching by email has been found in DB
     */
    UserService.prototype.hasLeader = function () {
        return !!this.leaderService.leader;
    };
    UserService.prototype.hasEditPermissions = function (leaderProjectOrTask) {
        // FIXME it's being called too often, as log below shows
        return this.isAdmin() || this.isOwner(leaderProjectOrTask);
    };
    /**
     * Returns email of logged in user.
     */
    UserService.prototype.getEmail = function () {
        return this.userProfile && this.userProfile['email'];
    };
    /**
     * Returns true if user is logged in.
     */
    UserService.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // This searches for an item in local storage with key == 'id_token'
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["tokenNotExpired"])();
    };
    ;
    /**
     * Returns true if user is logged in and his admin is in the admin list.
     */
    // FIXME Implement Admins list
    UserService.prototype.isAdmin = function () {
        return this.authenticated() && (this.getEmail() === 'rostislav.siryk@gmail.com' ||
            this.getEmail() === 'prokopenko.serhii@gmail.com' ||
            this.getEmail() === 'vlodkozak@gmail.com');
    };
    // FIXME_TEST In the first place
    /**
     * Returns true if current user is owner of given leader, project or task by email
     */
    UserService.prototype.isOwner = function (item) {
        var userEmail = this.getEmail() || '';
        var projectIsOwnedBy = userEmail === item['managerEmail'] && this.hasLeader();
        var leaderIsOwnedBy = userEmail === item['email'];
        var taskIsOwnedBy = item['projectId'] && userEmail === __WEBPACK_IMPORTED_MODULE_3__project__["a" /* ProjectService */].getCachedProject(item['projectId'])['managerEmail'];
        return this.authenticated() && (taskIsOwnedBy || projectIsOwnedBy || leaderIsOwnedBy);
    };
    /**
     * Call the Auth0 show method to display the login widget.
     * TODO Extend
     */
    UserService.prototype.login = function () {
        // FIXME_SEC
        this.lock.show();
    };
    ;
    /**
     * De-authenticates currently logged in user by removing token from local storage.
     */
    UserService.prototype.logout = function () {
        // Auth0 data
        localStorage.removeItem('id_token');
        localStorage.removeItem('BigPolicyProfile');
        localStorage.removeItem('BigPolicyLeaderRegistration');
        this.userProfile = undefined;
    };
    ;
    // ....
    // FTUX
    // ....
    /**
    * Lazy Leader Registration.
    * Save Leader to LocalStorage to let unauthorised user to start registration
    */
    UserService.prototype.needToLoginFirst = function (leader) {
        var _this = this;
        if (!this.authenticated()) {
            // save Leader data to LocalStorage
            console.log('≥≥≥ unauthorised, saving to localStorage');
            localStorage.setItem('BigPolicyLeaderRegistration', leader.toString());
            // show Registration is needed warning
            this.dialogService
                .confirm('Потрібна авторизація', 'Для завершення реєстрації треба увійти в систему. Будь ласка, натиcни "Продовжити"')
                .subscribe(function (res) {
                console.log('Заходимо у систему');
                _this.login();
            });
            return true;
        }
        return false;
    };
    //  this.saveToLocalStorage(this.leader);
    UserService.prototype.tryToContinueLeaderRegistration = function () {
        var _this = this;
        var localLeader = localStorage.getItem('BigPolicyLeaderRegistration');
        if (this.authenticated() && !this.hasLeader() && !!localLeader) {
            var leader_1 = new __WEBPACK_IMPORTED_MODULE_4__leader__["a" /* LeaderModel */]();
            leader_1.parseData(JSON.parse(localLeader));
            console.log('FTUX: continue leader registration, parsed leader: ', leader_1);
            // on registration success
            this.dialogService
                .confirm('Вітаємо!', 'Ти успішно завершив реєстрацію в системі.')
                .subscribe(function (res) {
                _this.leaderService.createLeader(leader_1, _this.getEmail());
            });
        }
        else {
            // on registration failure — leader with that email is registered already
            if (!!localLeader) {
                this.dialogService
                    .confirm('Існуючий користувач?', 'Лідера з таким email вже зареєстровано в системі. \n\nЗдається, це ти!')
                    .subscribe(function (res) {
                    console.log('FTUX: DON\'t continue leader registration: ', _this.authenticated(), _this.hasLeader(), localLeader);
                    // Cleanup
                    localStorage.removeItem('BigPolicyLeaderRegistration');
                });
            }
            else {
                this.dialogService
                    .confirm('Вітаємо!', 'Ти успішно увійшов у систему.')
                    .subscribe(function (res) {
                    console.log('Logged in: ', _this.authenticated(), _this.hasLeader(), localLeader);
                });
            }
        }
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__leader__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__leader__["b" /* LeaderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__project__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__project__["a" /* ProjectService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_dialog_dialog_service__["a" /* DialogService */]) === "function" && _c || Object])
], UserService);

var _a, _b, _c;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 535:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 535;


/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app___ = __webpack_require__(605);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app___["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__project_service__ = __webpack_require__(159);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__project_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_model__ = __webpack_require__(375);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__project_model__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AboutComponent = (function () {
    function AboutComponent() {
        this.dateInit = new Date('Jun 1 2016');
        this.dateNow = new Date();
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-about',
        template: __webpack_require__(951),
        styles: [__webpack_require__(254), __webpack_require__(881)]
    })
], AboutComponent);

//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_module__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_pagination__ = __webpack_require__(943);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_index__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__task_edit_index__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__task_list_index__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__task_view_index__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__project_landing_index__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__project_edit_index__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__project_list_index__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__project_view_index__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__leader_edit_index__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__leader_list_index__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__leader_view_index__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_user_profile_component__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__about_index__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__landing_index__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_routes__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__shared_sharer_share_service__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__shared_donate_donation_service__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__shared_login_logged_in_guard__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__app_component__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__shared_sharer_sharer_component__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__shared_donate_donate_component__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__shared_donate_list_donations_list_component__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__shared_validation_email_validator__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__shared_video_video_component__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__shared_drive_files_files_edit_component__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__shared_files_view_files_view_component__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__home_home_component__ = __webpack_require__(359);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Directives















// Services


// rest are shared via CoreModule










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__shared_index__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_7__shared_index__["b" /* ToolbarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__task_edit_index__["a" /* TaskEditComponent */],
            __WEBPACK_IMPORTED_MODULE_10__task_view_index__["a" /* TaskViewComponent */],
            __WEBPACK_IMPORTED_MODULE_9__task_list_index__["a" /* TaskListComponent */],
            __WEBPACK_IMPORTED_MODULE_11__project_landing_index__["a" /* ProjectsComponent */],
            __WEBPACK_IMPORTED_MODULE_12__project_edit_index__["a" /* ProjectEditComponent */],
            __WEBPACK_IMPORTED_MODULE_14__project_view_index__["a" /* ProjectViewComponent */],
            __WEBPACK_IMPORTED_MODULE_13__project_list_index__["a" /* ProjectListComponent */],
            __WEBPACK_IMPORTED_MODULE_15__leader_edit_index__["a" /* LeaderEditComponent */],
            __WEBPACK_IMPORTED_MODULE_17__leader_view_index__["a" /* LeaderViewComponent */],
            __WEBPACK_IMPORTED_MODULE_16__leader_list_index__["a" /* LeaderListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__shared_user_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_19__about_index__["a" /* AboutComponent */],
            __WEBPACK_IMPORTED_MODULE_20__landing_index__["a" /* LandingComponent */],
            __WEBPACK_IMPORTED_MODULE_26__shared_sharer_sharer_component__["a" /* SharerComponent */],
            __WEBPACK_IMPORTED_MODULE_27__shared_donate_donate_component__["a" /* DonateComponent */],
            __WEBPACK_IMPORTED_MODULE_28__shared_donate_list_donations_list_component__["a" /* DonationsListComponent */],
            __WEBPACK_IMPORTED_MODULE_29__shared_validation_email_validator__["a" /* EmailValidatorDirective */],
            __WEBPACK_IMPORTED_MODULE_30__shared_video_video_component__["a" /* VideoComponent */],
            __WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_31__shared_drive_files_files_edit_component__["a" /* FilesEditComponent */],
            __WEBPACK_IMPORTED_MODULE_32__shared_files_view_files_view_component__["a" /* FilesViewComponent */],
            __WEBPACK_IMPORTED_MODULE_33__home_home_component__["a" /* HomeComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_21__app_routes__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_6_ng2_pagination__["Ng2PaginationModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_5__core_module__["a" /* CoreModule */] // will provide services
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_24__shared_login_logged_in_guard__["a" /* LoggedInGuard */],
            __WEBPACK_IMPORTED_MODULE_22__shared_sharer_share_service__["a" /* ShareService */],
            __WEBPACK_IMPORTED_MODULE_23__shared_donate_donation_service__["a" /* DonationService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_25__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_login_logged_in_guard__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_user_profile_component__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__landing__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__leader_edit__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__leader_list__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__leader_view__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__project_landing__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__project_edit__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__project_view__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__task_edit__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__task_list__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__task_view__ = __webpack_require__(380);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });















//
// The order of routes is IMPORTANT.
// More specific come first.
//
var routes = [
    { path: 'leader/:id/edit', component: __WEBPACK_IMPORTED_MODULE_6__leader_edit__["a" /* LeaderEditComponent */] },
    { path: 'project/:id/edit', component: __WEBPACK_IMPORTED_MODULE_10__project_edit__["a" /* ProjectEditComponent */] },
    { path: 'task/:id/edit', component: __WEBPACK_IMPORTED_MODULE_12__task_edit__["a" /* TaskEditComponent */] },
    { path: 'leader/:id', component: __WEBPACK_IMPORTED_MODULE_8__leader_view__["a" /* LeaderViewComponent */] },
    { path: 'project/:id', component: __WEBPACK_IMPORTED_MODULE_11__project_view__["a" /* ProjectViewComponent */] },
    { path: 'task/:id', component: __WEBPACK_IMPORTED_MODULE_14__task_view__["a" /* TaskViewComponent */] },
    { path: 'leaders', component: __WEBPACK_IMPORTED_MODULE_7__leader_list__["a" /* LeaderListComponent */] },
    { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_9__project_landing__["a" /* ProjectsComponent */] },
    { path: 'tasks', component: __WEBPACK_IMPORTED_MODULE_13__task_list__["a" /* TaskListComponent */] },
    { path: 'add-leader', component: __WEBPACK_IMPORTED_MODULE_6__leader_edit__["a" /* LeaderEditComponent */] },
    { path: 'add-project', component: __WEBPACK_IMPORTED_MODULE_10__project_edit__["a" /* ProjectEditComponent */] },
    { path: 'add-task', component: __WEBPACK_IMPORTED_MODULE_12__task_edit__["a" /* TaskEditComponent */] },
    // The guard is added as an array, multiple guards will be executed in a sequence
    // and only let the user see the page if all of them returns or resolves to true.
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_2__shared_user_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__shared_login_logged_in_guard__["a" /* LoggedInGuard */]] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_3__about__["a" /* AboutComponent */] },
    { path: 'landing', component: __WEBPACK_IMPORTED_MODULE_4__landing__["a" /* LandingComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__home__["a" /* HomeComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_leader__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_project__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_user__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_task__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_drive__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_dialog_dialog_component__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_dialog_dialog_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_uploader_uploader_component__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_image_image_component__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__leader_brief_leader_brief_component__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__project_brief_project_brief_component__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_flex_layout__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_forms__ = __webpack_require__(39);
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// CoreModule.ts



















var firebaseConfig = {
    apiKey: 'AIzaSyCa_yL-SOkz0-x-cdzuRJRTmbzs-5VNNp0',
    authDomain: 'testbase-eb57f.firebaseapp.com',
    databaseURL: 'https://testbase-eb57f.firebaseio.com',
    storageBucket: 'testbase-eb57f.appspot.com',
    messagingSenderId: '780191546457'
};
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_10__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_13_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_17__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_18__angular_forms__["d" /* ReactiveFormsModule */]
        ],
        exports: [
            // components we want to make available
            __WEBPACK_IMPORTED_MODULE_8__shared_dialog_dialog_component__["a" /* DialogComponent */],
            __WEBPACK_IMPORTED_MODULE_12__shared_uploader_uploader_component__["a" /* UploaderComponent */],
            __WEBPACK_IMPORTED_MODULE_14__shared_image_image_component__["a" /* ImageComponent */],
            __WEBPACK_IMPORTED_MODULE_15__leader_brief_leader_brief_component__["a" /* LeaderBriefComponent */],
            __WEBPACK_IMPORTED_MODULE_16__project_brief_project_brief_component__["a" /* ProjectBriefComponent */],
            __WEBPACK_IMPORTED_MODULE_17__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_18__angular_forms__["d" /* ReactiveFormsModule */]
        ],
        declarations: [
            // components to use in this module
            __WEBPACK_IMPORTED_MODULE_8__shared_dialog_dialog_component__["a" /* DialogComponent */],
            __WEBPACK_IMPORTED_MODULE_12__shared_uploader_uploader_component__["a" /* UploaderComponent */],
            __WEBPACK_IMPORTED_MODULE_14__shared_image_image_component__["a" /* ImageComponent */],
            __WEBPACK_IMPORTED_MODULE_15__leader_brief_leader_brief_component__["a" /* LeaderBriefComponent */],
            __WEBPACK_IMPORTED_MODULE_16__project_brief_project_brief_component__["a" /* ProjectBriefComponent */]
        ],
        providers: [
            // singleton services
            __WEBPACK_IMPORTED_MODULE_5__shared_user__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_leader__["b" /* LeaderService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_project__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_task__["a" /* TaskService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_drive__["a" /* DriveService */],
            __WEBPACK_IMPORTED_MODULE_9__shared_dialog_dialog_service__["a" /* DialogService */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__shared_dialog_dialog_component__["a" /* DialogComponent */]
        ]
    })
], CoreModule);

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_component__ = __webpack_require__(359);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__home_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(358);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(601);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_project__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_leader__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_user__ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LandingComponent = (function () {
    function LandingComponent(userService, projectService, leaderService) {
        this.userService = userService;
        this.projectService = projectService;
        this.leaderService = leaderService;
        // FIXME calculate total donations
        this.app = {
            donors: 0,
            totalDonationsReceived: 0,
            projects: [],
            leaders: []
        };
    }
    LandingComponent.prototype.ngOnInit = function () {
        this.getProjects();
        this.getLeaders();
    };
    LandingComponent.prototype.getLeaders = function () {
        var _this = this;
        this.leaderService.getLeadersPage(null, null, 1, 3)
            .subscribe(function (data) { return _this.setLeaders(data['docs']); }, function (err) { return console.error(err); }, function () { return _this.app.leaders; });
    };
    LandingComponent.prototype.setLeaders = function (data) {
        this.app.leaders = data;
        return data;
    };
    LandingComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjectsPage(null, null, 1, 3)
            .subscribe(function (data) { return _this.setProjects(['data']); }, function (err) { return console.error(err); }, function () { return _this.app.projects; });
    };
    LandingComponent.prototype.setProjects = function (data) {
        this.app.projects = data;
        return data;
    };
    LandingComponent.prototype.supportLeader = function () {
        console.log('support leader');
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-landing',
        template: __webpack_require__(954),
        styles: [__webpack_require__(908), __webpack_require__(884)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_user__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_user__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_project__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_project__["a" /* ProjectService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_leader__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_leader__["b" /* LeaderService */]) === "function" && _c || Object])
], LandingComponent);

var _a, _b, _c;
//# sourceMappingURL=landing.component.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderBriefComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LeaderBriefComponent = (function () {
    function LeaderBriefComponent(leaderService) {
        this.leaderService = leaderService;
        this.leaderId = '';
        this.leader = new __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__["a" /* LeaderModel */]();
    }
    LeaderBriefComponent.prototype.ngOnChanges = function (changes) {
        if (changes.leaderId) {
            if (changes.leaderId.currentValue = 'random') {
                console.log('Get random leader');
                this.requestLeader(this.leaderId);
            }
        }
    };
    LeaderBriefComponent.prototype.requestLeader = function (id) {
        var _this = this;
        this.leaderService.getLeader(id)
            .subscribe(function (data) {
            _this.leader = data;
        }, function (err) { return console.error(err); }, function () { });
    };
    return LeaderBriefComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LeaderBriefComponent.prototype, "leaderId", void 0);
LeaderBriefComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-leader-brief',
        template: __webpack_require__(955),
        styles: [__webpack_require__(885)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__["b" /* LeaderService */]) === "function" && _a || Object])
], LeaderBriefComponent);

var _a;
//# sourceMappingURL=leader.brief.component.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_leader__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_drive__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_user__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LeaderEditComponent = (function () {
    function LeaderEditComponent(route, leaderService, userService, driveService, location, fb) {
        this.route = route;
        this.leaderService = leaderService;
        this.userService = userService;
        this.driveService = driveService;
        this.location = location;
        this.fb = fb;
        // Must be public, used in template
        this.leaderModel = new __WEBPACK_IMPORTED_MODULE_1__shared_leader__["a" /* LeaderModel */]();
        // Must be public, used in template
        this.isUpdateMode = false;
    }
    /**
     * Initialization Event Handler, used to parse route params
     * like `id` in leader/:id/edit)
     */
    LeaderEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Init Leader Editor, route params:', this.route.params);
        // FIXME
        var profile = this.userService.userProfile;
        // FIXME
        var fullname = profile ? profile['name'] : '';
        // FIXME Code duplication
        this.leaderFormGroup = this.fb.group({
            name: [fullname.split(' ')[0], [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(50)]],
            surName: [fullname.split(' ')[1], [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(50)]],
            mission: ['', [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(999)]],
            vision: ['', [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(999)]],
            videoUrl: ['', this.videoUrlValidator]
        });
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            console.log('Leader Editor by ID from route params:', id);
            // FIXME_SEC TEST_1 unauthorised user can't see the page
            if (id && _this.userService.authenticated()) {
                _this.isUpdateMode = true;
                _this.leaderService.getLeader(id)
                    .subscribe(function (data) {
                    _this.setLeader(data);
                }, function (err) { return console.error(err); }, function () { });
            }
        });
    };
    // FIXME apply validation
    // returns either null if the control value is valid or a validation error object
    LeaderEditComponent.prototype.videoUrlValidator = function (c) {
        var youTubeRegexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        // console.log('yourube validity: ', c.value, c.value.match(youTubeRegexp) );
        var isYouTubeUrl = (c.value && c.value.match(youTubeRegexp)) !== null;
        return isYouTubeUrl ? null : { 'forbiddenName': 'Erriis' };
    };
    /**
     * Leader loading handler
     * @param {data} Loaded Leader data
     */
    LeaderEditComponent.prototype.setLeader = function (data) {
        this.leaderModel = new __WEBPACK_IMPORTED_MODULE_1__shared_leader__["a" /* LeaderModel */]();
        this.leaderModel.parseData(data);
        this.driveService.checkConnection();
        this.leaderModel.applyModelToFormGroup(this.leaderFormGroup);
        console.log('Leader Form Group: ', this.leaderFormGroup);
    };
    /**
    * Saves new or edited Leader by asking one of two service methods for DB.
    * @returns return false to prevent default form submit behavior to refresh the page.
    */
    // FIXME: Complete Leader processing
    LeaderEditComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.leaderFormGroup.value, this.leaderFormGroup.valid);
        // Update leader from form
        this.leaderModel.applyFormGroupToModel(this.leaderFormGroup);
        if (this.isUpdateMode) {
            // Update existing Leader:
            this.leaderService.updateLeader(this.leaderModel)
                .subscribe(function (data) { _this.leaderService.gotoLeaderView(data); }, function (err) { return function (er) { return console.error('Leader update error: ', er); }; }, function () { });
        }
        else {
            // Create new Leader:
            // FTUX: If user's unauthorised, use service to save him to local storage, continue after login
            if (this.userService.needToLoginFirst(this.leaderModel)) {
                return false;
            }
            // NO FTUX - user is authorized already
            this.leaderService.createLeader(this.leaderModel, this.userService.getEmail());
        }
    };
    /**
     * Removes the Leader from DB
     * @param {Leader} Leader to delete
     */
    LeaderEditComponent.prototype.deleteLeader = function (leaderModel) {
        this.leaderService.deleteLeader(leaderModel);
        return false;
    };
    /**
     * Prepares Leader's file list, received by event from file list editor, for saving.
     */
    LeaderEditComponent.prototype.onFileListUpdate = function (fileList) {
        var files = [];
        for (var i = 0; i < fileList.length; i++) {
            files.push({
                link: fileList[i].webViewLink,
                name: fileList[i].name
            });
        }
        this.leaderModel.leaderFiles = files;
    };
    LeaderEditComponent.prototype.cancelEditing = function () {
        this.location.back();
    };
    return LeaderEditComponent;
}());
LeaderEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(956),
        styles: [__webpack_require__(886)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_leader__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_leader__["b" /* LeaderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_user__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_user__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared_drive__["a" /* DriveService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_drive__["a" /* DriveService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common__["Location"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__angular_forms__["h" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_forms__["h" /* FormBuilder */]) === "function" && _f || Object])
], LeaderEditComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=leader.edit.component.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_leader_index__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_user_user_service__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LeaderListComponent = (function () {
    function LeaderListComponent(userService, http, leaderService) {
        this.userService = userService;
        this.http = http;
        this.leaderService = leaderService;
        // How many leaders to show and to request from db in single turn
        this.pageSize = 5;
        // For searching leaders in DB
        this.dbQuery = '{}';
        this.leaders = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([{ title: 'Loading...' }]);
        this.itemsPage = {
            docs: this.leaders,
            limit: this.pageSize,
            page: 1,
            pages: 0,
            total: 0
        };
    }
    LeaderListComponent.prototype.ngOnInit = function () {
        this.requestLeaders();
    };
    LeaderListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.groupId && changes.groupId.currentValue ||
            changes.pageSize && changes.pageSize.currentValue ||
            changes.dbQuery && changes.dbQuery.currentValue) {
            this.requestLeaders();
        }
    };
    LeaderListComponent.prototype.pageChanged = function (pageNumber) {
        this.itemsPage.page = pageNumber;
        this.requestLeaders();
    };
    LeaderListComponent.prototype.requestLeaders = function () {
        var _this = this;
        var proxySub = this.leaderService.getLeadersPage(null, this.groupId, this.itemsPage.page, this.pageSize, this.dbQuery)
            .subscribe(function (responsePage) {
            // console.log('Next, responsePage:', responsePage);
            _this.itemsPage.docs.next(responsePage['docs']);
            _this.itemsPage.limit = responsePage['limit'];
            _this.itemsPage.page = responsePage['page'];
            _this.itemsPage.pages = responsePage['pages'];
            _this.itemsPage.total = responsePage['total'];
            proxySub.unsubscribe();
        });
    };
    LeaderListComponent.prototype.deleteLeader = function (leaderToRemove) {
        var _this = this;
        // Delete from DB
        this.leaderService.deleteLeader(leaderToRemove, false).subscribe(function (dialogResult) {
            if (dialogResult === true) {
                // Delete in UI
                var updatedLeaders_1;
                _this.leaders.subscribe(function (projects) {
                    updatedLeaders_1 = projects.filter(function (project) { return project._id !== leaderToRemove._id; });
                });
                _this.leaders.next(updatedLeaders_1);
            }
        });
        return false;
    };
    return LeaderListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LeaderListComponent.prototype, "pageSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LeaderListComponent.prototype, "dbQuery", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LeaderListComponent.prototype, "groupId", void 0);
LeaderListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-leader-list',
        template: __webpack_require__(957),
        styles: [__webpack_require__(887)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_user_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_leader_index__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_leader_index__["b" /* LeaderService */]) === "function" && _c || Object])
], LeaderListComponent);

var _a, _b, _c;
//# sourceMappingURL=leader.list.component.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LeaderViewComponent = (function () {
    /**
     * Dependency Injection: route (for reading params later)
     */
    function LeaderViewComponent(userService, router, route, leaderService) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.leaderService = leaderService;
        this.leader = new __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__["a" /* LeaderModel */]();
    }
    /**
     * Initialization Event Handler, used to parse route params
     * like `id` in leader/:id/edit)
     */
    LeaderViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            if (id) {
                _this.leaderService.getLeader(id)
                    .subscribe(function (data) {
                    _this.setLeader(data);
                }, function (err) { return console.error(err); }, function () { });
            }
        });
    };
    /**
     * Leader loading handler
     * @param {data} Loaded leader data
     */
    LeaderViewComponent.prototype.setLeader = function (data) {
        // console.log(`Got Leader: ${JSON.stringify(data, null, ' ')}`);
        // fix for leaderFiles: [null] sometimes coming from DB:
        if (data.leaderFiles && data.leaderFiles.length) {
            var nullIndex = data.leaderFiles.indexOf(null);
            console.log('nulli:', nullIndex);
            data.leaderFiles.splice(nullIndex, 1);
        }
        this.leader = data;
    };
    /**
     * Removes the leader from DB
     * @param {leader} Leader to delete
     */
    LeaderViewComponent.prototype.deleteLeader = function (leader) {
        this.leaderService.deleteLeader(leader);
        return false;
    };
    return LeaderViewComponent;
}());
LeaderViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(958),
        styles: [__webpack_require__(888)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_leader_index__["b" /* LeaderService */]) === "function" && _d || Object])
], LeaderViewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=leader.view.component.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_project_index__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectBriefComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectBriefComponent = (function () {
    function ProjectBriefComponent(projectService) {
        this.projectService = projectService;
        this.projectId = '';
        this.project = new __WEBPACK_IMPORTED_MODULE_1__shared_project_index__["b" /* ProjectModel */]();
    }
    ProjectBriefComponent.prototype.ngOnChanges = function (changes) {
        if (changes.projectId) {
            if (changes.projectId.currentValue = 'random') {
                console.log('Get random project');
                this.requestProject(this.projectId);
            }
        }
    };
    ProjectBriefComponent.prototype.requestProject = function (id) {
        var _this = this;
        this.projectService.getProject(id)
            .subscribe(function (data) {
            _this.project = data;
        }, function (err) { return console.error(err); }, function () { });
    };
    return ProjectBriefComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ProjectBriefComponent.prototype, "projectId", void 0);
ProjectBriefComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-project-brief',
        template: __webpack_require__(959),
        styles: [__webpack_require__(889)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_project_index__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_project_index__["a" /* ProjectService */]) === "function" && _a || Object])
], ProjectBriefComponent);

var _a;
//# sourceMappingURL=project.brief.component.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_project_index__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_leader_leader_service__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_leader_leader_model__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectEditComponent = (function () {
    function ProjectEditComponent(route, router, projectService, leaderService, location, userService) {
        this.route = route;
        this.router = router;
        this.projectService = projectService;
        this.leaderService = leaderService;
        this.location = location;
        this.userService = userService;
        this.isUpdateMode = false;
        // FIXME Used for changing leaders by admin - Extract to separate component
        this.leaders = null;
        this.currentLeader = new __WEBPACK_IMPORTED_MODULE_5__shared_leader_leader_model__["a" /* LeaderModel */]();
        this.project = new __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["b" /* ProjectModel */]();
    }
    Object.defineProperty(ProjectEditComponent.prototype, "showTasks", {
        get: function () {
            return this.isUpdateMode;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Initialization Event Handler, used to parse route params
     * like `id` in project/:id/edit)
     */
    ProjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            // console.log('Project Editor by ID from route params:', id)
            if (id) {
                _this.isUpdateMode = true;
                _this.projectService.getProject(id)
                    .subscribe(function (data) {
                    _this.project = new __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["b" /* ProjectModel */]();
                    _this.project.parseData(data);
                }, function (err) { return console.error(err); }, function () { });
            }
        });
    };
    /**
     * Removes this project and it's tasks (giving user a choice to move it, see service implementation)
     * @param {project} Project being viewed
     */
    ProjectEditComponent.prototype.deleteProject = function (project) {
        // Delete from DB
        this.projectService.deleteProject(project, true);
        // this.router.navigate(['/projects']);
        return false;
    };
    /**
     * Saves new or edited project by asking one of two service methods for DB.
     * @returns return false to prevent default form submit behavior to refresh the page.
     */
    // FIXME: Complete Project processing
    ProjectEditComponent.prototype.saveProject = function () {
        var _this = this;
        if (this.isUpdateMode) {
            // Update existing project
            // FIXME
            // this.selectedLeader = this.leaderService.leader;
            this.projectService.updateProject(this.project)
                .subscribe(function (data) { _this.gotoProject(data); }, function (err) { return function (er) { return console.error('Project update error: ', er); }; }, function () { });
        }
        else {
            // Create new project
            // FIXME - Potential Race Condition
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
                // navigation is done
            });
        }
    };
    ProjectEditComponent.prototype.cancelEditing = function () {
        this.location.back();
    };
    // FIXME Move to service / component
    ProjectEditComponent.prototype.requestLeadersToSelectFrom = function () {
        var _this = this;
        // this.userService.isAdmin()
        this.leaderService.getLeadersPage(null, null, 1, 100, '{}')
            .subscribe(function (res) {
            _this.leaders = res['docs'];
            console.log('got leaders: ', _this.leaders);
            for (var d in _this.leaders) {
                if (_this.leaders.hasOwnProperty(d)) {
                    console.log('got leader: ', _this.leaders[d]._id, _this.leaders[d].name);
                    if (_this.project.managerId === _this.leaders[d]._id) {
                        // Memorize current leader for later usage - we'll remove project from him:
                        _this.currentLeader.parseData(_this.leaders[d]);
                    }
                }
            }
        });
    };
    /**
     * Assigns project to another leader
     */
    // FIXME CHECK how to reuse projects Re-assign from leaderService.deleteLeader method
    // FIXME Move it to Service
    ProjectEditComponent.prototype.moveProjectToOtherLeader = function (event) {
        var newLeader = new __WEBPACK_IMPORTED_MODULE_5__shared_leader_leader_model__["a" /* LeaderModel */]();
        newLeader.parseData(event.value);
        console.log("> Move Project to: ", newLeader.email);
        // Update project
        this.project.managerId = newLeader._id;
        this.project.managerName = newLeader.name + ' ' + newLeader.surName;
        this.project.managerEmail = newLeader.email;
        this.saveProject();
        // Add project to new leader:
        if (newLeader.projects.indexOf(this.project._id) === -1) {
            newLeader.projects.push(this.project._id);
            this.leaderService.updateLeader(newLeader).subscribe();
        }
        // Remove project from current leader:
        this.currentLeader.projects.splice(this.currentLeader.projects.indexOf(this.project._id), 1);
        this.leaderService.updateLeader(this.currentLeader).subscribe();
    };
    return ProjectEditComponent;
}());
ProjectEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(960),
        styles: [__webpack_require__(890)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["a" /* ProjectService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_leader_leader_service__["a" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_leader_leader_service__["a" /* LeaderService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common__["Location"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */]) === "function" && _f || Object])
], ProjectEditComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=project.edit.component.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProjectsComponent = (function () {
    function ProjectsComponent() {
    }
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-projects',
        template: __webpack_require__(961),
        styles: [__webpack_require__(891)]
    })
], ProjectsComponent);

//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__project_list_component__ = __webpack_require__(615);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__project_list_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_project__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_user_user_service__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProjectListComponent = (function () {
    function ProjectListComponent(userService, projectService, http) {
        this.userService = userService;
        this.projectService = projectService;
        this.http = http;
        // List title
        this.title = '';
        // How many leaders to show and to request from db in single turn
        this.pageSize = 5;
        // For searching leaders in DB
        this.dbQuery = '{}';
        this.projects = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([{ title: 'Loading...' }]);
        this.itemsPage = {
            docs: this.projects,
            limit: this.pageSize,
            page: 1,
            pages: 0,
            total: 0
        };
        this.isAddingTaskMode = false;
    }
    ProjectListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.leaderId && changes.leaderId.currentValue ||
            changes.pageSize && changes.pageSize.currentValue ||
            changes.dbQuery && changes.dbQuery.currentValue) {
            this.requestProjects();
        }
    };
    ProjectListComponent.prototype.pageChanged = function (pageNumber) {
        this.itemsPage.page = pageNumber;
        this.requestProjects();
    };
    ProjectListComponent.prototype.requestProjects = function () {
        var _this = this;
        var proxySub = this.projectService.getProjectsPage(null, this.leaderId, this.itemsPage.page, this.pageSize, this.dbQuery)
            .subscribe(function (responsePage) {
            // console.log('Next, responsePage:', responsePage);
            _this.itemsPage.docs.next(responsePage['docs']);
            _this.itemsPage.limit = responsePage['limit'];
            _this.itemsPage.page = responsePage['page'];
            _this.itemsPage.pages = responsePage['pages'];
            _this.itemsPage.total = responsePage['total'];
            proxySub.unsubscribe();
        });
    };
    ProjectListComponent.prototype.deleteProject = function (projectToRemove) {
        var _this = this;
        // Delete from DB
        this.projectService.deleteProject(projectToRemove, false).subscribe(function (dialogResult) {
            if (dialogResult === true) {
                // Delete in UI
                var updatedProjects_1;
                _this.projects.subscribe(function (projects) {
                    updatedProjects_1 = projects.filter(function (project) { return project._id !== projectToRemove._id; });
                });
                _this.projects.next(updatedProjects_1);
            }
        });
        return false;
    };
    return ProjectListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ProjectListComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ProjectListComponent.prototype, "pageSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ProjectListComponent.prototype, "dbQuery", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ProjectListComponent.prototype, "leaderId", void 0);
ProjectListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-project-list',
        template: __webpack_require__(962),
        styles: [__webpack_require__(892)],
        changeDetection: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_user_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_project__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_project__["a" /* ProjectService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"]) === "function" && _c || Object])
], ProjectListComponent);

var _a, _b, _c;
//# sourceMappingURL=project.list.component.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_project_index__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectViewComponent = (function () {
    /**
    * Dependency Injection: route (for reading params later)
    */
    function ProjectViewComponent(userService, router, route, projectService) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.projectService = projectService;
        this.project = new __WEBPACK_IMPORTED_MODULE_3__shared_project_index__["b" /* ProjectModel */]();
    }
    /**
     * Initialization Event Handler, used to parse route params
     * like `id` in project/:id/edit)
     */
    ProjectViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            // console.log('View Project by ID from route params:', id)
            _this.loadProject(id);
        });
    };
    ProjectViewComponent.prototype.loadProject = function (id) {
        var _this = this;
        if (id) {
            this.projectService.getProject(id)
                .subscribe(function (data) {
                _this.project = new __WEBPACK_IMPORTED_MODULE_3__shared_project_index__["b" /* ProjectModel */]();
                _this.project.parseData(data);
                __WEBPACK_IMPORTED_MODULE_3__shared_project_index__["a" /* ProjectService */].cacheProject(_this.project);
            }, function (err) { return console.error(err); }, function () { });
        }
    };
    /**
     * Remove this project
     * @param {project} Project being viewed
     */
    ProjectViewComponent.prototype.deleteProject = function (project) {
        // Delete from DB
        this.projectService.deleteProject(project, true);
        // this.router.navigate(['/projects']);
        return false;
    };
    return ProjectViewComponent;
}());
ProjectViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-project-view',
        template: __webpack_require__(963),
        styles: [__webpack_require__(254), __webpack_require__(893)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared_project_index__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_project_index__["a" /* ProjectService */]) === "function" && _d || Object])
], ProjectViewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=project.view.component.js.map

/***/ }),

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DonationModel; });
var DonationModel = (function () {
    function DonationModel() {
        this.virtual = false;
        this.status = 'unfinished';
    }
    DonationModel.prototype.toString = function () {
        return JSON.stringify({
            _id: this._id,
            donorId: this.donorId,
            virtual: this.virtual,
            targetId: this.targetId,
            externalId: this.externalId,
            targetType: this.targetType,
            amount: this.amount,
            dateStarted: this.dateStarted,
            dateCompleted: this.dateCompleted,
            description: this.description,
            result_url: this.result_url,
            server_url: this.server_url,
            status: this.status
        });
    };
    /**
    * Populate model from a json representation loaded from DB
    */
    DonationModel.prototype.parseData = function (data) {
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                this[item] = data[item];
            }
        }
    };
    return DonationModel;
}());

//# sourceMappingURL=donation.model.js.map

/***/ }),

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DonationsListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DonationsListComponent = (function () {
    function DonationsListComponent(donationService, http) {
        this.donationService = donationService;
        this.http = http;
        // List title
        this.title = '';
        // How many list items to show and to request from db in single turn
        this.pageSize = 5;
        // For searching and filering in DB
        this.dbQuery = '{}';
        this.items = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([{ title: 'Loading...' }]);
        this.itemsPage = {
            docs: this.items,
            limit: this.pageSize,
            page: 1,
            pages: 0,
            total: 0
        };
    }
    DonationsListComponent.prototype.ngOnChanges = function (changes) {
        var target = changes.target.currentValue;
        if (target && target._id ||
            changes.pageSize && changes.pageSize.currentValue ||
            changes.dbQuery && changes.dbQuery.currentValue) {
            this.requestItems();
        }
    };
    DonationsListComponent.prototype.pageChanged = function (pageNumber) {
        this.itemsPage.page = pageNumber;
        this.requestItems();
    };
    // FIXME REMOVE CODE DUPLICATION
    DonationsListComponent.prototype.requestItems = function () {
        var _this = this;
        var proxySub = this.donationService.getDonationsPage(null, this.target._id, this.targetType, this.itemsPage.page, this.pageSize, this.dbQuery)
            .subscribe(function (responsePage) {
            // console.log('Next, responsePage:', responsePage);
            _this.itemsPage.docs.next(responsePage['docs']);
            _this.itemsPage.limit = responsePage['limit'];
            _this.itemsPage.page = responsePage['page'];
            _this.itemsPage.pages = responsePage['pages'];
            _this.itemsPage.total = responsePage['total'];
            proxySub.unsubscribe();
        });
    };
    return DonationsListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonationsListComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonationsListComponent.prototype, "target", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", String)
], DonationsListComponent.prototype, "targetType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonationsListComponent.prototype, "pageSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DonationsListComponent.prototype, "dbQuery", void 0);
DonationsListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-donations-list',
        template: __webpack_require__(965),
        styles: [__webpack_require__(896)],
        changeDetection: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ChangeDetectionStrategy"].OnPush,
        providers: [__WEBPACK_IMPORTED_MODULE_3__index__["a" /* DonationService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__index__["a" /* DonationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__index__["a" /* DonationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"]) === "function" && _b || Object])
], DonationsListComponent);

var _a, _b;
//# sourceMappingURL=donations.list.component.js.map

/***/ }),

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriveService; });
/* Download the declaration file (*.d.ts) for the Google Drive Realtime API here:
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/google-drive-realtime-api
http://stackoverflow.com/questions/35374878/angular-2-with-google-drive-realtime-api

This provides a TypeScript wrapper for the API.
Specifically, it defines a module named gapi.drive.realtime whose classes can be accessed in Angular2.

To tell the compiler about the declaration file, you need to add the following line to your TypeScript source file:

Then you need to import the module's features. One way to do this is with the following import command:

Then you can access the module's classes under the Drive namespace:
  Drive.Collaborator,
  Drive.CollaborativeObject, and so on. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DriveService = (function () {
    function DriveService() {
        console.log('✇ Hi, from Drive Service ✇');
    }
    DriveService.prototype.checkConnection = function () {
        console.log('Drive Service: checkConnection');
    };
    return DriveService;
}());
DriveService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], DriveService);

//# sourceMappingURL=drive.service.js.map

/***/ }),

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesEditComponent; });
/// <reference path="../../../../../node_modules/@types/gapi/index.d.ts"/>
/// <reference path="../../../../../node_modules/@types/gapi.auth2/index.d.ts"/>
/// <reference path="./google-drive-api.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilesEditComponent = (function () {
    function FilesEditComponent(ref) {
        this.ref = ref;
        this.savedSignInUserInfo = null;
        this.gdrive_authorized = false;
        this.fileToUpload = null;
        this.fileToUploadName = '';
        this.folderForUploads = null;
        this.uploadInProgress = false;
        this.fileList = [];
        this.onFileListUpdate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * On load, called to load the auth2 library and API client library.
     */
    FilesEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('BP User:', this.userService);
        gapi.load('client:auth2', function () { _this.initClient(_this); });
    };
    FilesEditComponent.prototype.updateFilesList = function (files) {
        this.fileList = files;
        this.onFileListUpdate.emit(this.fileList);
        this.updateUIOnChange();
    };
    FilesEditComponent.prototype.updateUIOnChange = function () {
        this.ref.markForCheck();
        this.ref.detectChanges();
    };
    /**
     *  Initializes GDrive API client library and sets up sign-in state listeners.
     */
    FilesEditComponent.prototype.initClient = function (that) {
        var _this = this;
        // FIXME_SEC
        // Client ID and API key from the Developer Console
        var CLIENT_ID = '254701279966-lgp72d0ou71o9865v7tp55fmc08ac661.apps.googleusercontent.com';
        // Array of API discovery doc URLs for APIs used by the quickstart
        var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        var SCOPES = [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.appdata',
            'https://www.googleapis.com/auth/drive.file'
        ].join(' ');
        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function (res) {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(function (result) { _this.updateSigninStatus(result); });
            // Handle the initial sign-in state.
            _this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    };
    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    FilesEditComponent.prototype.updateSigninStatus = function (isSignedIn) {
        this.gdrive_authorized = isSignedIn;
        if (isSignedIn) {
            this.savedSignInUserInfo = gapi.auth2.getAuthInstance().currentUser.get();
            this.getFiles();
        }
        else {
            console.log('All the saints are signed out');
            this.updateFilesList([{}]);
        }
        // console.log('Is signed in: ', isSignedIn, this.savedSignInUserInfo);
    };
    /**
     *  Sign in the user upon button click.
     */
    FilesEditComponent.prototype.handleAuthClick = function (event) {
        console.log('All the saints are signing in');
        gapi.auth2.getAuthInstance().signIn();
        return false;
    };
    /**
     *  Sign out the user upon button click.
     */
    FilesEditComponent.prototype.handleSignoutClick = function (event) {
        console.log('All the saints are signing out');
        gapi.auth2.getAuthInstance().signOut();
        return false;
    };
    // ---------------------------------------------------------------------------
    // Uploading User's files
    // ---------------------------------------------------------------------------
    FilesEditComponent.prototype.handleSelectFileClick = function () {
        this.fileInput.nativeElement.click();
    };
    FilesEditComponent.prototype.handleUploadFilenameChange = function (evt) {
        var fullPath = evt.target.value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            this.fileToUpload = evt.target.files[0];
            this.fileToUploadName = filename;
            this.updateUIOnChange();
        }
    };
    FilesEditComponent.prototype.handleUploadFileClick = function (event) {
        this.initUpload();
        return false;
    };
    /**
     * Initiate the upload.
     */
    FilesEditComponent.prototype.initUpload = function () {
        var _this = this;
        var self = this;
        var xhr = new XMLHttpRequest();
        var file = this.fileToUpload;
        this.uploadInProgress = true;
        this.updateUIOnChange();
        // FIXME Add description
        var metadata = {
            'name': file.name,
            'title': file.name,
            'mimeType': file.type,
            'description': 'This file was uploaded via BigPolicy',
            parents: [this.folderForUploads.id]
        };
        xhr.open('POST', 'https://www.googleapis.com/drive/v3/files?uploadType=multipart', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Upload-Content-Length', this.fileToUpload.size);
        xhr.setRequestHeader('X-Upload-Content-Type', this.fileToUpload.type);
        xhr.onload = function (e) {
            var resp = JSON.parse(e.target.response);
            _this.sendFile(resp.id);
        };
        xhr.onerror = function (err) { return console.log('Upload error:', err); };
        xhr.send(JSON.stringify(metadata));
    };
    ;
    /**
     * Send the actual file content.
     *
     * @private
     */
    FilesEditComponent.prototype.sendFile = function (fileId) {
        var _this = this;
        this.fileToUpload.id = fileId;
        var content = this.fileToUpload;
        var end = this.fileToUpload.size;
        var xhr = new XMLHttpRequest();
        xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId, true);
        xhr.setRequestHeader('Content-Type', this.fileToUpload.type);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
        xhr.setRequestHeader('X-Upload-Content-Type', this.fileToUpload.type);
        xhr.onload = function (res) { return _this.onFileUploadComplete(); };
        xhr.onerror = function (err) { return console.log('Upload error:', err); };
        xhr.send(content);
    };
    ;
    FilesEditComponent.prototype.onFileUploadComplete = function () {
        this.fileToUpload = null;
        this.fileToUploadName = '';
        this.uploadInProgress = false;
        this.listFiles();
    };
    // ---------------------------------------------------------------------------
    // Listing User's files
    // ---------------------------------------------------------------------------
    FilesEditComponent.prototype.getFiles = function () {
        var preloaderFile = {
            id: '',
            webViewLink: '',
            title: 'Завантажую список файлів...',
            name: 'Завантажую список файлів...'
        };
        this.updateFilesList([preloaderFile]);
        this.getFolder();
    };
    /**
     * Gets the 'BigPolicy Files' folder for given user or creates if there's no such folder
     */
    FilesEditComponent.prototype.getFolder = function () {
        var _this = this;
        var folderMetadata = {
            q: 'name = "BigPolicy Files"',
            fields: 'nextPageToken, files(id, name)'
        };
        // console.log('Get folder:', folderMetadata);
        gapi.client.drive.files.list(folderMetadata)
            .execute(function (resp, raw_resp) {
            var folder = resp.files[0];
            if (!folder) {
                _this.createFolder();
                return;
            }
            _this.initFolder(folder);
        });
    };
    FilesEditComponent.prototype.initFolder = function (folder) {
        this.folderForUploads = folder;
        console.log('Got Drive Folder Id: ', this.folderForUploads);
        this.listFiles();
    };
    FilesEditComponent.prototype.createFolder = function () {
        var _this = this;
        var fileMetadata = {
            'name': 'BigPolicy Files',
            'mimeType': 'application/vnd.google-apps.folder',
        };
        gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id'
        }, null).execute(function (resp, raw_resp) {
            console.log('Created Folder Id: ', resp);
            // this.folderForUploads = resp;
            _this.initFolder(resp);
        });
    };
    /**
     * Create a list of files loaded from gdrive.
     */
    FilesEditComponent.prototype.listFiles = function () {
        var _this = this;
        gapi.client.drive.files.list({
            'q': '"' + this.folderForUploads.id + '" in parents',
            'pageSize': 7,
            'fields': 'nextPageToken, files(id, name, webViewLink, mimeType)',
        }).then(function (response) {
            var files = [];
            var responseFiles = response.result.files;
            if (responseFiles && responseFiles.length > 0) {
                for (var i = 0; i < responseFiles.length; i++) {
                    var file = responseFiles[i];
                    files.push(file);
                }
                _this.updateFilesList(files);
            }
        });
    };
    return FilesEditComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FilesEditComponent.prototype, "userService", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FilesEditComponent.prototype, "onFileListUpdate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], FilesEditComponent.prototype, "fileInput", void 0);
FilesEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-files',
        template: __webpack_require__(966),
        styles: [__webpack_require__(897)],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _a || Object])
], FilesEditComponent);

var _a;
//# sourceMappingURL=files.edit.component.js.map

/***/ }),

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

;
var FilesViewComponent = (function () {
    function FilesViewComponent() {
    }
    FilesViewComponent.prototype.ngOnInit = function () {
    };
    return FilesViewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FilesViewComponent.prototype, "files", void 0);
FilesViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-files-view',
        template: __webpack_require__(967),
        styles: [__webpack_require__(898)]
    }),
    __metadata("design:paramtypes", [])
], FilesViewComponent);

//# sourceMappingURL=files.view.component.js.map

/***/ }),

/***/ 622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImageComponent = (function () {
    function ImageComponent() {
        this.src = 'assets/img/avatar-generic.png';
    }
    return ImageComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "src", void 0);
ImageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-image',
        template: __webpack_require__(968),
        styles: [__webpack_require__(899)]
    })
], ImageComponent);

//# sourceMappingURL=image.component.js.map

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navbar_index__ = __webpack_require__(624);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__navbar_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar_index__ = __webpack_require__(628);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__toolbar_index__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navbar_component__ = __webpack_require__(625);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__navbar_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leader__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * This class represents the navigation bar component.
 */
var NavbarComponent = (function () {
    function NavbarComponent(userService, leaderService) {
        this.userService = userService;
        this.leaderService = leaderService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.leaderService.leaderStream
            .subscribe(function (item) {
            // console.log('Navbar: showCreateLeaderButton =', this.showCreateLeaderButton);
            _this.showCreateLeaderButton = _this.userService.authenticated() && !_this.userService.hasLeader();
        });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-navbar',
        template: __webpack_require__(969),
        styles: [__webpack_require__(900)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__user__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__leader__["b" /* LeaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__leader__["b" /* LeaderService */]) === "function" && _b || Object])
], NavbarComponent);

var _a, _b;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_project_index__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__share_service__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SharerComponent = (function () {
    function SharerComponent(shareService) {
        this.shareService = shareService;
        this.sharerIsVisible = false;
        this.formStatus = '';
        this.emailSent = false;
        this.textToReader = 'Друже, хочу поділитися з тобою своїм задумом: ';
        this.showEmailPreview = true;
        this.showHtmlPreview = false;
        this.formErrors = {
            'toEmail': ''
        };
        this.validationMessages = {
            'toEmail': {
                'required': 'Будь ласка, заповніть поле',
                'validateEmail': 'Будь ласка, уведіть коректну адресу'
            }
        };
        // Model to share. Here, the videoUrl may be overridden before share:
        this.emailToShare = {
            from: '',
            toEmails: {},
            subject: '',
            html: '',
            videoUrl: ''
        };
    }
    // FIXME It's a workaround due to: https://github.com/angular/material2/issues/3346
    SharerComponent.prototype.ngAfterViewInit = function () {
        this.resizableTextArea.element.nativeElement.style.height = 'auto';
    };
    SharerComponent.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    SharerComponent.prototype.getFormState = function (stateName) {
        return this.formStatus === stateName;
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
    SharerComponent.prototype.handleInputBlur = function (e) {
        this.onValueChanged(e);
    };
    SharerComponent.prototype.onValueChanged = function (data) {
        if (!this.shareForm) {
            return;
        }
        var form = this.shareForm.form;
        for (var field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                var control = form.get(field);
                // Here's the complex logic for which we needed this method
                if (control && (control.dirty || control.touched) && !control.valid) {
                    var messages = this.validationMessages[field];
                    for (var key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    };
    Object.defineProperty(SharerComponent.prototype, "videoUrl", {
        /*
         * Overriding model videoUrl by email videoUrl
         */
        get: function () {
            // FIXME it's called too often
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
    /**
     * Send the form
     * @param {formValue} Form value to share
     */
    SharerComponent.prototype.shareItem = function (formValue) {
        var _this = this;
        if (!this.shareForm.form.valid) {
            this.formStatus = 'formIsNotComplete';
            return false;
        }
        this.formStatus = 'emailIsBeingSent';
        // Populate email properties on before share;
        this.emailToShare.html = this.emailHtml;
        this.emailToShare.from = this.project.managerEmail;
        this.emailToShare.subject = this.emailSubject;
        this.emailToShare.toEmails = {};
        this.emailToShare.toEmails[this.toEmail] = this.toEmail;
        this.emailToShare.videoUrl = this.videoUrl;
        this.shareService.share(this.emailToShare)
            .subscribe(function (data) {
            _this.formStatus = 'emailSent';
            console.log('Project Shared', data);
        }, function (err) { return function (er) {
            _this.formStatus = 'emailSendError';
            console.error('Project sharing error: ', er);
        }; }, function () { });
        return false;
    };
    Object.defineProperty(SharerComponent.prototype, "emailHtml", {
        /**
         * Populate email properties on project before share or preview;
         */
        get: function () {
            return this.textToReader
                + "<h1 align=\"center\" class=\"emailH1\">\n            "
                + this.project.title + "</h1>\n            <p style=\"display:none;\">\n            "
                + this.project.description + "<br><br></p><p align=\"center\">\n            "
                + this.shareService.getYouTubeThumbnail(this.videoUrl, "full")
                +
                    "\n            <br>\n            <br>\n            <a href=\"" + this.shareService.getUrl() + "\">\u0422\u0443\u0442 \u043C\u043E\u0436\u043D\u0430 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442</a>\n            <br>\n            <br>\n            </p>\n            <p>\u0429\u0438\u0440\u043E \u0432\u0434\u044F\u0447\u043D\u0438\u0439,<br>"
                + this.project.managerName + "<br>\n            <small>" + this.project.managerEmail + "</small></p>\n            "
                +
                    "\n            <a href=\"http://bigpolicy.eu/\"><img src=\"http://bigpolicy.eu/assets/img/logo.png\" width=\"40\"></a>";
        },
        enumerable: true,
        configurable: true
    });
    SharerComponent.prototype.toggleSharer = function () {
        this.sharerIsVisible = !this.sharerIsVisible;
        return false;
    };
    SharerComponent.prototype.toggleHtmlPreview = function () {
        this.showHtmlPreview = !this.showHtmlPreview;
        return false;
    };
    return SharerComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SharerComponent.prototype, "sharerIsVisible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_project_index__["b" /* ProjectModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_project_index__["b" /* ProjectModel */]) === "function" && _a || Object)
], SharerComponent.prototype, "project", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('shareForm'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* NgForm */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* NgForm */]) === "function" && _b || Object)
], SharerComponent.prototype, "currentForm", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MdTextareaAutosize */], { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _c || Object)
], SharerComponent.prototype, "resizableTextArea", void 0);
SharerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-sharer',
        template: __webpack_require__(970),
        styles: [__webpack_require__(901)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('visibilityChanged', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('true', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 1 })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('false', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0.2 })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('1 => 0', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('600ms')),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('0 => 1', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms'))
            ])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_2__share_service__["a" /* ShareService */]]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__share_service__["a" /* ShareService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__share_service__["a" /* ShareService */]) === "function" && _d || Object])
], SharerComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=sharer.component.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskModel; });
var TaskModel = (function () {
    function TaskModel() {
        this.cost = 1;
        this.projectId = '';
        this.project = null;
        // String type is used for conversion between DB and Date input formats
        this.dateStarted = this.toDateInputValue(new Date());
        this.dateEnded = this.toDateInputValue(new Date());
        this.totalDonationsReceived = 0;
    }
    /**
     * It's necessary to have a string representation for sending it to DB
     * @returns String Serialized Leader
     */
    TaskModel.prototype.toString = function () {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            cost: this.cost,
            projectId: this.projectId,
            dateStarted: this.dateStarted,
            dateEnded: this.dateEnded,
            imageUrl: this.imageUrl,
            videoUrl: this.videoUrl,
            totalDonationsReceived: this.totalDonationsReceived
        });
    };
    /**
     * Populate model from a json representation loaded from DB
     */
    TaskModel.prototype.parseData = function (data) {
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                this[item] = data[item];
            }
        }
        this.dateStarted = this.toDateInputValue(this.dateStarted);
        this.dateEnded = this.toDateInputValue(this.dateEnded);
    };
    /**
     * Adopts date from Mongo DB format for UI datepicker
     */
    TaskModel.prototype.toDateInputValue = function (dateToParse) {
        var date = new Date(dateToParse);
        var local = new Date(dateToParse);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        // Convert date string like this: 2017-03-19T13:11:33.615Z into this: 2017-03-19
        return local.toJSON().slice(0, 10);
    };
    return TaskModel;
}());

//# sourceMappingURL=task.model.js.map

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_component__ = __webpack_require__(629);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__toolbar_component__["a"]; });
/**
 * This barrel file provides the export for the shared ToolbarComponent.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_service__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * This class represents the toolbar component.
 */
var ToolbarComponent = (function () {
    function ToolbarComponent(userService) {
        this.userService = userService;
        this.isDarkTheme = false;
    }
    return ToolbarComponent;
}());
ToolbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-toolbar',
        template: __webpack_require__(971),
        styles: [__webpack_require__(902)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__user_user_service__["a" /* UserService */]) === "function" && _a || Object])
], ToolbarComponent);

var _a;
//# sourceMappingURL=toolbar.component.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UploaderComponent = (function () {
    function UploaderComponent(af) {
        this.af = af;
        /**
         * The name of the folder for images
         * eg. posts/angular-is-awesome
         */
        this.folder = 'bp-user-files';
        this.listFiles = 'no';
        this.listFilesOnStart = false;
        // FIXME Why Oncnages were neded to bloody get rid of this for prod build:
        // ERROR in /Users/rsiryk/dev/BP/bp/src/$$_gendir/app/shared/uploader/uploader.component.ngfactory.ts (1,1):
        // Operator '===' cannot be applied to types 'boolean' and '"fab"'.
        this.buttonType = 'nofab';
        this.buttonLabel = 'Завантажити фото';
        this.useFabButton = false;
        // After successful upload, will emit uploadedFileUrl taken from 'snapshot' object, see below
        this.uploadedFileUrlChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        // Sibfolder - just in case
        this.postfix = '';
        //
        // State management
        //
        this.uploadInProgress = false;
        this.fileToUpload = null;
        this.fileToUploadName = null;
        // For temporarily showing upload finished
        this.uploadJustHaveFinished = false;
        // For one-click uploads via fab button
        this.uploadImmediately = false;
    }
    UploaderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.buttonType) {
            this.useFabButton = changes.buttonType.currentValue === 'fab';
        }
        if (changes.listFiles) {
            this.listFilesOnStart = changes.listFiles.currentValue === 'yes';
        }
        console.log('new values for folder');
        var storage = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]();
        this.fileList = this.af.database.list("/" + this.folder + this.postfix);
        console.log('Rendering all images in ', "/" + this.folder + this.postfix);
        this.imageList = this.fileList.map(function (itemList) {
            return itemList.map(function (item) {
                var pathReference = storage.ref(item.path);
                var result = { $key: item.$key, downloadURL: pathReference.getDownloadURL(), path: item.path, filename: item.filename };
                console.log(result);
                return result;
            });
        });
    };
    UploaderComponent.prototype.initUpload = function () {
        var _this = this;
        this.uploadInProgress = true;
        // Create a root reference
        var storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref();
        var _loop_1 = function (selectedFile) {
            // Make local copies of services because 'this' will be clobbered
            // const router = this.router;
            var af = this_1.af;
            var folder = this_1.folder + this_1.postfix;
            var path = "/" + this_1.folder + "/" + selectedFile.name;
            // Upload happens here
            var iRef = storageRef.child(path);
            // console.log(`Upload a file, path = ${path}, selectedFile: ${selectedFile}, folder = ${folder}, iRef = ${iRef}`);
            iRef.put(selectedFile).then(function (snapshot) {
                // console.log('Uploaded a blob or file! Now storing the reference at', folder, snapshot.downloadURL, snapshot);
                _this.uploadedFileUrl = snapshot.downloadURL;
                af.database.list("/" + folder).push({ path: path, filename: selectedFile.name });
                _this.onFileUploadComplete();
            });
        };
        var this_1 = this;
        // This currently only grabs item 0, TODO refactor it to grab them all
        for (var _i = 0, _a = [document.getElementById('fileInput').files[0]]; _i < _a.length; _i++) {
            var selectedFile = _a[_i];
            _loop_1(selectedFile);
        }
    };
    UploaderComponent.prototype.delete = function (image) {
        var storagePath = image.path;
        var referencePath = "" + this.folder + this.postfix + "/" + image.$key;
        // Do these as two separate steps so you can still try delete ref if file no longer exists
        // Delete from Storage
        __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref().child(storagePath).delete()
            .then(function () { }, function (error) { return console.error('Error deleting stored file', storagePath); });
        // Delete references
        this.af.database.object(referencePath).remove();
    };
    ///////////////////////////////////////
    UploaderComponent.prototype.handleUploadFilenameChange = function (evt) {
        var fullPath = evt.target.value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            this.fileToUpload = evt.target.files[0];
            this.fileToUploadName = filename;
            if (this.uploadImmediately) {
                this.handleUploadFileClick();
                this.uploadImmediately = false;
            }
        }
    };
    UploaderComponent.prototype.handleSelectFileClick = function (event, uploadImmediately) {
        if (uploadImmediately === void 0) { uploadImmediately = false; }
        this.uploadImmediately = uploadImmediately;
        this.fileInput.nativeElement.click();
        return false;
    };
    UploaderComponent.prototype.handleUploadFileClick = function (event) {
        if (event === void 0) { event = null; }
        this.initUpload();
        return false;
    };
    UploaderComponent.prototype.onFileUploadComplete = function () {
        this.fileToUpload = null;
        this.fileToUploadName = '';
        this.uploadInProgress = false;
        this.uploadJustHaveFinished = true;
        // Output the value
        this.uploadedFileUrlChange.emit(this.uploadedFileUrl);
        setTimeout(this.onClearUploadJustHaveFinishedFlag, 3000, this);
    };
    UploaderComponent.prototype.onClearUploadJustHaveFinishedFlag = function (host) {
        host.uploadJustHaveFinished = false;
    };
    return UploaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UploaderComponent.prototype, "folder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UploaderComponent.prototype, "listFiles", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UploaderComponent.prototype, "buttonType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Object)
], UploaderComponent.prototype, "buttonLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('fileInput'),
    __metadata("design:type", Object)
], UploaderComponent.prototype, "fileInput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]) === "function" && _a || Object)
], UploaderComponent.prototype, "uploadedFileUrlChange", void 0);
UploaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-uploader',
        template: __webpack_require__(972),
        styles: [__webpack_require__(909)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angularfire2__["b" /* AngularFire */]) === "function" && _b || Object])
], UploaderComponent);

var _a, _b;
//# sourceMappingURL=uploader.component.js.map

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UserModel */
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());

;
//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidatorDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var EmailValidatorDirective = EmailValidatorDirective_1 = (function () {
    function EmailValidatorDirective() {
    }
    EmailValidatorDirective.prototype.validate = function (control) {
        var EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return EMAIL_REGEXP.test(control.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    return EmailValidatorDirective;
}());
EmailValidatorDirective = EmailValidatorDirective_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[appValidateEmail]',
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALIDATORS */], useExisting: EmailValidatorDirective_1, multi: true }]
    })
], EmailValidatorDirective);

var EmailValidatorDirective_1;
//# sourceMappingURL=email.validator.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VideoComponent = (function () {
    function VideoComponent(sanitizer) {
        this.sanitizer = sanitizer;
        // Unused at the moment, but will be needed for images alt text
        this.title = '';
    }
    Object.defineProperty(VideoComponent.prototype, "videoUrl", {
        // FIXME_SEC
        // Main input, a media (video) url
        set: function (url) {
            if (url) {
                // Set YouTube ID
                var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
                this.youTubeId = (match && match[7].length === 11) ? match[7] : null;
                // FIXME_SEC Set safe media URL
                this.safeMediaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youTubeId
                    ? 'https://www.youtube.com/embed/' + this.youTubeId
                    : null);
                // Set thumb URL by video
                this.thumbUrl = this.youTubeId
                    ? 'http://img.youtube.com/vi/' + this.youTubeId + '/0.jpg'
                    : 'assets/img/project/project-placeholder.png';
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    return VideoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], VideoComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], VideoComponent.prototype, "placeholderUrl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], VideoComponent.prototype, "videoUrl", null);
VideoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-video',
        template: __webpack_require__(974),
        styles: [__webpack_require__(904)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _a || Object])
], VideoComponent);

var _a;
//# sourceMappingURL=video.component.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_project_index__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_task_index__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TaskEditComponent = (function () {
    function TaskEditComponent(route, router, taskService, projectService, location, userService) {
        this.route = route;
        this.router = router;
        this.taskService = taskService;
        this.projectService = projectService;
        this.location = location;
        this.userService = userService;
        this.projectId = '';
        // @Input() project: ProjectModel;
        this.isUpdateMode = false;
        // FIXME Used for moving tasks to other projects - Extract to separate component
        this.projects = null;
        this.currentProject = new __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["b" /* ProjectModel */]();
        this.task = new __WEBPACK_IMPORTED_MODULE_3__shared_task_index__["b" /* TaskModel */]();
    }
    /**
     * Initialization Event Handler, used to parse route params
     * like `id` in task/:id/edit)
     */
    TaskEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // if project id is provided, it means we editing / adding task from inside the parent project
        console.log('Task Editor Initialization, provided Project Id:', this.projectId);
        if (this.projectId) {
            return;
        }
        this.route.params
            .map(function (params) {
            console.log('Route params:', params);
            return params['id'];
        })
            .subscribe(function (taskId) {
            console.log('Task Editor by ID from route params:', taskId);
            if (taskId) {
                _this.taskService.getTask(taskId).subscribe(function (data) {
                    _this.parseLoadedTask(data);
                });
            }
        });
    };
    /**
     * Task loading handler
     * @param {data} Loaded task data
     */
    TaskEditComponent.prototype.parseLoadedTask = function (task) {
        console.log('Set task:', task, ', project =', task.projectId);
        this.isUpdateMode = true;
        this.task = new __WEBPACK_IMPORTED_MODULE_3__shared_task_index__["b" /* TaskModel */]();
        this.task.parseData(task);
    };
    /**
     * Remove this task
     * @param {task} Task being viewed
     */
    TaskEditComponent.prototype.deleteTask = function (task) {
        // Delete from DB
        this.taskService.deleteTask(task);
        this.router.navigate(['/project/' + task.projectId]);
        return false;
    };
    /**
     * Saves new or edited task by asking one of two service methods for DB.
     * @returns return false to prevent default form submit behavior to refresh the page.
     */
    // FIXME: Complete Task processing
    TaskEditComponent.prototype.saveTask = function () {
        var _this = this;
        if (this.isUpdateMode) {
            // Update existing task
            this.taskService.updateTask(this.task)
                .subscribe(function (data) { _this.gotoTask(data); }, function (err) { return function (er) { return console.error('Task update error: ', er); }; }, function () { });
        }
        else {
            // Create new task
            this.task.projectId = this.projectId;
            console.log('idd =', this.task.projectId);
            this.taskService.createTask(this.task)
                .subscribe(function (data) { _this.gotoTask(data); }, function (err) { return function (er) { return console.error('Task creation error: ', er); }; }, function () { });
        }
        return false;
    };
    TaskEditComponent.prototype.gotoTask = function (task) {
        var taskId = task._id;
        if (taskId) {
            console.log('𝕱 𝕱 𝕱 Go to task by ID: ', taskId);
            this.router.navigate(['/task', taskId]).then(function (_) {
                // navigation is done
            });
        }
    };
    TaskEditComponent.prototype.cancelEditing = function () {
        this.location.back();
    };
    // FIXME Move to service / component
    TaskEditComponent.prototype.requestProjectsToSelectFrom = function () {
        var _this = this;
        this.projectService.getProjectsPage(null, null, 1, 100, '{}')
            .subscribe(function (res) {
            _this.projects = res['docs'];
            console.log('got projects: ', _this.projects);
            for (var p in _this.projects) {
                if (_this.projects.hasOwnProperty(p)) {
                    console.log('got project: ', _this.projects[p]._id, _this.projects[p].title);
                    if (_this.task.projectId === _this.projects[p]._id) {
                        // Memorize current project for later usage - we'll remove task from him:
                        _this.currentProject.parseData(_this.projects[p]);
                    }
                }
            }
        });
    };
    /**
     * Assigns Task to other Project
     */
    // FIXME CHECK how to reuse projects Re-assign from taskService.deleteTask method
    // FIXME Move it to Service
    TaskEditComponent.prototype.moveTaskToOtherProject = function (event) {
        var newProject = new __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["b" /* ProjectModel */]();
        newProject.parseData(event.value);
        console.log("> Move Task to: ", newProject.title);
        // Update task
        this.task.projectId = newProject._id;
        this.task.project = newProject;
        this.saveTask();
        // Add Task to new Project:
        if (newProject.tasks.indexOf(this.task._id) === -1) {
            newProject.tasks.push(this.task._id);
            this.projectService.updateProject(newProject).subscribe();
        }
        // Remove Task from current Project:
        // FIXME Error sometimes: ERROR TypeError: Cannot read property 'splice' of undefined
        this.currentProject.tasks.splice(this.currentProject.tasks.indexOf(this.task._id), 1);
        this.projectService.updateProject(this.currentProject).subscribe();
    };
    return TaskEditComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskEditComponent.prototype, "projectId", void 0);
TaskEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-bp-task-edit',
        template: __webpack_require__(975),
        styles: [__webpack_require__(905)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_task_index__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_task_index__["a" /* TaskService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_project_index__["a" /* ProjectService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common__["Location"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_user_user_service__["a" /* UserService */]) === "function" && _f || Object])
], TaskEditComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=task.edit.component.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_task_index__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_project_index__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_user_user_service__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TaskListComponent = (function () {
    function TaskListComponent(userService, taskService, http) {
        this.userService = userService;
        this.taskService = taskService;
        this.http = http;
        // List title
        this.title = '';
        // How many tasks to show and to request from db in single turn
        this.pageSize = 5;
        // For searching in DB
        this.dbQuery = '{}';
        // An project this task list belongs to
        this.project = new __WEBPACK_IMPORTED_MODULE_4__shared_project_index__["b" /* ProjectModel */]();
        this.tasks = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([{ title: 'Loading...' }]);
        this.itemsPage = {
            docs: this.tasks,
            limit: this.pageSize,
            page: 1,
            pages: 0,
            total: 0
        };
        this.isAddingTaskMode = false;
    }
    TaskListComponent.prototype.ngOnChanges = function (changes) {
        var project = changes.project && changes.project.currentValue;
        if (project && project._id ||
            changes.pageSize && changes.pageSize.currentValue ||
            changes.dbQuery && changes.dbQuery.currentValue) {
            this.requestTasks();
        }
    };
    TaskListComponent.prototype.pageChanged = function (pageNumber) {
        this.itemsPage.page = pageNumber;
        this.requestTasks();
    };
    // FIXME Consider elimintation of the code duplication in paginator
    TaskListComponent.prototype.requestTasks = function () {
        var _this = this;
        var proxySub = this.taskService.getTasksPage(null, this.project._id, this.itemsPage.page, this.pageSize, this.dbQuery)
            .subscribe(function (responsePage) {
            // console.log('Next, responsePage:', responsePage);
            _this.itemsPage.docs.next(responsePage['docs']);
            _this.itemsPage.limit = responsePage['limit'];
            _this.itemsPage.page = responsePage['page'];
            _this.itemsPage.pages = responsePage['pages'];
            _this.itemsPage.total = responsePage['total'];
            proxySub.unsubscribe();
        });
    };
    TaskListComponent.prototype.addTask = function () {
        this.isAddingTaskMode = true;
        return false;
    };
    TaskListComponent.prototype.deleteTask = function (taskToRemove) {
        // Delete in UI
        var updatedTasks;
        this.tasks.subscribe(function (tasks) {
            updatedTasks = tasks.filter(function (task) { return task._id !== taskToRemove._id; });
        });
        this.tasks.next(updatedTasks);
        // Delete from DB
        this.taskService.deleteTask(taskToRemove);
        return false;
    };
    return TaskListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskListComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskListComponent.prototype, "pageSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskListComponent.prototype, "dbQuery", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_project_index__["b" /* ProjectModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_project_index__["b" /* ProjectModel */]) === "function" && _a || Object)
], TaskListComponent.prototype, "project", void 0);
TaskListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-task-list',
        template: __webpack_require__(976),
        styles: [__webpack_require__(906)],
        changeDetection: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_user_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_task_index__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_task_index__["a" /* TaskService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"]) === "function" && _d || Object])
], TaskListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=task.list.component.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_task_index__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_project_project_service__ = __webpack_require__(159);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// FIXME MOVE TO TASK SERVICE

var TaskViewComponent = (function () {
    /**
     * Dependency Injection: route (for reading params later)
     */
    function TaskViewComponent(userService, projectService, router, route, taskService, ref) {
        this.userService = userService;
        this.projectService = projectService;
        this.router = router;
        this.route = route;
        this.taskService = taskService;
        this.ref = ref;
        this.task = new __WEBPACK_IMPORTED_MODULE_1__shared_task_index__["b" /* TaskModel */]();
        this.compactView = false;
        this.dataprovided = false;
        this.projectTitle = '';
    }
    /**
     * Initialization Event Handler, used to parse route params
     * like `id` in task/:id/edit)
     */
    TaskViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dataprovided) {
            // FIXME Use caching - too many requests otherwise
            // FIXME Apply the same technique to Projects retrieving Leader info
            this.retrieveProject();
        }
        else {
            this.route.params
                .map(function (params) { return params['id']; })
                .subscribe(function (id) {
                console.log('View Task by ID from route params:', id);
                if (id) {
                    _this.taskService.getTask(id)
                        .subscribe(function (data) {
                        _this.task = data;
                        console.log('tpId =', _this.task.projectId, data);
                        _this.retrieveProject();
                    });
                }
            });
        }
    };
    TaskViewComponent.prototype.retrieveProject = function () {
        var _this = this;
        if (this.task.projectId) {
            // FIXME MOVE TO TASK SERVICE
            this.projectService.getProject(this.task.projectId)
                .subscribe(function (project) {
                _this.projectTitle = project.title;
                // console.log('a title:', this.projectTitle);
                _this.ref.markForCheck();
            });
        }
    };
    /**
     * Remove this task
     * @param {task} Task being viewed
     */
    TaskViewComponent.prototype.deleteTask = function (task) {
        // Delete from DB
        this.taskService.deleteTask(task);
        this.router.navigate(['/project/' + task.projectId]);
        return false;
    };
    return TaskViewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_task_index__["b" /* TaskModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_task_index__["b" /* TaskModel */]) === "function" && _a || Object)
], TaskViewComponent.prototype, "task", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskViewComponent.prototype, "compactView", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskViewComponent.prototype, "dataprovided", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TaskViewComponent.prototype, "projectTitle", void 0);
TaskViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-task-view',
        template: __webpack_require__(977),
        styles: [__webpack_require__(254), __webpack_require__(907)],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_project_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_project_project_service__["a" /* ProjectService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__shared_task_index__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_task_index__["a" /* TaskService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _g || Object])
], TaskViewComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=task.view.component.js.map

/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leader_service__ = __webpack_require__(373);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__leader_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__leader_model__ = __webpack_require__(372);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__leader_model__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\nh1 {\n  font-size: 3em; }\n\nh2 {\n  font-size: 2em;\n  margin-top: .83em;\n  padding-top: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  box-sizing: border-box; }\n\n.app-content {\n  box-sizing: border-box;\n  padding: 2rem; }\n\nfooter {\n  border-top: 1px solid #eee;\n  font-family: sans-serif;\n  font-size: .75rem;\n  padding: 1em;\n  text-align: center; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "app-home:host {\n  background-color: #eee;\n  box-sizing: border-box;\n  display: block;\n  padding: 2rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\n.bp-landing .container {\n  max-width: inherit;\n  width: 100%; }\n\n.bp-landing h4 {\n  font-size: 1.9em;\n  margin-bottom: .5em;\n  margin-top: .5em; }\n\n.bp-landing h5 {\n  font-size: 1.5em;\n  margin-top: 1.5em;\n  margin-bottom: 0.5em; }\n\nmd-card {\n  margin: 16px 0; }\n\np {\n  margin: 16px;\n  line-height: 1.4; }\n\n#stats {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em; }\n\n#stats md-grid-tile {\n  background: transparent; }\n\n#stats a {\n  text-decoration: none; }\n\n.numbers h2 {\n  font-size: 2em;\n  letter-spacing: normal; }\n\n.numbers span {\n  color: #f44336;\n  font-weight: bold; }\n\n.bp-landing a:href,\n.bp-landing a:visited {\n  color: #f44336; }\n\n.logo {\n  width: 9em;\n  margin: 0px 25px 25px 15px; }\n\n/* FIXME Hack due to Grid List lack of vertical align */\n.topcontent {\n  height: 100%; }\n\n.topcontent.leader img {\n  width: 60px;\n  vertical-align: middle;\n  margin-right: 1rem; }\n\n.align-bottom {\n  position: absolute;\n  bottom: 2rem;\n  right: 1rem; }\n\n#top-projects md-card-title {\n  font-size: 1.2em; }\n\n#bottomline {\n  background: #eee;\n  /* url('assets/img/bp-bg-gray-red.jpg'); */\n  min-height: 350px; }\n\n#bottomline .align-bottom {\n  position: absolute;\n  bottom: 0;\n  left: 1rem;\n  right: 0;\n  top: 1rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".leader-edit-card {\n  padding: 0; }\n  .leader-edit-card md-card-content {\n    padding: 24px; }\n\nmd-input-container,\ninput,\ntextarea {\n  width: 100%; }\n\n.validation-error {\n  border-right: 1em solid #e30;\n  color: #e30;\n  margin-bottom: 1.1em;\n  margin-top: -1em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 887:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".leaders-list md-card-title a {\n  text-decoration: none; }\n\n.leaders-list md-card-title a:hover {\n  text-decoration: underline; }\n\n.leader-card {\n  margin-bottom: 1em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\nh2:first-of-type {\n  margin-top: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 889:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "input,\ntextarea,\nmd-input-container {\n  width: 100%; }\n\n.cost-and-dates * {\n  line-height: 1.5; }\n\n.cost-and-dates md-icon {\n  font-size: 1.3em;\n  vertical-align: bottom; }\n\n.cost input {\n  text-align: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\nh1 {\n  font-size: 3em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\nh1 {\n  font-size: 3em; }\n\nh2 {\n  font-size: 2em;\n  margin-top: .83em;\n  padding-top: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 893:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "h1 {\n  font-size: 3em; }\n\nh2 {\n  font-size: 2em;\n  padding-top: 0; }\n\nh3 {\n  font-size: 1.4em;\n  padding-top: 0; }\n\n.project-toolbar {\n  margin-top: 2em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 894:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n */\n/** The mixins below are shared between md-menu and md-select */\n/**\n * This mixin adds the correct panel transform styles based\n * on the direction that the menu panel opens.\n */\n/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n */\n/**\n * This mixin contains shared option styles between the select and\n * autocomplete components.\n */\n:host .inline-icon {\n  float: right; }\n\n:host md-dialog-actions {\n  margin-top: 1em; }\n\n:host .styled {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  margin-bottom: 2em; }\n\n.send-btn {\n  font-size: 1em;\n  padding: 1em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 896:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  padding: 2em 0 0 0; }\n\nh1 {\n  font-size: 3em; }\n\nh2 {\n  font-size: 2em;\n  margin-top: .83em;\n  padding-top: 0; }\n\nmd-card-content > md-card-actions:first-child {\n  margin-left: -1px;\n  margin-right: -1px;\n  margin-top: 12px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 897:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  padding: 1em; }\n\n.files-card {\n  margin-top: 2em; }\n\n.files-card-content {\n  margin-bottom: 0; }\n\n.file-list {\n  margin-bottom: 1em; }\n  .file-list a {\n    text-decoration: none; }\n  .file-list a:hover {\n    text-decoration: underline; }\n  .file-list .file-icon {\n    margin-right: .25em; }\n\n.gdrive-invitation {\n  padding: 3em 2em 1em;\n  text-align: center; }\n\n.signout-link {\n  float: right;\n  font-size: .85em;\n  text-align: right; }\n  .signout-link a {\n    text-decoration: none; }\n  .signout-link a:hover {\n    text-decoration: underline; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 898:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  padding: 1em; }\n\n.files-card {\n  margin-top: 2em; }\n\n.files-card-content {\n  margin-bottom: 0; }\n\n.file-list a {\n  text-decoration: none; }\n\n.file-list a:hover {\n  text-decoration: underline; }\n\n.file-list .file-icon {\n  margin-right: .25em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 899:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "img {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 900:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  border-color: #e1e1e1;\n  border-style: solid;\n  border-width: 0 0 1px;\n  box-sizing: border-box;\n  display: block;\n  padding: 0 16px; }\n\nnav {\n  line-height: 48px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 901:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".share-card {\n  border: 7px dashed #eee;\n  display: none;\n  left: 1em;\n  margin-top: -1em;\n  padding-top: 1em;\n  position: absolute;\n  right: 1em;\n  z-index: 100; }\n\n.display-block {\n  display: block; }\n\n.show-sharer-button {\n  position: absolute;\n  right: 2em;\n  z-index: 120; }\n\n.email-input.invalid {\n  color: #f44336; }\n\n.validation-error {\n  color: #f44336;\n  margin-top: -1em;\n  padding-bottom: 1em;\n  position: relative; }\n\nh1 {\n  margin: 0; }\n\nh2 {\n  margin: .5em 0 .25em; }\n\nh3 {\n  border-bottom: dotted 1px #eee;\n  border-top: dotted 9px #eee;\n  margin-bottom: 2em;\n  padding: 1em 0; }\n\n.email-subject {\n  color: #sgray; }\n\n.bt-input {\n  margin-top: 1em; }\n\n.wide {\n  width: 100%; }\n\n.mailtext {\n  width: 100%; }\n\n.email-preview {\n  margin-top: 2em; }\n\n.bp-pre-html {\n  background-color: #000;\n  box-sizing: border-box;\n  color: #0f0;\n  font-family: 'Andale Mono', monospace;\n  font-size: 11px;\n  line-height: 160%;\n  margin: 2em 0 1em;\n  padding: 1em;\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 902:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "md-toolbar-row {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n\na {\n  color: #ffffff;\n  cursor: pointer;\n  text-decoration: none; }\n\na,\nspan,\np,\ndiv {\n  font-size: 1.2rem; }\n\n.toolbar-inline-icon {\n  vertical-align: bottom; }\n\n.username {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  text-align: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".bp-video-iframed {\n  height: 432px;\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "input,\ntextarea,\nmd-input-container {\n  width: 100%; }\n\n.cost-and-dates * {\n  line-height: 1.5; }\n\n.cost-and-dates md-icon {\n  font-size: 1.3em;\n  vertical-align: bottom; }\n\n.cost input {\n  text-align: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\nh1 {\n  font-size: 3em; }\n\nh2 {\n  font-size: 2em;\n  margin-top: .83em;\n  padding-top: 0; }\n\nmd-card-content > md-card-actions:first-child {\n  margin-left: -1px;\n  margin-right: -1px;\n  margin-top: 12px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\na:link,\na:visited {\n  color: #000;\n  text-decoration: none; }\n\nh1 {\n  font-size: 3em; }\n\nh2 {\n  font-size: 2em;\n  padding-top: 0; }\n\nh3 {\n  font-size: 1.2em;\n  letter-spacing: normal;\n  padding-top: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 908:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "/*\n* Skeleton V2.0.4\n* Copyright 2014, Dave Gamache\n* www.getskeleton.com\n* Free to use under the MIT license.\n* http://www.opensource.org/licenses/mit-license.php\n* 12/29/2014\n*/\n\n\n/* Table of contents\n––––––––––––––––––––––––––––––––––––––––––––––––––\n- Grid\n- Base Styles\n- Typography\n- Links\n- Buttons\n- Forms\n- Lists\n- Code\n- Tables\n- Spacing\n- Utilities\n- Clearing\n- Media Queries\n*/\n\n\n/* Grid\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.container {\n  position: relative;\n  width: 100%;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 0 20px;\n  box-sizing: border-box; }\n.column,\n.columns {\n  width: 100%;\n  float: left;\n  box-sizing: border-box; }\n\n/* For devices larger than 400px */\n@media (min-width: 400px) {\n  .container {\n    width: 85%;\n    padding: 0; }\n}\n\n/* For devices larger than 550px */\n@media (min-width: 550px) {\n  .container {\n    width: 80%; }\n  .column,\n  .columns {\n    margin-left: 4%; }\n  .column:first-child,\n  .columns:first-child {\n    margin-left: 0; }\n\n  .one.column,\n  .one.columns                    { width: 4.66666666667%; }\n  .two.columns                    { width: 13.3333333333%; }\n  .three.columns                  { width: 22%;            }\n  .four.columns                   { width: 30.6666666667%; }\n  .five.columns                   { width: 39.3333333333%; }\n  .six.columns                    { width: 48%;            }\n  .seven.columns                  { width: 56.6666666667%; }\n  .eight.columns                  { width: 65.3333333333%; }\n  .nine.columns                   { width: 74.0%;          }\n  .ten.columns                    { width: 82.6666666667%; }\n  .eleven.columns                 { width: 91.3333333333%; }\n  .twelve.columns                 { width: 100%; margin-left: 0; }\n\n  .one-third.column               { width: 30.6666666667%; }\n  .two-thirds.column              { width: 65.3333333333%; }\n\n  .one-half.column                { width: 48%; }\n\n  /* Offsets */\n  .offset-by-one.column,\n  .offset-by-one.columns          { margin-left: 8.66666666667%; }\n  .offset-by-two.column,\n  .offset-by-two.columns          { margin-left: 17.3333333333%; }\n  .offset-by-three.column,\n  .offset-by-three.columns        { margin-left: 26%;            }\n  .offset-by-four.column,\n  .offset-by-four.columns         { margin-left: 34.6666666667%; }\n  .offset-by-five.column,\n  .offset-by-five.columns         { margin-left: 43.3333333333%; }\n  .offset-by-six.column,\n  .offset-by-six.columns          { margin-left: 52%;            }\n  .offset-by-seven.column,\n  .offset-by-seven.columns        { margin-left: 60.6666666667%; }\n  .offset-by-eight.column,\n  .offset-by-eight.columns        { margin-left: 69.3333333333%; }\n  .offset-by-nine.column,\n  .offset-by-nine.columns         { margin-left: 78.0%;          }\n  .offset-by-ten.column,\n  .offset-by-ten.columns          { margin-left: 86.6666666667%; }\n  .offset-by-eleven.column,\n  .offset-by-eleven.columns       { margin-left: 95.3333333333%; }\n\n  .offset-by-one-third.column,\n  .offset-by-one-third.columns    { margin-left: 34.6666666667%; }\n  .offset-by-two-thirds.column,\n  .offset-by-two-thirds.columns   { margin-left: 69.3333333333%; }\n\n  .offset-by-one-half.column,\n  .offset-by-one-half.columns     { margin-left: 52%; }\n\n}\n\n\n/* Base Styles\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n/* NOTE\nhtml is set to 62.5% so that all the REM measurements throughout Skeleton\nare based on 10px sizing. So basically 1.5rem = 15px :) */\nhtml {\n  font-size: 62.5%; }\nbody {\n  font-size: 1.5em; /* currently ems cause chrome bug misinterpreting rems on body element */\n  line-height: 1.6;\n  font-weight: 400;\n  font-family: \"Raleway\", \"HelveticaNeue\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  color: #222; }\n\n\n/* Typography\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: 300; }\nh1 { font-size: 4.0rem; line-height: 1.2;  letter-spacing: -.1rem;}\nh2 { font-size: 3.6rem; line-height: 1.25; letter-spacing: -.1rem; }\nh3 { font-size: 3.0rem; line-height: 1.3;  letter-spacing: -.1rem; }\nh4 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -.08rem; }\nh5 { font-size: 1.8rem; line-height: 1.5;  letter-spacing: -.05rem; }\nh6 { font-size: 1.5rem; line-height: 1.6;  letter-spacing: 0; }\n\n/* Larger than phablet */\n@media (min-width: 550px) {\n  h1 { font-size: 5.0rem; }\n  h2 { font-size: 4.2rem; }\n  h3 { font-size: 3.6rem; }\n  h4 { font-size: 3.0rem; }\n  h5 { font-size: 2.4rem; }\n  h6 { font-size: 1.5rem; }\n}\n\np {\n  margin-top: 0; }\n\n\n/* Links\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\na {\n  color: #1EAEDB; }\na:hover {\n  color: #0FA0CE; }\n\n\n/* Buttons\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.button,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  display: inline-block;\n  /*height: 38px;*/\n  /*padding: 0 30px;*/\n  /*color: #555;*/\n  /*text-align: center;*/\n  /*font-size: 11px;*/\n  /*font-weight: 600;*/\n  /*line-height: 38px;*/\n  /*letter-spacing: .1rem;*/\n  /*text-transform: uppercase;*/\n  text-decoration: none;\n  white-space: nowrap;\n  /*background-color: transparent;\n  border-radius: 4px;\n  border: 1px solid #bbb;*/\n  cursor: pointer;\n  box-sizing: border-box; }\n.button:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.button:focus,\nbutton:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  color: #333;\n  border-color: #888;\n  outline: 0; }\n.button.button-primary,\nbutton.button-primary,\ninput[type=\"submit\"].button-primary,\ninput[type=\"reset\"].button-primary,\ninput[type=\"button\"].button-primary {\n  color: #FFF;\n  background-color: #33C3F0;\n  border-color: #33C3F0; }\n.button.button-primary:hover,\nbutton.button-primary:hover,\ninput[type=\"submit\"].button-primary:hover,\ninput[type=\"reset\"].button-primary:hover,\ninput[type=\"button\"].button-primary:hover,\n.button.button-primary:focus,\nbutton.button-primary:focus,\ninput[type=\"submit\"].button-primary:focus,\ninput[type=\"reset\"].button-primary:focus,\ninput[type=\"button\"].button-primary:focus {\n  color: #FFF;\n  background-color: #1EAEDB;\n  border-color: #1EAEDB; }\n\n\n/* Forms\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ntextarea,\nselect {\n  height: 38px;\n  padding: 6px 10px; /* The 6px vertically centers text on FF, ignored by Webkit */\n  background-color: #fff;\n  border: 1px solid #D1D1D1;\n  border-radius: 4px;\n  box-shadow: none;\n  box-sizing: border-box; }\n/* Removes awkward default styles on some inputs for iOS */\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ntextarea {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\ntextarea {\n  min-height: 65px;\n  padding-top: 6px;\n  padding-bottom: 6px; }\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ntextarea:focus,\nselect:focus {\n  border: 1px solid #33C3F0;\n  outline: 0; }\nlabel,\nlegend {\n  display: block;\n  margin-bottom: .5rem;\n  font-weight: 600; }\nfieldset {\n  padding: 0;\n  border-width: 0; }\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\nlabel > .label-body {\n  display: inline-block;\n  margin-left: .5rem;\n  font-weight: normal; }\n\n\n/* Lists\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nul {\n  list-style: circle inside; }\nol {\n  list-style: decimal inside; }\nol, ul {\n  padding-left: 0;\n  margin-top: 0; }\nul ul,\nul ol,\nol ol,\nol ul {\n  margin: 1.5rem 0 1.5rem 3rem;\n  font-size: 90%; }\nli {\n  margin-bottom: 1rem; }\n\n\n/* Code\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\ncode {\n  padding: .2rem .5rem;\n  margin: 0 .2rem;\n  font-size: 90%;\n  white-space: nowrap;\n  background: #F1F1F1;\n  border: 1px solid #E1E1E1;\n  border-radius: 4px; }\npre > code {\n  display: block;\n  padding: 1rem 1.5rem;\n  white-space: pre; }\n\n\n/* Tables\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nth,\ntd {\n  padding: 12px 15px;\n  text-align: left;\n  border-bottom: 1px solid #E1E1E1; }\nth:first-child,\ntd:first-child {\n  padding-left: 0; }\nth:last-child,\ntd:last-child {\n  padding-right: 0; }\n\n\n/* Spacing\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nbutton,\n.button {\n  margin-bottom: 1rem; }\ninput,\ntextarea,\nselect,\nfieldset {\n  margin-bottom: 1.5rem; }\npre,\nblockquote,\ndl,\nfigure,\ntable,\np,\nul,\nol,\nform {\n  margin-bottom: 2.5rem; }\n\n\n/* Utilities\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.u-full-width {\n  width: 100%;\n  box-sizing: border-box; }\n.u-max-full-width {\n  max-width: 100%;\n  box-sizing: border-box; }\n.u-pull-right {\n  float: right; }\n.u-pull-left {\n  float: left; }\n\n\n/* Misc\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nhr {\n  margin-top: 3rem;\n  margin-bottom: 3.5rem;\n  border-width: 0;\n  border-top: 1px solid #E1E1E1; }\n\n\n/* Clearing\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n\n/* Self Clearing Goodness */\n.container:after,\n.row:after,\n.u-cf {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n\n/* Media Queries\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n/*\nNote: The best way to structure the use of media queries is to create the queries\nnear the relevant code. For example, if you wanted to change the styles for buttons\non small devices, paste the mobile query code up in the buttons section and style it\nthere.\n*/\n\n\n/* Larger than mobile */\n@media (min-width: 400px) {}\n\n/* Larger than phablet (also point when grid becomes active) */\n@media (min-width: 550px) {}\n\n/* Larger than tablet */\n@media (min-width: 750px) {}\n\n/* Larger than desktop */\n@media (min-width: 1000px) {}\n\n/* Larger than Desktop HD */\n@media (min-width: 1200px) {}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 909:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".size-fab-upload {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 938:
/***/ (function(module, exports) {

module.exports = {
	"app-version": "1.1.30"
};

/***/ }),

/***/ 951:
/***/ (function(module, exports) {

module.exports = "<h1>Про проект</h1>\n\n<p>BigPolicy є платформою політичного спонсорства, що складається з сайту та\n  додатків для збору коштів у мережі інтернет, плюс офлайн-носії.\n  Наші принципи: прозорість, відкритість, інституційність, опора на здоровий глузд.</p>\n\n<p><a href=\"http://www.slideshare.net/prokopenkoserhii?utm_campaign=profiletracking&utm_medium=sssite&utm_source=ssslideview\">Презентація</a>:</p>\n<iframe src=\"http://www.slideshare.net/prokopenkoserhii/slideshelf\" width=\"760px\" height=\"570px\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"border:none;\" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>\n\n<h2>Команда</h2>\n<ul>\n  <li><a href=\"https://www.facebook.com/rastislavr\">Ростислав Сірик</a> - UX, Angular, Material 2</li>\n  <li><a href=\"https://www.facebook.com/Oleksiy.Shnira\">Олексій Шніра</a> - бек-енд</li>\n  <li><a href=\"https://www.facebook.com/prokopenkoserhii\">Сергій Прокопенко</a> - Бізнес аналітик</li>\n  <li><a href=\"https://www.facebook.com/vlodko\">Володимир Закалюжний</a> - Візія продукту</li>\n</ul>\n\n<h2>Глосарій термінів</h2>\n<ul>\n  <li>Діяч: політик чи активіст, що потребує підтримки від Донора.</li>\n  <li>Донор: мешканець чи виборець, що може підтримати Діяча.</li>\n  <li>Проект (захід): запропонований лідером спосіб вирішення конкретної проблеми.</li>\n</ul>\n\n<h2>BigPolicy</h2>\n<p>Україна, м.&nbsp;Львів <br>\nвул.&nbsp;Наукова&nbsp;58, кв.&nbsp;28 <br>\n+380936191795</p>\n<p>\n  <img src=\"assets/img/logo.png\" width=\"256\" />\n</p>\n<p>У розробці з {{dateInit | date}} по {{dateNow | date}}</p>\n<p>\n  <a href=\"https://www.revolvermaps.com/?target=enlarge&amp;i=0ukt1i6a2i9\"><img src=\"//ra.revolvermaps.com/h/m/a/0/ff0000/128/0/0ukt1i6a2i9.png\" width=\"256\" height=\"128\" alt=\"Map\" style=\"border:0;\"></a>\n</p>\n<p><iframe src=\"https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBIGPOLICY%2F&width=450&layout=standard&action=like&show_faces=true&share=true&height=80&appId\" width=\"256\" height=\"200\" style=\"border:none;overflow:hidden; margin-left: 1em;\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>\n</p>\n<p>⨒ <a href=\"https://github.com/rostag/bigpolicy_eu/wiki\">BigPolicy Wiki</a></p>\n"

/***/ }),

/***/ 952:
/***/ (function(module, exports) {

module.exports = "<div [class.bp-dark-theme]=\"toolbar.isDarkTheme\">\n\n  <app-bp-toolbar #toolbar>\n  </app-bp-toolbar>\n\n  <app-bp-navbar>\n  </app-bp-navbar>\n\n  <div class=\"app-content\">\n    <router-outlet></router-outlet>\n  </div>\n\n  <footer>Creative Commons and BigPolicy 2015-2017 v.{{version}}\n    <br/>\n    <p>\n      <a [routerLink]=\"['/about']\">\n        <img width=\"80\" class=\"logo\" src=\"assets/img/logo.png\" />\n      </a>\n    </p>\n    <p>\n      <a [routerLink]=\"['/about']\">Про проект</a>\n    </p>\n  </footer>\n\n</div>\n"

/***/ }),

/***/ 953:
/***/ (function(module, exports) {

module.exports = "\n<!-- TODO FTUX - Section for leaders without a project -->\n<!-- TODO FTUX - Section for projects without tasks -->\n\n<!-- TODO FTUX - AUTH - This section is visible to anonymous only -->\n<!-- <div *ngIf=\"!userService.authenticated()\"> -->\n\n<!-- FTUX - LEADER - Section is visible to non-leaders only -->\n<p *ngIf=\"!userService.hasLeader()\">\n  Lazy registration test: <a [routerLink]=\"['/add-leader']\">Зголошуйся в активні діячі</a>\n</p>\n<!-- /FTUX - LEADER END -->\n\n<!-- </div> --> <!-- TODO FTUX - AUTH END -->\n\n<!--\n    MOBILE\n      TBD: Два горизонтальні квадрати,\n      TBD: Меню — 4 полосочки-квадратика під лого, Потій йдут 2 блоки — проекти та лідери\n        -->\n\n<!--\n    ALL PROJECTS\n      TBD: Слайдшоу — 10 випадкових елементів, АБО: три найпростіших + три найсильншіх + 4 рандомом\n      TBD: on Hover, Button Rendedered in MD Style\n        -->\n\n<!--\n    ALL LEADERS\n      TBD: Слайдшоу — 10 випадкових елементів, АБО: три найпростіших + три найсильншіх + 4 рандомом\n      TBD: on Hover, Button Rendedered in MD Style\n        -->\n\n<div fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" fxLayoutGap=\"5%\" fxLayout.sm=\"column\" fxLayout.xs=\"column\" >\n  <div fxFlex=\"50%\">\n    <h3>Випадковий проект:</h3>\n    <app-project-brief projectId=\"random\"></app-project-brief>\n  </div>\n  <div fxFlex=\"50%\">\n    <h3>Випадковий діяч:</h3>\n    <app-leader-brief leaderId=\"random\"></app-leader-brief>\n  </div>\n</div>\n\n<!-- here, mongoDb query can be used like this:\nhttp://stackoverflow.com/questions/7811163/query-for-documents-where-array-size-is-greater-than-1\n{ \"$where\": \"this.projects.length > 2\" }\n{ \"totalDonationsReceived\": 0 }\n{ \"projects\": { $size: 2 } }\n\netc\n\n -->\n\n <!-- <app-leader-list [pageSize]=\"1\" dbQuery=\"{}\"></app-leader-list> -->\n\n<br /><br />\n\n<h2>Як це працює?</h2>\n\n<!-- // TBD: Use stories from #89 Step 1 > Step 2 > Step 3 > -->\n\n<br />\n\n<div>\n\n\n  <img src=\"https://cloud.githubusercontent.com/assets/451410/24063696/a6130996-0b58-11e7-919f-e355446ce143.png\" style=\"width:100%\" />\n\n  <br /><br /><br />\n\n</div>\n\n<!--\n  Показуємо 6 активних проектів на 1 табі\n  і також рандомно — 6 лідерів на другій табі\n                                            -->\n\n<md-tab-group>\n  <md-tab label=\"Проекти\">\n    <app-project-list [pageSize]=\"5\"></app-project-list>\n    <button md-button md-raised-button color=\"primary\">Всі проекти</button>\n  </md-tab>\n  <md-tab label=\"Політики\">\n    <app-leader-list [pageSize]=\"5\"></app-leader-list>\n    <button md-raised-button color=\"primary\">Всі лідери</button>\n  </md-tab>\n</md-tab-group>\n\n<br /> <br /> <br /> <br />\n<p>\n    BigPolicy — платформа прямої демократії.\n    Твої політики для тебе і від тебе.\n</p>\n\n<!-- <h2>Останні проекти</h2> -->\n<!-- Останні проекти та політики — це зменшені мініатюри без -->\n\n<!-- <h2>Нові політики</h2> -->\n<!-- Не дуже гарно виходить — нові у самому низу, треба подумати -->\n\n<!-- <div>\n  //TBC:\n  Не дуже гарно виходить — нові у самому низу, треба подумати\n</div> -->\n\n\n<div fxLayout=\"row\" fxLayoutAlign=\"space-between top\" fxLayoutGap=\"5%\" fxLayout.sm=\"column\" fxLayout.xs=\"column\">\n  <div fxFlex=\"50%\">\n    <h3>Контакти</h3>\n    <address>\n      м.&nbsp;Львів, вул.&nbsp;Наукова&nbsp;58, кв.&nbsp;28\n      <br>\n      +380 (93) 619-17-95\n      <br>\n      <a href=\"mailto:voice@bigpolicy.eu\">voice@bigpolicy.eu</a>\n    </address>\n  </div>\n  <div fxFlex=\"50%\">\n    <h3>Facebook</h3>\n    <iframe src=\"https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBIGPOLICY%2F&width=450&layout=standard&action=like&show_faces=true&share=true&height=80&appId\" width=\"300\" height=\"200\" style=\"border:none;overflow:hidden;\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>\n  </div>\n</div>\n"

/***/ }),

/***/ 954:
/***/ (function(module, exports) {

module.exports = "<div class=\"bp-landing numbers\">\n  <md-card class=\"md-card-flat\">\n    <md-grid-list cols=\"4\" rowHeight=\"55\" id=\"stats\">\n      <md-grid-tile> <h2><a [routerLink]=\"['/leaders']\"><span>{{app.leaders.length}}</span> діячів</a></h2> </md-grid-tile>\n      <md-grid-tile> <h2><a [routerLink]=\"['/projects']\"><span>{{app.projects.length}}</span> проектів</a></h2> </md-grid-tile>\n      <md-grid-tile> <h2><span>{{app.donors}}</span> донорів</h2> </md-grid-tile>\n      <md-grid-tile> <h2><span>{{app.totalDonationsReceived}}</span>&#8372;</h2> </md-grid-tile>\n    </md-grid-list>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"one-half column\">\n\n          <!-- TODO FTUX - Section for leaders without a project -->\n          <!-- TODO FTUX - Section for projects without tasks -->\n\n          <!-- TODO FTUX - AUTH - This section is visible to anonymous only -->\n          <!-- <div *ngIf=\"!userService.authenticated()\"> -->\n\n            <h4>BIGPOLICY - це краудфандингова платформа прямої демократії для політиків і громадських активістів.</h4>\n            <h5>Винайдемо нову політику разом!</h5>\n\n            <!-- FTUX - LEADER - Section is visible to non-leaders only -->\n            <div *ngIf=\"!userService.hasLeader()\">\n              <p><a [routerLink]=\"['/add-leader']\">Зголошуйся в активні діячі</a> або підтримуй активних громадян та їх проекти.</p>\n              <!--<p><small>Мало часу? <a href=\"https://www.facebook.com/groups/BIGPOLICY/permalink/1771667176453897/\">Ми стисло виклали суть справи, наші задачі і методи</a>.<br />І твоя думка цікава нам.</small></p>-->\n\n              <h5>BigPolicy вже має команду діячів, з першим проектом створення платформи!</h5>\n\n              <p>Ми не отримуємо фінансової допомоги від жодної з політичних партій і\n              в наші плани не входить отримання коштів від них чих від політиків.\n              Ми незалежні від політичних сил і такими зостанемося.</p>\n\n              <h5>В нас є можливість розвинути цю ідею. Спробуй пряму демократію, підтримавши нашу громадянську волю.</h5>\n              <a href=\"https://www.liqpay.com/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTc3MDYxMzUxNDgyIiwiYW1vdW50IjoiMTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0K8g0LLRltGA0Y4g0LIg0YLQtdCx0LUhIiwidHlwZSI6ImRvbmF0ZSIsImxhbmd1YWdlIjoiZW4ifQ%3D%3D&signature=%2FA19v2A2ebDHGW71VxD5JDhaG70%3D\">\n                <button md-button color=\"primary\" md-raised-button>Підтримай нас фінансово</button>\n              </a>\n            </div>\n            <!-- FTUX - LEADER END -->\n\n            <h5>Ми на зв'язку:</h5>\n\n            <p>Пиши нам на <a href=\"mailto:voice@bigpolicy.eu\">електронну пошту</a>. Долучайся до групи <a href=\"https://www.facebook.com/groups/BigPolicy\">BigPolicy</a> у FB.</p>\n\n            <h5>Підпишися на новини:</h5>\n            <!-- Begin MailChimp Signup Form -->\n            <link href=\"//cdn-images.mailchimp.com/embedcode/slim-10_7.css\" rel=\"stylesheet\" type=\"text/css\">\n            <style type=\"text/css\">\n              #mc_embed_signup{margin-top: 0;}\n              /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.\n                 We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n              #mc_embed_signup form {\n                padding-left: 0;\n                padding-top: 0;\n                margin-top: 0;\n              }\n            </style>\n\n            <div id=\"mc_embed_signup\">\n              <form action=\"//us11.list-manage.com/subscribe/post?u=deeb36270b9b694bba754d0c1&amp;id=f35a7fdff8\" method=\"post\" id=\"mc-embedded-subscribe-form\" name=\"mc-embedded-subscribe-form\" class=\"validate\" target=\"_blank\" novalidate>\n                <div id=\"mc_embed_signup_scroll\">\n                  <input required type=\"email\" value=\"\" name=\"EMAIL\" class=\"email\" id=\"mce-EMAIL\" placeholder=\"Твій email\">\n                  <input type=\"submit\" value=\"Підписатися\" name=\"subscribe\" id=\"mc-embedded-subscribe\" class=\"button\">\n                  <!-- <button id=\"mc-embedded-subscribe\" >Підписатися</button> -->\n                  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n                  <div style=\"position: absolute; left: -5000px;\" aria-hidden=\"true\">\n                    <input type=\"text\" name=\"b_deeb36270b9b694bba754d0c1_f35a7fdff8\" tabindex=\"-1\" value=\"\">\n                  </div>\n                </div>\n              </form>\n            </div>\n          <!-- </div> --> <!-- TODO FTUX - AUTH END -->\n\n        </div>\n\n        <div class=\"one-half column\" id=\"top-projects\">\n\n          <h4>Популярні проекти:</h4>\n\n             <div *ngFor=\"let project of app.projects\">\n               <md-card>\n                 <md-card-header>\n                   <img md-card-avatar src=\"assets/img/avatar-generic.png\" alt=\"{{project.title}}\">\n                   <md-card-title>{{project.title}}</md-card-title>\n                   <md-card-subtitle>{{project.managerName}}, Дніпро</md-card-subtitle>\n                 </md-card-header>\n                 <md-card-content>\n                     {{project.description}}\n                     <br/>\n                     <br/>\n                     <small>Строки: {{project.dateStarted | date:'yMMMMd'}} - {{project.dateEnded | date:'yMMMMd'}}, вартість: {{project.cost}} UAH</small>\n                 </md-card-content>\n                 <md-card-actions>\n                   <a [routerLink]=\"['/project/' + project._id]\"><button md-button color=\"primary\">Підтримати</button></a>\n                 </md-card-actions>\n               </md-card>\n            </div>\n\n          <a [routerLink]=\"['/projects']\"><button md-button color=\"primary\">Дивитися усі проекти</button></a>\n\n          <!-- FIXME: temporarily disabled: FB Page -->\n          <!--\n          <div style=\"width: 190px;text-align: center;margin-top: 30px;\" id=\"fb_page_div\">\n            <div class=\"fb-page\" data-href=\"https://www.facebook.com/bigpolicy\" data-tabs=\"timeline\" data-width=\"500\" data-small-header=\"false\" data-adapt-container-width=\"true\" data-hide-cover=\"false\" data-show-facepile=\"true\">\n              <div class=\"fb-xfbml-parse-ignore\">\n                <blockquote cite=\"https://www.facebook.com/bigpolicy\">\n\n                </blockquote>\n              </div>\n            </div>\n          </div> -->\n        </div>\n     </div>\n   </div>\n\n   <!-- TO MIGRATE -->\n   <div class=\"container\">\n     <div class=\"row\">\n       <div class=\"one-half column\">\n\n         <iframe src=\"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FBIGPOLICY%2Fvideos%2F161167597610702%2F&show_text=0&width=560\" width=\"100%\" height=\"300\" style=\"border:none;overflow:hidden;max-width: 560px;\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" id=\"fb_video_post\">\n         </iframe>\n\n         <h4>Форкни демократію</h4>\n         <p>\n           Долучайся до розробки відкритої платформи <a href=\"https://github.com/rostag/bigpolicy_eu\">BigPolicy на GitHub</a>.\n         </p>\n\n          <p>\n            Ми описали, як почати роботу. Якщо будуть питання - звертайся до <a href=\"https://www.facebook.com/rastislavr\">техліда</a>.\n          </p>\n\n          <p>\n            <a href=\"https://www.facebook.com/groups/bigpolicy\">Група BigPolicy на Facebook</a>\n          </p>\n        </div>\n        <div class=\"one-half column\">\n          <p><b>Контакти:</b><br>\n            м.&nbsp;Львів, вул.&nbsp;Наукова&nbsp;58, кв.&nbsp;28 <br>\n            +380936191795</p>\n            <img class=\"logo\" src=\"assets/img/logo.png\" />\n            <iframe src=\"https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBIGPOLICY%2F&width=450&layout=standard&action=like&show_faces=true&share=true&height=80&appId\" width=\"300\" height=\"200\" style=\"border:none;overflow:hidden; margin-left: 1em;\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>\n        </div>\n      </div>\n    </div>\n  </md-card>\n\n</div>\n"

/***/ }),

/***/ 955:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"leader-brief-card\">\n  <md-card-header>\n    <div md-card-avatar class=\"leader-brief-card-header-image\"></div>\n    <md-card-title>{{leader.name}} {{leader.surName}}</md-card-title>\n    <md-card-subtitle>{{leader.email}}</md-card-subtitle>\n  </md-card-header>\n  <img md-card-image src=\"{{leader.photo || 'assets/img/avatar.jpg'}}\">\n  <md-card-content>\n    <p>\n      {{leader.mission}}\n    </p>\n  </md-card-content>\n  <md-card-actions>\n    <a [routerLink]=\"['/leader/', leader._id]\"><button md-button>ПІДТРИМАТИ</button></a>\n    <a [routerLink]=\"['/leaders']\"><button md-button>УСІ ДІЯЧІ</button></a>\n  </md-card-actions>\n</md-card>\n"

/***/ }),

/***/ 956:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"leader-edit-card\">\n  <form novalidate (ngSubmit)=\"onSubmit()\" [formGroup]=\"leaderFormGroup\">\n  <md-card-content>\n    <md-card-title>\n      <span *ngIf=\"!isUpdateMode\">Стати діячем</span>\n      <span *ngIf=\"isUpdateMode\">Редагувати діяча</span>\n    </md-card-title>\n\n      <div fxLayout=\"row\" fxLayoutGap=\"4%\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\">\n        <div fxFlex=\"36%\" fxFlex.xs=\"100%\">\n          <!-- FIXME - process tmp_user_reg_id in FTUX process -->\n          <app-image [src]=\"leaderModel.photo || 'assets/img/avatar-generic.png'\"></app-image>\n          <app-uploader folder=\"bp-files/users/{{leaderModel._id || 'tmp_user_reg_id'}}/avatars\" listFiles=\"no\"\n            buttonType=\"regular\" buttonLabel=\"Завантажити фото\" (uploadedFileUrlChange)=\"leaderModel.onPhotoUrlChange($event)\">\n          </app-uploader>\n        </div>\n\n        <div fxFlex.xs=\"100%\">\n          <md-input-container>\n            <input mdInput name=\"name\" formControlName=\"name\" placeholder=\"Ім'я\" maxLength=\"51\" >\n          </md-input-container>\n          <div *ngIf=\"leaderFormGroup.get('name').hasError('required') && leaderFormGroup.get('name').touched\" class=\"validation-error\">\n            Треба вказати ім'я\n          </div>\n          <div *ngIf=\"leaderFormGroup.get('name').hasError('minlength') && leaderFormGroup.get('name').touched\" class=\"validation-error\">\n            Ім'я мусить бути не коротше двох символів\n          </div>\n          <div *ngIf=\"leaderFormGroup.get('name').hasError('maxlength') && leaderFormGroup.get('name').touched\" class=\"validation-error\">\n            Ім'я мусить бути не довшим за 50 символів\n          </div>\n\n          <md-input-container>\n            <input mdInput name=\"surName\" formControlName=\"surName\" placeholder=\"Прізвище\" maxLength=\"51\" >\n          </md-input-container>\n          <div *ngIf=\"leaderFormGroup.get('surName').hasError('required') && leaderFormGroup.get('surName').touched\" class=\"validation-error\">\n            Треба вказати прізвище\n          </div>\n          <div *ngIf=\"leaderFormGroup.get('surName').hasError('minlength') && leaderFormGroup.get('surName').touched\" class=\"validation-error\">\n            Прізвище мусить бути не коротше двох символів\n          </div>\n          <div *ngIf=\"leaderFormGroup.get('surName').hasError('maxlength') && leaderFormGroup.get('surName').touched\" class=\"validation-error\">\n            Прізвище мусить бути не довшим за 50 символів\n          </div>\n\n\n          <!-- TODO: Use existing video control to auto-extend functionality on input -->\n          <md-input-container >\n            <input mdInput name=\"videoUrl\" formControlName=\"videoUrl\" placeholder=\"Посилання на відео YouTube\" maxLength=\"250\" >\n          </md-input-container>\n          <div *ngIf=\"leaderFormGroup.get('videoUrl').hasError('forbiddenName') && leaderFormGroup.get('videoUrl').touched\" class=\"validation-error\">\n            Будь ласка, уведи правильне посилання на відео YouTube\n          </div>\n\n        </div>\n      </div>\n\n      <div class=\"problem-statement\">\n\n      <h3>Як виглядає проблема для тебе?</h3>\n\n      <md-input-container>\n        <textarea mdInput mdTextareaAutosize maxLength=\"1000\" name=\"vision\" formControlName=\"vision\" placeholder=\"Твоя особиста візія і думки\" characterCounter></textarea>\n      </md-input-container>\n      <div *ngIf=\"leaderFormGroup.get('vision').hasError('required') && leaderFormGroup.get('vision').touched\" class=\"validation-error\" >\n        Це поле не може бути пустим.\n      </div>\n      <div *ngIf=\"leaderFormGroup.get('vision').hasError('minlength') && leaderFormGroup.get('vision').touched\" class=\"validation-error\" >\n        Будь ласка, опиши своє бачення детальніше.\n      </div>\n      <!-- FIXME Paramaterize 1000 limit  -->\n      <div *ngIf=\"leaderFormGroup.get('vision').hasError('maxlength') && leaderFormGroup.get('vision').touched\" class=\"validation-error\" >\n        Цей текст завеликий. Будь ласка, не більше 999 символів.\n      </div>\n\n      <h3>Який аспект проблеми ти хочеш вирішити?</h3>\n\n      <md-input-container>\n        <textarea mdInput mdTextareaAutosize maxLength=\"1000\" name=\"mission\" formControlName=\"mission\" placeholder=\"Твоя місія\" characterCounter ></textarea>\n      </md-input-container>\n      <div *ngIf=\"leaderFormGroup.get('mission').hasError('required') && leaderFormGroup.get('mission').touched\" class=\"validation-error\" >\n        Це поле не може бути пустим.\n      </div>\n      <div *ngIf=\"leaderFormGroup.get('mission').hasError('minlength') && leaderFormGroup.get('mission').touched\" class=\"validation-error\" >\n        Будь ласка, опиши свою місію детальніше.\n      </div>\n      <div *ngIf=\"leaderFormGroup.get('mission').hasError('maxlength') && leaderFormGroup.get('mission').touched\" class=\"validation-error\" >\n        Цей текст завеликий. Будь ласка, не більше 999 символів.\n      </div>\n\n    </div>\n\n    <!-- User should only be able to edit his own files, thus matching his email in gdrive -->\n    <div *ngIf=\"isUpdateMode\">\n      <app-bp-files *ngIf=\"userService.isOwner(leaderModel)\" [userService]=\"userService\" (onFileListUpdate)=\"onFileListUpdate($event)\"></app-bp-files>\n      <app-files-view *ngIf=\"!userService.isOwner(leaderModel)\" [files]=\"leaderModel.leaderFiles\" ></app-files-view>\n    </div>\n\n    <md-toolbar class=\"add-toolbar\" color=\"#fff\">\n      <button md-raised-button color=\"primary\" type=\"submit\" type=\"submit\" [disabled]=\"leaderFormGroup.invalid\">Готово</button>\n      <button md-button (click)=\"cancelEditing()\" color=\"primary\">\n        Відмінити\n      </button>\n      <!-- <button md-raised-button disabled color=\"accent\">Як буде виглядати моя сторінка?</button> -->\n      <span class=\"add-fill-remaining\"></span>\n      <button md-button *ngIf=\"isUpdateMode\" color=\"warn\" (click)=\"deleteLeader(leaderModel)\">Видалити</button>\n    </md-toolbar>\n\n  </md-card-content>\n  </form>\n</md-card>\n\n<!--\n\n<md-toolbar class=\"add-toolbar\" color=\"primary\">Проекти\n  <span class=\"add-fill-remaining\"></span>\n  <span *ngIf=\"isUpdateMode\">\n    <button disabled='disabled' md-raised-button (click)=\"addProject()\" color=\"accent\">Додати проект</button>\n  </span>\n</md-toolbar>\n\n<md-card-content>\n  <h3>Як ти вирішиш цю проблему?</h3>\n\n  <md-input-container>\n    <input mdInput name=\"description\" characterCounter placeholder=\"Опиши свій проект: \" hintLabel=\"\">\n  </md-input-container>\n\n  <md-input-container>\n    <input mdInput name=\"amount\" placeholder=\"Сума, грн\" align=\"end\" mdPrefix=\"Який бюджет тобі на це потрібен? UAH&nbsp;\" mdSuffix=\"00\">\n  </md-input-container>\n</md-card-content>\n\n<md-toolbar class=\"add-toolbar\" color=\"primary\">Твоя програма\n  <span class=\"add-fill-remaining\"></span>\n  <span *ngIf=\"isUpdateMode\">\n    <button disabled='disabled' md-raised-button (click)=\"addProject()\" color=\"accent\">Додати ще одну ціль</button>\n  </span>\n</md-toolbar>\n\n<md-card-content>\n  <h3>Які цілі ти ставиш собі на 3 роки вперед?</h3> Головна ціль:\n  <md-input-container>\n    <input mdInput name=\"name\" [(ngModel)]=\"name\" type=\"text\" placeholder=\"Опиши коротко\">\n  </md-input-container>*\n\n  <p>\n    Другорядна ціль:\n    <md-input-container>\n      <input mdInput name=\"name\" [(ngModel)]=\"name\" type=\"text\" placeholder=\"Опиши коротко\">\n    </md-input-container>*\n  </p>\n</md-card-content>\n\n<md-toolbar class=\"add-toolbar\" color=\"white\">Додатково</md-toolbar>\n\n<md-card-content>\n  <md-card-title>\n    Належиш до партії?\n    <md-input-container>\n      <input mdInput name=\"party\" type=\"text\" placeholder=\"Вкажи партію\">\n    </md-input-container>\n  </md-card-title>\n\n  <md-card-title>\n    Офіційна посада:\n    <md-input-container>\n      <input mdInput name=\"title\" type=\"text\" placeholder=\"Вкажи свою посаду\">\n    </md-input-container>\n  </md-card-title>\n</md-card-content>\n\n<md-toolbar class=\"add-toolbar\" color=\"accent\">Твої профілі у соцмережах:\n  <span class=\"add-fill-remaining\"></span>\n  <button md-button><md-icon>add</md-icon>Додати</button>\n</md-toolbar>\n\n<md-card-content>\n  <md-card-title>\n    Профілі не вказано\n  </md-card-title>\n</md-card-content>\n\n<md-toolbar class=\"add-toolbar\" color=\"white\">\n  <h2>Завантаж необхідні документи:</h2>\n</md-toolbar>\n\n<md-card-content>\n  <ul>\n  <li><a><md-icon color=\"primary\">attach_file</md-icon>Програма дій</a></li>\n  <li><a><md-icon color=\"primary\">attach_file</md-icon>Передвиборча програма</a></li>\n  <li><a><md-icon color=\"primary\">attach_file</md-icon>Скан паспорту</a></li>\n  <li><a><md-icon color=\"primary\">attach_file</md-icon>Довідка про судимості</a></li>\n  <li><a><md-icon color=\"primary\">attach_file</md-icon>Антикорупційні документи</a></li>\n  <li><a><md-icon color=\"primary\">attach_file</md-icon>Публічна майнова декларація</a></li>\n</ul>\n</md-card-content>\n\n<ul style=\"list-style-type:none\">\n  <li>\n    <md-checkbox [checked]=\"false\" align=\"start\">\n      Я даю згоду на обробку моїх персональних данних.\n    </md-checkbox>\n  </li>\n  <li>\n    <md-checkbox [checked]=\"false\" align=\"start\">\n      Я погоджуюся з умовами роботи BigPolicy\n    </md-checkbox>\n  </li>\n</ul>\n<br>\n\n-->\n"

/***/ }),

/***/ 957:
/***/ (function(module, exports) {

module.exports = "<!-- Usage: <app-leader-list [groupId]=\"123\" [pageSize]=\"10\"></app-leader-list> -->\n<md-card>\n  <md-card-title>Лідери</md-card-title>\n  <md-card-content>\n\n    <!--\n    TODO\n    <p disabled>Показати у спискові:\n      <select disabled>\n        <option>члени партії...</option>\n        <option>РПР</option>\n        <option>ЩЗП</option>\n      </select>\n\n     <a href=\"#\" disabled>активісти</a> з регіону:\n      <select disabled>\n        <option>Усі регіони</option>\n        <option>Львів</option>\n        <option>Харків</option>\n      </select>\n    </p> -->\n\n    <div class=\"leaders-list\" fxLayout=\"column\" fxLayoutWrap=\"\" fxLayoutGap=\"3%\" fxLayout.gt-sm=\"row\" >\n     <div fxFlex=\"45%\" fxFlex.gt-md=\"30%\" *ngFor=\"let leader of itemsPage.docs | async | paginate: {\n                                                           id: 'leaderItemsPage',\n                                                           itemsPerPage: this.pageSize,\n                                                           currentPage: itemsPage.page,\n                                                           totalItems: itemsPage.total\n                                                         }\">\n      <md-card class=\"leader-card\">\n        <md-card-title><a [routerLink] = \"['/leader/' + leader._id]\">{{leader.name}} {{leader.surName}}</a>\n          <span *ngIf=\"userService.isOwner(leader)\">\n            (я)\n          </span>\n        </md-card-title>\n        <md-card-content fxLayout=\"row\" fxLayoutGap=\"5%\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\">\n          <app-image fxFlex=\"35%\" [src]=\"leader.photo || 'assets/img/avatar-generic.png'\"></app-image>\n          <div>\n            <div>\n              <b>Візія:</b> {{leader.vision}}\n            </div>\n            Проектів: {{leader.projects?.length}}\n          </div>\n        </md-card-content>\n        <md-card-actions>\n          <a [routerLink] = \"['/leader/' + leader._id]\"><button md-button md-raised-button color=\"primary\">Підтримати</button></a>\n          <span *ngIf=\"userService.hasEditPermissions(leader)\">\n            <a [routerLink] = \"['/leader/' + leader._id + '/edit']\"><button md-button color=\"accent\">Редагувати</button></a>\n            <a href (click) = \"deleteLeader(leader)\"><button md-button color=\"warn\">Видалити</button></a>\n          </span>\n        </md-card-actions>\n      </md-card>\n     </div>\n\n     <pagination-controls\n       id = \"leaderItemsPage\"\n       (pageChange)=\"pageChanged($event)\"\n       [maxSize]=\"5\"\n       directionLinks=\"true\"\n       previousLabel=\"Previous\"\n       nextLabel=\"Next\"\n       autoHide=\"true\"\n       >\n    </pagination-controls>\n\n    <p>Усього лідерів: {{itemsPage.total}}</p>\n    </div>\n\n  </md-card-content>\n</md-card>\n"

/***/ }),

/***/ 958:
/***/ (function(module, exports) {

module.exports = "<md-card>\n    <md-card-title>{{leader.name}} {{leader.surName}}\n      <!-- FIXME\n        <a href><md-icon>thumb_up</md-icon></a>\n        <a href><md-icon>share</md-icon></a>\n        <md-card-subtitle>Місто: {{leader.city}}</md-card-subtitle>\n      -->\n    </md-card-title>\n\n    <md-card-content>\n\n      <div fxLayout=\"row\" fxLayoutGap=\"5%\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\">\n        <div fxFlex=\"30%\" fxFlex.sm=\"50%\" fxFlex.xs=\"100%\">\n          <app-image [src]=\"leader.photo || 'assets/img/avatar-generic.png'\"></app-image>\n          <app-bp-donate [amount]=\"70\" [target]=\"leader\" [targetType]=\"'leader'\"></app-bp-donate>\n        </div>\n        <div fxFlex=\"65%\">\n          <div *ngIf=\"leader.projects && leader.projects.length > 0\">\n            <md-card-title>\n              Проекти:\n            </md-card-title>\n            <md-card-content>\n              <app-project-list [leaderId]=\"leader._id\" pageSize=\"15\"></app-project-list>\n            </md-card-content>\n          </div>\n        </div>\n      </div>\n\n      <app-bp-video [videoUrl]=\"leader.videoUrl\" [title]=\"leader.name\" placeholderUrl=\"{{leader.photo || 'assets/img/avatar.jpg'}}\"></app-bp-video>\n\n      <h2>Місія:</h2>\n      <p>{{leader.mission}}</p>\n      <h2>Візія:</h2>\n      <p>{{leader.vision}}</p>\n\n      <!-- FIXME <h2>Навички та вміння:</h2>\n      <p>Аналітик, соціальний підприємець та консультант</p>\n      <p>Депутат Дніпровської міської ради. Член партії: Рефлексійка</p> -->\n\n      <app-files-view [files]=\"leader.leaderFiles\"></app-files-view>\n\n      <!-- <a href=\"https://www.google.com.ua/\" target=\"_blank\"><md-icon>picture_as_pdf</md-icon></a>Програма на поточну діяльність\n      <a href=\"https://www.google.com.ua/\" target=\"blank\"><md-icon>picture_as_pdf</md-icon></a>Програма на вибори\n      <a href=\"https://www.google.com.ua/\" target=\"blank\"><md-icon>picture_as_pdf</md-icon></a>Фінансовий звіт\n      <a href=\"https://www.google.com.ua/\" target=\"blank\"><md-icon>picture_as_pdf</md-icon></a>Декларація -->\n\n    </md-card-content>\n\n  <md-card-actions>\n    <p class=\"admin\" *ngIf=\"userService.hasEditPermissions(leader)\">\n      <a [routerLink] = \"['/leader/' + leader._id + '/edit']\"><button md-raised-button color=\"accent\">Редагувати</button></a>\n      <a href (click) = \"deleteLeader(leader)\"><button md-raised-button color=\"warn\">Видалити</button></a>\n    </p>\n  </md-card-actions>\n</md-card>\n"

/***/ }),

/***/ 959:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"project-brief-card\">\n  <md-card-header>\n    <div md-card-avatar class=\"project-brief-card-header-image\"></div>\n    <md-card-title>{{project.title}}</md-card-title>\n    <md-card-subtitle>{{project.dateStarted | date}} - {{project.dateEnded | date}}</md-card-subtitle>\n  </md-card-header>\n  <img md-card-image src=\"{{project.imageUrl || 'assets/img/project/project-placeholder.png'}}\">\n  <md-card-content>\n    <p>\n      {{project.description}}\n    </p>\n  </md-card-content>\n  <md-card-actions>\n    <a [routerLink]=\"['/project/', project._id]\"><button md-button>ПІДТРИМАТИ</button></a>\n    <a [routerLink]=\"['/projects']\"><button md-button>УСІ ПРОЕКТИ</button></a>\n  </md-card-actions>\n</md-card>\n"

/***/ }),

/***/ 960:
/***/ (function(module, exports) {

module.exports = "<form>\n<md-card class=\"project-edit-card\">\n    <md-card-content>\n      <md-card-title fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\">\n        <div>\n          <span *ngIf=\"!isUpdateMode\">Створити</span>\n          <span *ngIf=\"isUpdateMode\">Редагувати</span>\n           проект\n         </div>\n         <app-uploader folder=\"bp-files/projects/{{project._id || 'tmp_project_id'}}/images\" listFiles=\"no\" buttonType=\"regular\" buttonLabel=\"Додати зображення\" (uploadedFileUrlChange)=\"project.onImageUrlChange($event)\"></app-uploader>\n      </md-card-title>\n\n      <app-image *ngIf=\"project.imageUrl\" [src]=\"project.imageUrl\"></app-image>\n\n      <md-input-container>\n        <input mdInput required [(ngModel)]=\"project.title\" characterCounter placeholder=\"Обери просту назву, яка полегшить розуміння твого задуму:\" [ngModelOptions]=\"{standalone: true}\">\n      </md-input-container>\n\n      <md-input-container>\n        <textarea mdInput mdTextareaAutosize required class=\"bp-textarea\" rows=\"4\" maxLength=\"1000\" [(ngModel)]=\"project.description\"  placeholder=\"Опиши свій проект чи захід:\" [ngModelOptions]=\"{standalone: true}\">\n        </textarea>\n      </md-input-container>\n\n      <md-input-container>\n        <input mdInput  [(ngModel)]=\"project.videoUrl\" placeholder=\"Відео до проекту:\" [ngModelOptions]=\"{standalone: true}\" >\n      </md-input-container>\n\n    <div class=\"cost-and-dates\" fxLayoutGap=\"3%\" fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\" fxLayout.sm=\"column\" fxLayout.xs=\"column\">\n      <md-input-container class=\"cost\" fxFlex.xs=\"100%\" >\n        <div mdPrefix><md-icon>monetization_on</md-icon>Бюджет:&nbsp;</div>\n        <input mdInput required type=\"number\" [(ngModel)]=\"project.cost\" [ngModelOptions]=\"{standalone: true}\" value=\"1\">\n        <div mdSuffix>UAH</div>\n      </md-input-container>\n\n      <md-input-container fxFlex.xs=\"100%\" >\n        <div mdPrefix><md-icon>date_range</md-icon>Початок:&nbsp;</div>\n        <input mdInput type=\"date\" [(ngModel)]=\"project.dateStarted\" hintlabel=\"Коли проект починається?\" value=\"Вкажи дату початку проекту, будь ласка\" [ngModelOptions]=\"{standalone: true}\" >\n      </md-input-container>\n\n      <md-input-container fxFlex.xs=\"100%\" >\n        <div mdPrefix><md-icon>date_range</md-icon>Завершення:&nbsp;</div>\n        <input mdInput type=\"date\" [(ngModel)]=\"project.dateEnded\" hintlabel=\"Коли закінчується проект?\" value=\"Дата завершення проекту\" [ngModelOptions]=\"{standalone: true}\" >\n      </md-input-container>\n     </div>\n\n      <!-- Project Tasks -->\n      <app-task-list title=\"Заходи проекту\" [project]=\"project\" *ngIf=\"showTasks\"></app-task-list>\n      <app-task-list title=\"Закороткий опис\" [project]=\"project\" *ngIf=\"showTasks\" [pageSize]=\"3\" dbQuery='{ \"$where\": \"this.description.length < 3\" }'></app-task-list>\n      <!-- /Project Tasks -->\n\n      <!-- TODO: Зробити окремі посилання на перегляд відфільтрованих заходів, проектів і т. д. -->\n\n    </md-card-content>\n\n    <md-toolbar class=\"add-toolbar\" color=\"#fff\">\n      <button type=\"submit\" md-raised-button (click)=\"saveProject()\" color=\"primary\">\n        <span *ngIf=\"!isUpdateMode\">Додати</span>\n        <span *ngIf=\"isUpdateMode\">Зберегти</span>\n        <span>проект</span>\n      </button>\n      <button md-button (click)=\"cancelEditing()\" color=\"primary\">\n        Відмінити\n      </button>\n\n      <span class=\"add-fill-remaining\"></span>\n\n      <!-- MOVE TO OTHER LEADER -->\n      <div *ngIf=\"userService.isAdmin() && isUpdateMode\">\n        <button *ngIf=\"!leaders\" md-button (click)=\"requestLeadersToSelectFrom()\">Змінити лідера</button>\n        <form *ngIf=\"leaders\">\n          <md-select placeholder=\"Select new leader\" (change)=\"moveProjectToOtherLeader($event)\" name=\"leader\">\n            <md-option *ngFor=\"let leader of leaders\" [value]=\"leader\">\n              {{leader.name}} {{leader.surName}}\n            </md-option>\n          </md-select>\n        </form>\n      </div>\n    </md-toolbar>\n\n</md-card>\n</form>\n"

/***/ }),

/***/ 961:
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <md-card-title>Проекти</md-card-title>\n  <md-card-subtitle>Як зробити діяльність прозорою? Будь-який діяч є менеджером проектів.\n    Кожен проект має визначені  бюджет, строки і результат. Результат оцінює спільнота.\n    Менеджер реагує на критику і відповідає на запитання.\n  </md-card-subtitle>\n\n  <md-card-content>\n\n    <app-project-list [pageSize]=\"10\"></app-project-list>\n\n  </md-card-content>\n  <!-- <md-card-actions>\n    <a href=\"/projects\"><button md-button color=\"primary\">Переглянути усі проекти</button></a>\n  </md-card-actions> -->\n</md-card>\n"

/***/ }),

/***/ 962:
/***/ (function(module, exports) {

module.exports = "<h2 *ngIf=\"title !== ''\">{{title}}</h2>\n\n<md-list>\n  <!-- Usage: <app-project-list [leaderId]=\"123\" [pageSize]=\"10\"></app-project-list> -->\n  <md-list-item *ngFor=\"let project of itemsPage.docs | async | paginate: {\n                                                                            id: 'projectItemsPage',\n                                                                            itemsPerPage: this.pageSize,\n                                                                            currentPage: itemsPage.page,\n                                                                            totalItems: itemsPage.total\n                                                                          }\">\n    <!-- <app-image md-list-avatar [src]=\"project.photo || 'assets/img/project-generic.png'\"></app-image> -->\n    <!-- <img md-list-avatar src=\"assets/img/avatar.jpg\" alt=\"{{project.title}}\"> -->\n    <!-- <md-icon color=\"accent\">assignment</md-icon> -->\n\n    <h3 md-line><a [routerLink]=\"['/project/' + project._id]\"><b>{{project.title}}</b> - {{project.managerName}}. Заходів: {{project.tasks?.length}}</a></h3>\n    <p md-line>\n      {{project.dateStarted | date}} - {{project.dateEnded | date}}. {{project.cost}} UAH\n    </p>\n    <p md-line>\n      <small>{{project.description}}</small>\n    </p>\n    <p *ngIf=\"userService.hasEditPermissions(project)\" class=\"admin\" style=\"min-width:4em;\">\n      <a [routerLink]=\"['/project/' + project._id + '/edit']\"><md-icon>edit</md-icon></a>\n      <a href (click)=\"deleteProject(project)\"><md-icon>delete</md-icon></a>\n    </p>\n  </md-list-item>\n\n  <!-- TODO Also show Projects as Cards / Thumbs -->\n\n  <!--\n  <div *ngFor=\"let project of app.projects\">\n    <md-card>\n      <md-card-header>\n        <img md-card-avatar src=\"assets/img/avatar-generic.png\" alt=\"{{project.title}}\">\n        <md-card-title>{{project.title}}</md-card-title>\n        <md-card-subtitle>{{project.managerName}}, Дніпро</md-card-subtitle>\n      </md-card-header>\n      <md-card-content>\n          {{project.description}}\n          <br/>\n          <br/>\n          <small>Строки: {{project.dateStarted | date:'yMMMMd'}} - {{project.dateEnded | date:'yMMMMd'}}, вартість: {{project.cost}} UAH</small>\n      </md-card-content>\n      <md-card-actions>\n        <a [routerLink]=\"['/project/' + project._id]\"><button md-button color=\"primary\">Підтримати</button></a>\n      </md-card-actions>\n    </md-card>\n  </div> -->\n</md-list>\n\n<pagination-controls\n                    id = \"projectItemsPage\"\n                    (pageChange)=\"pageChanged($event)\"\n                    [maxSize]=\"5\"\n                    directionLinks=\"true\"\n                    previousLabel=\"Previous\"\n                    nextLabel=\"Next\"\n                    autoHide=\"true\"\n                    >\n</pagination-controls>\n\n<p>Кількість проектів: {{itemsPage.total}}</p>\n"

/***/ }),

/***/ 963:
/***/ (function(module, exports) {

module.exports = "<div class=\"project-view\">\n\n  <md-card-content>\n\n    <app-bp-sharer #sharer [project]=\"project\"></app-bp-sharer>\n\n    <h1>{{project.title}}</h1>\n    <app-bp-donate [label]=\"'Підтримати проект:'\" [amount]=\"70\" [target]=\"project\" [targetType]=\"'project'\"></app-bp-donate>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\">\n      <div fxFlex=\"50%\">\n        <app-image [src]=\"project.imageUrl || 'assets/img/project/project-placeholder.png'\"></app-image>\n      </div>\n\n      <div fxFlex=\"45%\">\n        <!-- FIXME Рахувати вартість та донацїї проекту за його заходами -->\n        <h2>Зібрано {{project.totalDonationsReceived || 0}} з {{project.cost}} UAH</h2>\n        <h3>Менеджер: <a [routerLink] = \"['/leader/' + project.managerId ]\">{{project.managerName}}</a></h3>\n        <p>Початок: {{project.dateStarted | date}}<br/>\n        Кінець: {{project.dateEnded | date}}</p>\n      </div>\n    </div>\n\n    <h2>Детальніше</h2>\n    <p>{{project.description}}</p>\n\n    <!-- <h2>Відео до проекту</h2> -->\n    <app-bp-video class=\"project-video\" [videoUrl]=\"project.videoUrl\" [title]=\"project.title\" placeholderUrl=\"assets/img/project/project-placeholder.png\"></app-bp-video>\n\n    <!-- Project Tasks -->\n    <app-task-list title=\"Заходи:\" [project]=\"project\" [pageSize]=\"3\" ></app-task-list>\n    <!-- /Project Tasks -->\n\n    <p *ngIf=\"userService.hasEditPermissions(project)\" class=\"admin project-toolbar\">\n      <a [routerLink] = \"['/project/' + project._id + '/edit']\"><button md-raised-button color=\"primary\">Редагувати</button></a>\n      <!-- TODO Enable it -->\n      <a href (click) = \"deleteProject(project)\"><button md-raised-button color=\"warn\">Видалити проект</button></a>\n    </p>\n\n  </md-card-content>\n\n</div>\n"

/***/ }),

/***/ 964:
/***/ (function(module, exports) {

module.exports = "<div>\n  <button *ngIf=\"!readyToDonate\" (click)=\"onDonateToggle()\" md-raised-button color=\"accent\">{{label + ' ' + this.amount + ' UAH'}}</button>\n  <button *ngIf=\"!readyToDonate && target.totalDonationsReceived>0\" (click)=\"onToggleDonationsList()\" md-button color=\"accent\">Усього: {{target.totalDonationsReceived || 0}} UAH</button>\n  <div *ngIf=\"readyToDonate\" >\n      <div [innerHTML]=\"donationFormHtml\"></div>\n      <p>Увага: натиснувши кнопку \"Переказати\", Ви перейдете на сторінку оплати,\n        щоб переказати кошти у зручний для Вас спосіб.\n      </p>\n      <button (click)=\"onDonateToggle()\" md-button>Відмінити</button>\n  </div>\n\n  <app-donations-list title=\"Вже зроблені внески\" [target]=\"target\" [targetType]=\"targetType\" [pageSize]=\"10\" dbQuery=\"{}\" *ngIf=\"donationsListVisible\" ></app-donations-list>\n\n</div>\n"

/***/ }),

/***/ 965:
/***/ (function(module, exports) {

module.exports = "<!-- Usage:\n  <app-donations-list title=\"Given title\" [target]=\"target\" [targetType]=\"targetType\" [pageSize]=\"10\" dbQuery=\"{}\"></app-donations-list>\n-->\n<md-card>\n\n  <md-card-title>\n\n    <md-toolbar class=\"add-toolbar\" color=\"accent\">\n      <span *ngIf=\"title !== ''\">{{title}}</span>\n      <!-- TODO Усього зроблено внесків: {{donations.length | async}} -->\n      <span class=\"add-fill-remaining\"></span>\n      Сума: {{target.totalDonationsReceived}} UAH\n      <!-- <button md-raised-button (click)=\"addTask(project)\"  *ngIf=\"!isAddingTaskMode && user.hasEditPermissions(project)\" color=\"primary\">Додати захід</button> -->\n    </md-toolbar>\n\n  </md-card-title>\n\n  <md-card-content>\n\n    <md-list>\n      <ol>\n       <!-- <md-list-item *ngFor=\"let donation of donations | async\"> -->\n       <md-list-item *ngFor=\"let donation of itemsPage.docs | async | paginate: {\n                                                                       id: 'donationItemsPage',\n                                                                       itemsPerPage: this.pageSize,\n                                                                       currentPage: itemsPage.page,\n                                                                       totalItems: itemsPage.total\n                                                                     }\">\n         <li>\n           <small>{{donation.description}} {{donation.dateStarted | date}}, {{donation.status}}\n             <span *ngIf=\"donation.status == 'sandbox'\">(){{donation.dateCompleted | date}})</span>\n           </small>\n           <!-- FIXME Show completeness status {{donation.dateCompleted | date}} -->\n           <!-- TODO Add individual donation view <h3 md-line><a [routerLink]=\"['/donation/' + donation._id]\"><b>{{donation.title}}</b></a></h3> -->\n           <!-- TODO let admin to delete donation, user to cancel -->\n           <!-- <p *ngIf=\"user.hasEditPermissions(donation)\" class=\"admin\" style=\"min-width:4em;\">\n             <a [routerLink]=\"['/donation/' + donation._id + '/edit']\"><md-icon>edit</md-icon></a>\n             <a href (click)=\"deleteTask(donation)\"><md-icon>delete</md-icon></a>\n           </p> -->\n       </li>\n      </md-list-item>\n      </ol>\n    </md-list>\n\n    <pagination-controls\n                        id = \"donationItemsPage\"\n                        (pageChange)=\"pageChanged($event)\"\n                        [maxSize]=\"5\"\n                        directionLinks=\"true\"\n                        autoHide=\"true\"\n                        >\n    </pagination-controls>\n\n    <h3>Усього: {{itemsPage.total}}</h3>\n\n  </md-card-content>\n\n</md-card>\n"

/***/ }),

/***/ 966:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"files-card\">\n  <md-toolbar color=\"primary\">\n    <span>Файли та документи</span>\n    <!-- <span class=\"add-fill-remaining\"></span>\n    <md-icon *ngIf=\"gdrive_authorize\" (click)=\"handleAuthClick()\" class=\"pointer\">account_circle</md-icon>\n    <md-icon *ngIf=\"gdrive_signout\" (click)=\"handleSignoutClick()\" class=\"pointer\">exit_to_app</md-icon> -->\n  </md-toolbar>\n\n  <md-card-content class=\"files-card-content\">\n\n    <p *ngIf=\"!gdrive_authorized\" class=\"gdrive-invitation\">\n      Щоб редагувати свої файли, треба <a href=\"#\" (click)=\"handleAuthClick()\">авторизуватися у Google Drive</a>.\n    </p>\n\n    <div *ngIf=\"gdrive_authorized\">\n      <md-list class=\"file-list\">\n        <md-list-item *ngFor=\"let file of fileList\">\n          <!-- TODO File link should open document preview -->\n          <md-icon color=\"warn\" title=\"{{file.id}}\" class=\"file-icon\">insert_drive_file</md-icon><a href=\"{{file.webViewLink}}\" title=\"{{file.mimeType}}\" target=\"_blank\">{{file.name}}</a>\n        </md-list-item>\n      </md-list>\n\n      <div>\n        <input type=\"file\" #fileInput (change)=\"handleUploadFilenameChange($event)\" style=\"display: none\">\n\n        <!-- Before file selected -->\n        <button *ngIf=\"fileToUpload === null\" md-button (click)=\"handleSelectFileClick()\"><md-icon class=\"pointer\">add</md-icon> Додати файл</button>\n\n        <!-- After file selected -->\n        <button *ngIf=\"fileToUpload != null && !uploadInProgress\" md-raised-button (click)=\"handleUploadFileClick()\" color=\"accent\">Завантажити файл \"{{fileToUploadName}}\"</button>\n        <button *ngIf=\"fileToUpload != null && uploadInProgress\" md-button disabled>Завантажую \"{{fileToUploadName}}\"...</button>\n\n        <!-- GDrive Signin Status (and email if user's admin) -->\n        <p class=\"signout-link\">\n          <a href=\"#\" (click)=\"handleSignoutClick()\">Вийти з Google Drive</a>\n          <span *ngIf=\"userService.isAdmin()\">({{savedSignInUserInfo.getBasicProfile().getEmail()}})</span>\n        </p>\n        <!-- *ngIf=\"uploadInProgress\"  -->\n        <md-progress-bar mode=\"indeterminate\" *ngIf=\"uploadInProgress\" color=\"accent\"></md-progress-bar>\n      </div>\n    </div>\n\n  </md-card-content>\n</md-card>\n"

/***/ }),

/***/ 967:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"files-card\" *ngIf=\"!!files && files.length > 0\">\n  <md-toolbar color=\"primary\">\n    <span>Файли та документи</span>\n  </md-toolbar>\n\n  <!-- FIXME Deal with null objects sometimes appeaing in DB -->\n\n  <!-- FIXME Deal with broken links due to removed files:\n    - test links via curl\n    - report such files back to author\n  -->\n\n  <md-card-content class=\"files-card-content\">\n\n    <md-list class=\"file-list\">\n      <md-list-item *ngFor=\"let file of files\">\n        <!-- TODO File link should open document preview -->\n        <md-icon color=\"warn\" title=\"{{file.name}}\" class=\"file-icon\">insert_drive_file</md-icon>\n        <a href=\"{{file.link}}\" title=\"{{file.name}}\" target=\"_blank\">{{file.name}}</a>\n      </md-list-item>\n    </md-list>\n\n  </md-card-content>\n\n</md-card>\n"

/***/ }),

/***/ 968:
/***/ (function(module, exports) {

module.exports = "<!-- FIXME Alt -->\n<img src=\"{{src}}\" alt={{src}} />\n"

/***/ }),

/***/ 969:
/***/ (function(module, exports) {

module.exports = "<nav>\n  <a [routerLink]=\"['/']\"><button md-button color=\"primary\">Головна</button></a>\n  <a [routerLink]=\"['/projects']\"><button md-button color=\"primary\">Проекти</button></a>\n  <a [routerLink]=\"['/leaders']\"><button md-button color=\"primary\">Лідери</button></a>\n  <a *ngIf=\"userService.authenticated()\" [routerLink]=\"['/add-project']\"><button md-button color=\"primary\">Створити проект</button></a>\n  <a *ngIf=\"showCreateLeaderButton\" [routerLink]=\"['/add-leader']\"><button md-button color=\"primary\">Стати лідером</button></a>\n</nav>\n"

/***/ }),

/***/ 970:
/***/ (function(module, exports) {

module.exports = "<!-- Show/Hide Sharer Button -->\n<a href (click)=\"toggleSharer()\" class=\"show-sharer-button\">\n  <button *ngIf=\"!sharerIsVisible\" md-raised-button color=\"accent\">Поширити</button>\n</a>\n\n<!-- TODO Let user enter few addresses, separated by comma or semicolon -->\n<md-card class=\"share-card\" [class.display-block]=\"sharerIsVisible\" [@visibilityChanged]=\"sharerIsVisible\">\n\n  <form #shareForm=\"ngForm\" (ngSubmit)=\"shareItem(shareForm.value)\">\n\n    <!-- Buttons -->\n    <div style=\"float:right;margin-top: -0.75em;margin-right: 0\">\n      <button (click)=\"toggleSharer()\" md-button>Відмінити</button>\n      <button type=\"submit\" md-raised-button color=\"accent\" class=\"bt-input\">Надіслати листа</button>\n    </div>\n\n    <!-- Show sending status -->\n    <h2 *ngIf=\"getFormState('')\">Надіслати по email</h2>\n    <h2 *ngIf=\"getFormState('emailIsBeingSent')\">Надсилаю повідомлення...</h2>\n    <h2 *ngIf=\"getFormState('emailSent')\">Повідомлення надіслано</h2>\n    <h2 *ngIf=\"getFormState('emailSendError')\">Сталася помилка {{emailSendError}}</h2>\n    <h2 *ngIf=\"getFormState('formIsNotComplete')\">Форма не готова до відправки</h2>\n\n    <!-- 'To' email -->\n    <!-- FIXME E2E Test validator -->\n    <md-input-container class=\"wide\">\n      <md-placeholder>Кому:</md-placeholder>\n      <input mdInput appValidateEmail [(ngModel)]=\"toEmail\" name=\"toEmail\"\n        class=\"wide bt-input email-input\" (blur)=\"handleInputBlur($event)\"\n        [class.invalid]=\"formErrors.toEmail\">\n    </md-input-container>\n\n    <!-- Validation error display -->\n    <div *ngIf=\"formErrors.toEmail\" class=\"validation-error\">\n      {{formErrors.toEmail}}\n    </div>\n\n    <!-- Subject (disabled) -->\n    <md-input-container class=\"wide\">\n      <md-placeholder>Тема:</md-placeholder>\n      <input mdInput disabled class=\"wide\" [ngModel]=\"emailSubject\" name=\"emailSubject\">\n    </md-input-container>\n\n    <!-- Video -->\n    <md-input-container class=\"wide\">\n      <md-placeholder>Відео (посилання):</md-placeholder>\n      <input mdInput [(ngModel)]=\"videoUrl\" name=\"videoUrl\" class=\"wide bt-input video-input\">\n    </md-input-container>\n\n    <!-- Message text -->\n    <md-input-container class=\"wide\">\n      <md-placeholder>Текст:</md-placeholder>\n      <textarea mdInput mdTextareaAutosize #resizableTextArea class=\"mailtext\"\n        [(ngModel)]=\"textToReader\" name=\"textToReader\">\n      </textarea>\n    </md-input-container>\n\n  </form>\n\n  <!-- Email Preview -->\n  <md-card-content *ngIf=\"showEmailPreview\" class=\"email-preview\">\n    <h3>Так буде виглядати повідомлення, яке отримає адресат:</h3>\n    <p [innerHTML]=\"emailHtml\"></p>\n  </md-card-content>\n\n  <!-- HTML Preview -->\n  <div *ngIf=\"showHtmlPreview\" class=\"bp-pre-html\">{{emailHtml}}</div>\n\n  <!-- Buttons -->\n  <div style=\"float:right\">\n    <button (click)=\"toggleHtmlPreview()\" *ngIf=\"!showHtmlPreview\" md-button>Показати HTML</button>\n    <button (click)=\"toggleHtmlPreview()\" *ngIf=\"showHtmlPreview\" md-raised-button>Сховати HTML</button>\n    <button (click)=\"toggleSharer()\" md-button>Відмінити</button>\n    <button (click)=\"shareItem(shareForm.value)\" md-raised-button color=\"accent\" class=\"bt-input\">Надіслати листа</button>\n  </div>\n\n</md-card>\n"

/***/ }),

/***/ 971:
/***/ (function(module, exports) {

module.exports = "<md-toolbar color=\"primary\">\n  <span class=\"logo\">\n    <a [routerLink]=\"['/']\">\n      <md-icon class=\"toolbar-inline-icon\">group_work</md-icon>\n      <span>BigPolicy</span>\n    </a>\n  </span>\n\n  <span class=\"username\">\n    <a *ngIf=\"!userService.authenticated()\" (click)=\"userService.login()\"><span>Увійти</span></a>\n    <span *ngIf=\"userService.authenticated()\" class=\"toolbar-username\">\n      <!-- FIXME Override User Profile Name with Leader Name ? -->\n      <a [routerLink]=\"['/profile']\">\n        <span>{{userService.userProfile ? userService.userProfile.name : ''}}</span>\n        <span *ngIf=\"userService.isAdmin()\">(адмін)</span>\n        <md-icon class=\"toolbar-inline-icon\">account_circle</md-icon>\n      </a>\n      <a (click)=\"userService.logout()\"><span>Вийти</span></a>\n    </span>\n  </span>\n\n  <button md-icon-button [md-menu-trigger-for]=\"menu\">\n    <md-icon>more_vert</md-icon>\n  </button>\n  \n</md-toolbar>\n\n<md-menu x-position=\"before\" #menu=\"mdMenu\">\n  <button md-menu-item (click)=\"isDarkTheme=!isDarkTheme\">Toggle Theme</button>\n</md-menu>\n"

/***/ }),

/***/ 972:
/***/ (function(module, exports) {

module.exports = "<form ngNoForm>\n\n  <!-- <input id=\"fileInput\" name=\"fileInput\" type=\"file\" > <button (click)=\"initUpload()\" type=\"button\">Upload</button> -->\n\n  <div>\n    <input type=\"file\" id=\"fileInput\" name=\"fileInput\" #fileInput (change)=\"handleUploadFilenameChange($event)\" style=\"display: none\">\n\n    <!-- For Fab-type button -->\n    <div *ngIf=\"useFabButton\">\n\n      <!-- Before file selected -->\n      <button md-mini-fab class=\"size-fab-upload\" *ngIf=\"fileToUpload === null && !uploadJustHaveFinished\" (click)=\"handleSelectFileClick($event, true)\">\n        <md-icon color=\"white\">file_upload</md-icon>\n      </button>\n\n      <!-- After file selected — immediate 'Upload' starts -->\n\n      <!-- 'Uploading...' -->\n      <md-spinner mode=\"indeterminate\" *ngIf=\"uploadInProgress\" color=\"accent\" class=\"size-fab-upload\" ></md-spinner>\n\n      <!-- 'Uploaded!' -->\n      <button md-mini-fab class=\"size-fab-upload\" *ngIf=\"uploadJustHaveFinished\" disabled>\n        <md-icon color=\"accent\">check_circle</md-icon>\n      </button>\n    </div>\n\n    <!-- For Regular button -->\n    <div *ngIf=\"!useFabButton\">\n\n      <!-- Before file selected -->\n      <button *ngIf=\"fileToUpload === null && !uploadJustHaveFinished\" (click)=\"handleSelectFileClick()\" md-button><md-icon class=\"pointer\">add</md-icon> {{buttonLabel}}</button>\n\n      <!-- After file selected -->\n      <button *ngIf=\"fileToUpload != null && !uploadInProgress\" (click)=\"handleUploadFileClick()\" color=\"accent\" md-raised-button>Завантажити файл {{fileToUploadName}}</button>\n\n      <!-- 'Uploading...' -->\n      <button *ngIf=\"fileToUpload != null && uploadInProgress\" md-button disabled>Завантажую {{fileToUploadName}}...</button>\n\n      <md-progress-bar mode=\"indeterminate\" *ngIf=\"uploadInProgress\" color=\"accent\"></md-progress-bar>\n\n      <!-- 'Uploaded!' -->\n      <button *ngIf=\"uploadJustHaveFinished\" md-button disabled><md-icon color=\"accent\">check_circle</md-icon> Файл завантажено</button>\n\n    </div>\n\n  </div>\n\n</form>\n\n<div *ngIf=\"listFilesOnStart\">\n\n  <div *ngFor=\"let img of imageList | async\" style=\"position:relative;width:100px;height:100px;float:left;display:flex;justify-content:center;align-items:center;\">\n    <img [src]=\"img.downloadURL | async\" style=\"max-width:100px; max-height:100px;\">\n    <button (click)=\"delete(img)\" style=\"position:absolute; top:2px; right:2px;\">[x]</button>\n  </div>\n\n</div>\n"

/***/ }),

/***/ 973:
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <div *ngIf=\"userService.authenticated() && userService.userProfile\">\n    <md-card-title-group>\n      <md-card-title>\n        <!-- FIXME Override User Profile Name with Leader Name ? -->\n        {{userService.userProfile.name}}\n        <md-chip-list>\n          <md-chip>Зареєстрований</md-chip>\n          <md-chip *ngIf=\"userService.isAdmin()\"><strong>Адміністратор</strong></md-chip>\n        </md-chip-list>\n      </md-card-title>\n      <img md-card-md-image [src]=\"userService.userProfile.picture\">\n    </md-card-title-group>\n    <md-card-content>\n      <p><strong>Email: </strong> {{userService.userProfile.email}}</p>\n      <p><strong>Нікнейм: </strong> {{userService.userProfile.nickname}}</p>\n      <p><strong>Дата реєстрації: </strong> {{userService.userProfile.created_at}}</p>\n      <p><strong>Останій вхід: </strong> {{userService.userProfile.updated_at}}</p>\n\n      <!-- <h4>You are logged in</h4> -->\n    </md-card-content>\n\n    <md-card *ngIf=\"profileLeader\">\n      <md-card-title>\n        Лідер: {{profileLeader.name}} {{profileLeader.surName}}\n      </md-card-title>\n      <md-card-content>\n        <!-- FIXME <h2 *ngIf=\"profileLeader.projects && profileLeader.projects.length > 0\">Проекти:</h2> -->\n        <!-- <app-project-list [leaderId]=\"profileLeader._id\" pageSize=\"2\" > -->\n        <app-project-list title=\"Проекти з заходами\" [leaderId]=\"profileLeader._id\" pageSize=\"3\" dbQuery='{ \"$where\": \"this.tasks.length > 0\" }'>\n        </app-project-list>\n\n        <app-project-list title=\"Проекти без заходів\" [leaderId]=\"profileLeader._id\" pageSize=\"3\" dbQuery='{ \"$where\": \"this.tasks.length < 1\" }'>\n        </app-project-list>\n\n        <app-task-list *ngIf=\"userService.isAdmin()\" title=\"Усі заходи\" pageSize=\"100\" dbQuery='{}'>\n        </app-task-list>\n\n      </md-card-content>\n      <md-card-actions>\n        <span *ngIf=\"userService.hasEditPermissions(profileLeader)\">\n          <a [routerLink] = \"['/leader/' + profileLeader._id + '/edit']\"><button md-button color=\"accent\">Редагувати</button></a>\n        </span>\n      </md-card-actions>\n    </md-card>\n  </div>\n\n  <div *ngIf=\"!userService.authenticated()\">\n    <h4>Ви не зайшли в систему</h4>\n    <p>\n      Авторизовані користувачі можуть:\n    </p>\n    <ul>\n      <li>\n        створювати проекти\n      </li>\n      <li>\n        ставати лідерами\n      </li>\n      <li>\n        користуватися іншими розширеними фунціями системи.\n      </li>\n    </ul>\n    <p>\n      Будь ласка, натисніть \"Увійти\", для авторизації.\n    </p>\n    <a (click)=\"userService.login()\"><button md-raised-button color=\"accent\">Увійти</button></a>\n  </div>\n\n</md-card>\n"

/***/ }),

/***/ 974:
/***/ (function(module, exports) {

module.exports = "<!-- TODO: FIXME_SEC double-check security here as soon as we neutralized DomSanitizer -->\n<!-- TODO: convert it to \"add video (media?)\" function -->\n<!-- [src]=\"safeVideoUrl\" -->\n<div *ngIf=\"youTubeId\" class=\"bp-video-iframed\">\n  <iframe width=\"100%\" height=\"100%\" [src]=\"safeMediaUrl\" frameborder=\"0\" allowfullscreen></iframe>\n</div>\n"

/***/ }),

/***/ 975:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"task-edit-view\">\n  <form>\n\n    <md-card-content>\n\n      <md-card-title>\n        <span *ngIf=\"!isUpdateMode\">Додати</span>\n        <span *ngIf=\"isUpdateMode\">Редагувати</span>\n         захід\n      </md-card-title>\n\n      <md-input-container>\n        <input mdInput required [(ngModel)]=\"task.title\" characterCounter placeholder=\"Назва заходу:\" [ngModelOptions]=\"{standalone: true}\" >\n      </md-input-container>\n\n      <md-input-container>\n        <textarea mdInput mdTextareaAutosize required [(ngModel)]=\"task.description\" rows=\"3\" placeholder=\"Опиши захід:\" [ngModelOptions]=\"{standalone: true}\" >\n        </textarea>\n      </md-input-container>\n\n      <!-- TODO: Use existing video control to auto-extend functionality on input -->\n      <md-input-container>\n        <input mdInput  [(ngModel)]=\"task.videoUrl\" placeholder=\"Відео:\" [ngModelOptions]=\"{standalone: true}\" >\n      </md-input-container>\n\n      <div class=\"cost-and-dates\" fxLayoutGap=\"3%\" fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" fxLayout.sm=\"column\" fxLayout.xs=\"column\">\n        <md-input-container class=\"cost\" fxFlex.xs=\"100%\" >\n          <div mdPrefix><md-icon>monetization_on</md-icon>Бюджет:</div>\n          <input mdInput required type=\"number\" [(ngModel)]=\"task.cost\" [ngModelOptions]=\"{standalone: true}\">\n          <div mdSuffix>UAH</div>\n        </md-input-container>\n\n        <md-input-container fxFlex.xs=\"100%\" >\n          <div mdPrefix><md-icon>date_range</md-icon>Початок:&nbsp;</div>\n          <input mdInput type=\"date\" [(ngModel)]=\"task.dateStarted\" hintlabel=\"Коли починається?\" value=\"Вкажи дату початку, будь ласка\" [ngModelOptions]=\"{standalone: true}\" >\n        </md-input-container>\n        <md-input-container fxFlex.xs=\"100%\" >\n          <div mdPrefix><md-icon>date_range</md-icon>Завершення:&nbsp;</div>\n          <input mdInput type=\"date\" [(ngModel)]=\"task.dateEnded\" hintlabel=\"Коли закінчується?\" value=\"Дата завершення\" [ngModelOptions]=\"{standalone: true}\" >\n         </md-input-container>\n       </div>\n\n      <md-toolbar>\n        <button type=\"submit\" md-raised-button (click)=\"saveTask()\" color=\"primary\">\n          <span *ngIf=\"!isUpdateMode\">Додати</span>\n          <span *ngIf=\"isUpdateMode\">Зберегти</span>\n           захід</button>\n           <button *ngIf=\"isUpdateMode\" (click)=\"deleteTask(task)\" md-raised-button color=\"warn\">Видалити</button>\n         <button md-button (click)=\"cancelEditing()\" color=\"primary\">\n           Відмінити\n         </button>\n        <span class=\"add-fill-remaining\"></span>\n\n        <!-- MOVE TO OTHER PROJECT -->\n        <div *ngIf=\"userService.isAdmin() && isUpdateMode\">\n          <button *ngIf=\"!projects\" md-button (click)=\"requestProjectsToSelectFrom()\">До іншого проекту</button>\n          <form *ngIf=\"projects\">\n            <md-select placeholder=\"Вибери проект\" (change)=\"moveTaskToOtherProject($event)\" name=\"project\">\n              <md-option *ngFor=\"let project of projects\" [value]=\"project\">\n                {{project.title}}\n              </md-option>\n            </md-select>\n          </form>\n        </div>\n\n      </md-toolbar>\n\n    </md-card-content>\n  </form>\n</md-card>\n"

/***/ }),

/***/ 976:
/***/ (function(module, exports) {

module.exports = "<!-- Usage: <app-task-list title=\"Given title\" [project]=\"project\" [pageSize]=\"10\" dbQuery=\"{}\"></app-task-list> -->\n\n<md-card-content>\n  <md-card-actions>\n    <md-toolbar class=\"add-toolbar\" color=\"accent\"><span *ngIf=\"title !== ''\">{{title}}</span>\n      <span class=\"add-fill-remaining\"></span>\n      <button md-raised-button (click)=\"addTask(project)\"  *ngIf=\"!isAddingTaskMode && userService.hasEditPermissions(project)\" color=\"primary\">Додати захід</button>\n    </md-toolbar>\n  </md-card-actions>\n\n  <!-- Add task -->\n  <app-bp-task-edit [projectId]=\"project._id\" *ngIf=\"isAddingTaskMode\" class=\"add-project-inline\">\n  </app-bp-task-edit>\n\n  <div>\n     <app-task-view [task]=\"task\" [compactView]=\"true\" dataprovided=\"true\"\n      *ngFor=\"let task of itemsPage.docs | async | paginate: {\n                                                               id: 'taskItemsPage',\n                                                               itemsPerPage: this.pageSize,\n                                                               currentPage: itemsPage.page,\n                                                               totalItems: itemsPage.total\n                                                             }\">\n\n\n    </app-task-view>\n  </div>\n\n  <!-- <md-list>\n     <md-list-item *ngFor=\"let task of itemsPage.docs | async | paginate: {\n                                                                 id: 'taskItemsPage',\n                                                                 itemsPerPage: this.pageSize,\n                                                                 currentPage: itemsPage.page,\n                                                                 totalItems: itemsPage.total\n                                                               }\">\n\n\n       <h3 md-line><a [routerLink]=\"['/task/' + task._id]\"><b>{{task.title}}</b></a></h3>\n       <p md-line>\n        <b>{{task.cost}} UAH.</b> {{task.dateStarted | date}} - {{task.dateEnded | date}}\n       </p>\n       <p md-line>\n         <small>{{task.project}}</small> | <small>{{task.description}}</small>\n       </p>\n       <p *ngIf=\"userService.hasEditPermissions(task)\" class=\"admin\" style=\"min-width:4em;\">\n         <a [routerLink]=\"['/task/' + task._id + '/edit']\"><md-icon>edit</md-icon></a>\n         <a href (click)=\"deleteTask(task)\"><md-icon>delete</md-icon></a>\n       </p>\n    </md-list-item>\n  </md-list> -->\n\n  <pagination-controls\n                      id = \"taskItemsPage\"\n                      (pageChange)=\"pageChanged($event)\"\n                      [maxSize]=\"5\"\n                      directionLinks=\"true\"\n                      autoHide=\"true\"\n                      >\n  </pagination-controls>\n\n  <p>Усього заходів: {{itemsPage.total}}</p>\n\n</md-card-content>\n"

/***/ }),

/***/ 977:
/***/ (function(module, exports) {

module.exports = "<!-- COMPACT -->\n<div *ngIf=\"compactView\" fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\">\n\n  <h3> <a [routerLink]=\"['/project/' + task.projectId]\"><small>{{projectTitle}}</small></a> | <a [routerLink]=\"['/task/' + task._id]\"><b>{{task.title}}</b></a>\n    <br />{{task.cost}} UAH. {{task.dateStarted | date}} - {{task.dateEnded | date}}\n    <small>{{task.description}}</small>\n  </h3>\n\n  <div fxFlex=\"1 13rem 1\" *ngIf=\"userService.hasEditPermissions(task)\">\n    <a [routerLink]=\"['/task/' + task._id + '/edit']\"><md-icon>edit</md-icon></a>\n    <a href (click)=\"deleteTask(task)\"><md-icon>delete</md-icon></a>\n  </div>\n\n</div>\n\n<!-- FULL VIEW -->\n<md-card class=\"task-view\" *ngIf=\"!compactView\">\n  <md-card-content>\n\n    <h1>{{task.title}}</h1>\n    <!-- FIXME -->\n    <app-bp-donate [label]=\"'Підтримати захід:'\" [amount]=\"70\" [target]=\"task\" [targetType]=\"'task'\"></app-bp-donate>\n    <!-- -->\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between stretch\" fxLayout.xs=\"column\">\n      <div fxFlex=\"45%\">\n        <h2>Зібрано {{task.totalDonationsReceived || 0}} з {{task.cost}} UAH</h2>\n        <h3><a [routerLink]=\"['/project/',task.projectId]\">Проект: {{projectTitle}}</a></h3>\n        <p>Початок: {{task.dateStarted | date}}<br/>\n          Кінець: {{task.dateEnded | date}}</p>\n          <a href=\"https://www.facebook.com/sharer/sharer.php?u=https%3A//bigpolicy.eu/task/{{task._id}}\"\n          class=\"SHARE FACEBOOK\"\n          onclick='window.open(this.href,\"popupwindow\", \"width=800,height=500,left=200,top=5,scrollbars,toolbar=0,resizable\"); return false;'\n          target=\"social\">\n          Share on FB\n        </a>\n      </div>\n\n      <div fxFlex=\"50%\">\n        <app-image [src]=\"task.imageUrl || 'assets/img/project/project-placeholder.png'\"></app-image>\n        <app-bp-video [videoUrl]=\"task.videoUrl\" [title]=\"task.title\" placeholderUrl=\"assets/img/task/task-placeholder.png\"></app-bp-video>\n      </div>\n    </div>\n\n    <h2>Детальніше</h2>\n    <p>{{task.description}}</p>\n\n    <md-card-actions>\n      <md-toolbar *ngIf=\"userService.hasEditPermissions(task)\" class=\"admin\">\n        <a [routerLink] = \"['/task/' + task._id + '/edit']\"><button md-raised-button>Редагувати</button></a>\n        <span class=\"add-fill-remaining\"></span>\n        <a href (click)=\"deleteTask(task)\"><button md-raised-button color=\"warn\">Видалити</button></a>\n      </md-toolbar>\n    </md-card-actions>\n  </md-card-content>\n</md-card>\n"

/***/ })

},[1314]);
//# sourceMappingURL=main.bundle.js.map