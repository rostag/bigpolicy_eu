"use strict";
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
function main() {
    testing_1.describe('Leader component', function () {
        testing_1.it('should work', testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            tcb.createAsync(TestComponent)
                .then(function (rootTC) {
                var aboutDOMEl = rootTC.debugElement.children[0].nativeElement;
                testing_1.expect(dom_adapter_1.getDOM().querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Leader');
                ;
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=leader.component.spec.js.map