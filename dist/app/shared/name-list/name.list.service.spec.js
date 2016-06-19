"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var testing_1 = require('@angular/http/testing');
var Observable_1 = require('rxjs/Observable');
var name_list_service_1 = require('./name-list.service');
function main() {
    describe('NameList Service', function () {
        var nameListService;
        var backend;
        var initialResponse;
        beforeEach(function () {
            var injector = core_1.ReflectiveInjector.resolveAndCreate([
                http_1.HTTP_PROVIDERS,
                name_list_service_1.NameListService,
                http_1.BaseRequestOptions,
                testing_1.MockBackend,
                core_1.provide(http_1.Http, {
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    },
                    deps: [testing_1.MockBackend, http_1.BaseRequestOptions]
                }),
            ]);
            nameListService = injector.get(name_list_service_1.NameListService);
            backend = injector.get(testing_1.MockBackend);
            var connection;
            backend.connections.subscribe(function (c) { return connection = c; });
            initialResponse = nameListService.get();
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: '["Dijkstra", "Hopper"]' })));
        });
        it('should return an Observable when get called', function () {
            expect(initialResponse).toEqual(jasmine.any(Observable_1.Observable));
        });
        it('should resolve to list of names when get called', function () {
            var names;
            initialResponse.subscribe(function (data) { return names = data; });
            expect(names).toEqual(['Dijkstra', 'Hopper']);
        });
    });
}
exports.main = main;
//# sourceMappingURL=name.list.service.spec.js.map