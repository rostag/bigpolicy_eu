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
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var tabs_1 = require('./tabs');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
testing_1.describe('MdTabGroup', function () {
    var builder;
    var fixture;
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    testing_1.describe('basic behavior', function () {
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(SimpleTabsTestApp).then(function (f) {
                fixture = f;
            });
        }));
        testing_1.it('should default to the first tab', function () {
            checkSelectedIndex(1);
        });
        testing_1.it('should change selected index on click', function () {
            var component = fixture.debugElement.componentInstance;
            component.selectedIndex = 0;
            checkSelectedIndex(0);
            // select the second tab
            var tabLabel = fixture.debugElement.query(platform_browser_1.By.css('.md-tab-label:nth-of-type(2)'));
            tabLabel.nativeElement.click();
            checkSelectedIndex(1);
            // select the third tab
            tabLabel = fixture.debugElement.query(platform_browser_1.By.css('.md-tab-label:nth-of-type(3)'));
            tabLabel.nativeElement.click();
            checkSelectedIndex(2);
        });
        testing_1.it('should cycle through tab focus with focusNextTab/focusPreviousTab functions', function () {
            var tabComponent = fixture.debugElement.query(platform_browser_1.By.css('md-tab-group')).componentInstance;
            tabComponent.focusIndex = 0;
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(0);
            tabComponent.focusNextTab();
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(1);
            tabComponent.focusNextTab();
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(2);
            tabComponent.focusNextTab();
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(2); // should stop at 2
            tabComponent.focusPreviousTab();
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(1);
            tabComponent.focusPreviousTab();
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(0);
            tabComponent.focusPreviousTab();
            fixture.detectChanges();
            testing_1.expect(tabComponent.focusIndex).toBe(0); // should stop at 0
        });
        testing_1.it('should change tabs based on selectedIndex', function () {
            var component = fixture.debugElement.componentInstance;
            checkSelectedIndex(1);
            component.selectedIndex = 2;
            checkSelectedIndex(2);
        });
    });
    /**
     * Checks that the `selectedIndex` has been updated; checks that the label and body have the
     * `md-active` class
     */
    function checkSelectedIndex(index) {
        fixture.detectChanges();
        var tabComponent = fixture.debugElement
            .query(platform_browser_1.By.css('md-tab-group')).componentInstance;
        testing_1.expect(tabComponent.selectedIndex).toBe(index);
        var tabLabelElement = fixture.debugElement
            .query(platform_browser_1.By.css(".md-tab-label:nth-of-type(" + (index + 1) + ")")).nativeElement;
        testing_1.expect(tabLabelElement.classList.contains('md-active')).toBe(true);
        var tabContentElement = fixture.debugElement
            .query(platform_browser_1.By.css("#" + tabLabelElement.id)).nativeElement;
        testing_1.expect(tabContentElement.classList.contains('md-active')).toBe(true);
    }
});
var SimpleTabsTestApp = (function () {
    function SimpleTabsTestApp() {
        this.selectedIndex = 1;
    }
    SimpleTabsTestApp = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "\n    <md-tab-group class=\"tab-group\" [selectedIndex]=\"selectedIndex\">\n      <md-tab>\n        <template md-tab-label>Tab One</template>\n        <template md-tab-content>Tab one content</template>\n      </md-tab>\n      <md-tab>\n        <template md-tab-label>Tab Two</template>\n        <template md-tab-content>Tab two content</template>\n      </md-tab>\n      <md-tab>\n        <template md-tab-label>Tab Three</template>\n        <template md-tab-content>Tab three content</template>\n      </md-tab>\n    </md-tab-group>\n  ",
            directives: [tabs_1.MD_TABS_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SimpleTabsTestApp);
    return SimpleTabsTestApp;
}());
//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/components/tabs/tab-group.spec.js.map