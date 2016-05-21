"use strict";
var name_list_service_1 = require('./name-list.service');
function main() {
    describe('NameList Service', function () {
        var nameListService;
        beforeEach(function () {
            nameListService = new name_list_service_1.NameListService;
        });
        it('should return the list of names', function () {
            var names = nameListService.get();
            expect(names).toEqual(jasmine.any(Array));
        });
    });
}
exports.main = main;
//# sourceMappingURL=name-list.service.spec.js.map