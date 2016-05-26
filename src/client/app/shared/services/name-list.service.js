"use strict";
var NameListService = (function () {
    function NameListService() {
        // FIXME
        this.names = [
            'Василь Василенко',
            'Світлана Світленко'
        ];
    }
    NameListService.prototype.get = function () {
        return this.names;
    };
    NameListService.prototype.add = function (value) {
        this.names.push(value);
    };
    return NameListService;
}());
exports.NameListService = NameListService;
//# sourceMappingURL=name-list.service.js.map
