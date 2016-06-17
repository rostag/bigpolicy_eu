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
var common_1 = require('@angular/common');
var testing_2 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var checkbox_1 = require('./checkbox');
var promise_completer_1 = require('@angular2-material/core/async/promise-completer');
// TODO: Implement E2E tests for spacebar/click behavior for checking/unchecking
describe('MdCheckbox', function () {
    var builder;
    var fixture;
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    describe('basic behaviors', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var checkboxInstance;
        var testComponent;
        var inputElement;
        var labelElement;
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(SingleCheckbox).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                checkboxInstance = checkboxDebugElement.componentInstance;
                testComponent = fixture.debugElement.componentInstance;
                inputElement = checkboxNativeElement.querySelector('input');
                labelElement = checkboxNativeElement.querySelector('label');
            });
        }));
        testing_1.it('should add and remove the checked state', function () {
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('md-checkbox-checked');
            expect(inputElement.checked).toBe(false);
            testComponent.isChecked = true;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxNativeElement.classList).toContain('md-checkbox-checked');
            expect(inputElement.checked).toBe(true);
            testComponent.isChecked = false;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('md-checkbox-checked');
            expect(inputElement.checked).toBe(false);
        });
        testing_1.it('should add and remove indeterminate state', function () {
            expect(checkboxNativeElement.classList).not.toContain('md-checkbox-checked');
            expect(inputElement.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(false);
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).toContain('md-checkbox-indeterminate');
            expect(inputElement.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(true);
            testComponent.isIndeterminate = false;
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).not.toContain('md-checkbox-indeterminate');
            expect(inputElement.checked).toBe(false);
            expect(inputElement.indeterminate).toBe(false);
        });
        testing_1.it('should toggle checked state on click', function () {
            expect(checkboxInstance.checked).toBe(false);
            labelElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            labelElement.click();
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
        });
        testing_1.it('should change from indeterminate to checked on click', function () {
            testComponent.isChecked = false;
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxInstance.indeterminate).toBe(true);
            checkboxInstance.onInteractionEvent({ stopPropagation: function () { } });
            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxInstance.indeterminate).toBe(false);
            checkboxInstance.onInteractionEvent({ stopPropagation: function () { } });
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(false);
            expect(checkboxInstance.indeterminate).toBe(false);
        });
        testing_1.it('should add and remove disabled state', function () {
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('md-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(true);
            expect(checkboxNativeElement.classList).toContain('md-checkbox-disabled');
            expect(inputElement.disabled).toBe(true);
            testComponent.isDisabled = false;
            fixture.detectChanges();
            expect(checkboxInstance.disabled).toBe(false);
            expect(checkboxNativeElement.classList).not.toContain('md-checkbox-disabled');
            expect(inputElement.tabIndex).toBe(0);
            expect(inputElement.disabled).toBe(false);
        });
        testing_1.it('should not toggle `checked` state upon interation while disabled', function () {
            testComponent.isDisabled = true;
            fixture.detectChanges();
            checkboxNativeElement.click();
            expect(checkboxInstance.checked).toBe(false);
        });
        testing_1.it('should overwrite indeterminate state when checked is re-set', function () {
            testComponent.isIndeterminate = true;
            fixture.detectChanges();
            testComponent.isChecked = true;
            fixture.detectChanges();
            expect(checkboxInstance.checked).toBe(true);
            expect(checkboxInstance.indeterminate).toBe(false);
        });
        testing_1.it('should preserve the user-provided id', function () {
            expect(checkboxNativeElement.id).toBe('simple-check');
        });
        testing_1.it('should project the checkbox content into the label element', function () {
            var label = checkboxNativeElement.querySelector('.md-checkbox-label');
            expect(label.textContent.trim()).toBe('Simple checkbox');
        });
        testing_1.it('should make the host element a tab stop', function () {
            expect(inputElement.tabIndex).toBe(0);
        });
        testing_1.it('should add a css class to end-align the checkbox', function () {
            testComponent.alignment = 'end';
            fixture.detectChanges();
            expect(checkboxNativeElement.classList).toContain('md-checkbox-align-end');
        });
        testing_1.it('should emit a change event when the `checked` value changes', function () {
            // TODO(jelbourn): this *should* work with async(), but fixture.whenStable currently doesn't
            // know to look at pending macro tasks.
            // See https://github.com/angular/angular/issues/8389
            // As a short-term solution, use a promise (which jasmine knows how to understand).
            var promiseCompleter = new promise_completer_1.PromiseCompleter();
            checkboxInstance.change.subscribe(function () {
                promiseCompleter.resolve();
            });
            testComponent.isChecked = true;
            fixture.detectChanges();
            return promiseCompleter.promise;
        });
        describe('state transition css classes', function () {
            testing_1.it('should transition unchecked -> checked -> unchecked', function () {
                testComponent.isChecked = true;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList).toContain('md-checkbox-anim-unchecked-checked');
                testComponent.isChecked = false;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList).not.toContain('md-checkbox-anim-unchecked-checked');
                expect(checkboxNativeElement.classList).toContain('md-checkbox-anim-checked-unchecked');
            });
            testing_1.it('should transition unchecked -> indeterminate -> unchecked', function () {
                testComponent.isIndeterminate = true;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList)
                    .toContain('md-checkbox-anim-unchecked-indeterminate');
                testComponent.isIndeterminate = false;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList)
                    .not.toContain('md-checkbox-anim-unchecked-indeterminate');
                expect(checkboxNativeElement.classList)
                    .toContain('md-checkbox-anim-indeterminate-unchecked');
            });
            testing_1.it('should transition indeterminate -> checked', function () {
                testComponent.isIndeterminate = true;
                fixture.detectChanges();
                testComponent.isChecked = true;
                fixture.detectChanges();
                expect(checkboxNativeElement.classList).not.toContain('md-checkbox-anim-unchecked-indeterminate');
                expect(checkboxNativeElement.classList).toContain('md-checkbox-anim-indeterminate-checked');
            });
            testing_1.it('should not apply transition classes when there is no state change', function () {
                testComponent.isChecked = checkboxInstance.checked;
                fixture.detectChanges();
                expect(checkboxNativeElement).not.toMatch(/^md\-checkbox\-anim/g);
                testComponent.isIndeterminate = checkboxInstance.indeterminate;
                expect(checkboxNativeElement).not.toMatch(/^md\-checkbox\-anim/g);
            });
            testing_1.it('should not initially have any transition classes', function () {
                expect(checkboxNativeElement).not.toMatch(/^md\-checkbox\-anim/g);
            });
        });
    });
    describe('with change event and no initial value', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var checkboxInstance;
        var testComponent;
        var inputElement;
        var labelElement;
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(CheckboxWithChangeEvent).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                checkboxInstance = checkboxDebugElement.componentInstance;
                testComponent = fixture.debugElement.componentInstance;
                inputElement = checkboxNativeElement.querySelector('input');
                labelElement = checkboxNativeElement.querySelector('label');
            });
        }));
        testing_1.it('should call the change event on first change after initialization', testing_1.fakeAsync(function () {
            fixture.detectChanges();
            expect(testComponent.lastEvent).toBeUndefined();
            checkboxInstance.checked = true;
            fixture.detectChanges();
            testing_1.tick();
            expect(testComponent.lastEvent.checked).toBe(true);
        }));
        testing_1.it('should not emit a DOM event to the change output', testing_1.async(function () {
            fixture.detectChanges();
            expect(testComponent.lastEvent).toBeUndefined();
            // Trigger the click on the inputElement, because the input will probably
            // emit a DOM event to the change output.
            inputElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                // We're checking the arguments type / emitted value to be a boolean, because sometimes the
                // emitted value can be a DOM Event, which is not valid.
                // See angular/angular#4059
                expect(testComponent.lastEvent.checked).toBe(true);
            });
        }));
    });
    describe('with provided aria-label ', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var inputElement;
        testing_1.it('should use the provided aria-label', testing_1.async(function () {
            builder.createAsync(CheckboxWithAriaLabel).then(function (f) {
                fixture = f;
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                inputElement = checkboxNativeElement.querySelector('input');
                fixture.detectChanges();
                expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
            });
        }));
    });
    describe('with provided aria-labelledby ', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var inputElement;
        testing_1.it('should use the provided aria-labelledby', testing_1.async(function () {
            builder.createAsync(CheckboxWithAriaLabelledby).then(function (f) {
                fixture = f;
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                inputElement = checkboxNativeElement.querySelector('input');
                fixture.detectChanges();
                expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
            });
        }));
        testing_1.it('should not assign aria-labelledby if none is provided', testing_1.async(function () {
            builder.createAsync(SingleCheckbox).then(function (f) {
                fixture = f;
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                inputElement = checkboxNativeElement.querySelector('input');
                fixture.detectChanges();
                expect(inputElement.getAttribute('aria-labelledby')).toBe(null);
            });
        }));
    });
    describe('with provided tabIndex', function () {
        var checkboxDebugElement;
        var checkboxNativeElement;
        var testComponent;
        var inputElement;
        var labelElement;
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(CheckboxWithTabIndex).then(function (f) {
                fixture = f;
                fixture.detectChanges();
                testComponent = fixture.debugElement.componentInstance;
                checkboxDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
                checkboxNativeElement = checkboxDebugElement.nativeElement;
                inputElement = checkboxNativeElement.querySelector('input');
                labelElement = checkboxNativeElement.querySelector('label');
            });
        }));
        testing_1.it('should preserve any given tabIndex', testing_1.async(function () {
            expect(inputElement.tabIndex).toBe(7);
        }));
        testing_1.it('should preserve given tabIndex when the checkbox is disabled then enabled', function () {
            testComponent.isDisabled = true;
            fixture.detectChanges();
            testComponent.customTabIndex = 13;
            fixture.detectChanges();
            testComponent.isDisabled = false;
            fixture.detectChanges();
            expect(inputElement.tabIndex).toBe(13);
        });
    });
    describe('with multiple checkboxes', function () {
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(MultipleCheckboxes).then(function (f) {
                fixture = f;
                fixture.detectChanges();
            });
        }));
        testing_1.it('should assign a unique id to each checkbox', function () {
            var _a = fixture.debugElement.queryAll(platform_browser_1.By.directive(checkbox_1.MdCheckbox))
                .map(function (debugElement) { return debugElement.nativeElement.querySelector('input').id; }), firstId = _a[0], secondId = _a[1];
            expect(firstId).toBeTruthy();
            expect(secondId).toBeTruthy();
            expect(firstId).not.toEqual(secondId);
        });
    });
    describe('with ngModel and ngControl', function () {
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(CheckboxWithFormDirectives).then(function (f) {
                f.detectChanges();
                fixture = f;
            });
        }));
        testing_1.it('should be in pristine, untouched, and valid states initially', testing_1.fakeAsync(function () {
            testing_1.flushMicrotasks();
            var checkboxElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
            var ngControl = checkboxElement.injector.get(common_1.NgControl);
            expect(ngControl.valid).toBe(true);
            expect(ngControl.pristine).toBe(true);
            expect(ngControl.touched).toBe(false);
            // TODO(jelbourn): test that `touched` and `pristine` state are modified appropriately.
            // This is currently blocked on issues with async() and fakeAsync().
        }));
    });
    describe('with name attribute', function () {
        testing_1.beforeEach(testing_1.async(function () {
            builder.createAsync(CheckboxWithNameAttribute).then(function (f) {
                f.detectChanges();
                fixture = f;
            });
        }));
        testing_1.it('should forward name value to input element', testing_1.fakeAsync(function () {
            var checkboxElement = fixture.debugElement.query(platform_browser_1.By.directive(checkbox_1.MdCheckbox));
            var inputElement = checkboxElement.nativeElement.querySelector('input');
            expect(inputElement.getAttribute('name')).toBe('test-name');
        }));
    });
});
/** Simple component for testing a single checkbox. */
var SingleCheckbox = (function () {
    function SingleCheckbox() {
        this.alignment = 'start';
        this.isChecked = false;
        this.isIndeterminate = false;
        this.isDisabled = false;
        this.parentElementClicked = false;
        this.parentElementKeyedUp = false;
        this.lastKeydownEvent = null;
    }
    SingleCheckbox = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox],
            template: "\n  <div (click)=\"parentElementClicked = true\" (keyup)=\"parentElementKeyedUp = true\">    \n    <md-checkbox \n        id=\"simple-check\"\n        [align]=\"alignment\"\n        [checked]=\"isChecked\" \n        [indeterminate]=\"isIndeterminate\" \n        [disabled]=\"isDisabled\"\n        (change)=\"changeCount = changeCount + 1\">\n      Simple checkbox\n    </md-checkbox>\n  </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], SingleCheckbox);
    return SingleCheckbox;
}());
/** Simple component for testing an MdCheckbox with ngModel and ngControl. */
var CheckboxWithFormDirectives = (function () {
    function CheckboxWithFormDirectives() {
        this.isGood = false;
    }
    CheckboxWithFormDirectives = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox, common_1.FORM_DIRECTIVES, common_1.NgModel],
            template: "\n    <form>\n      <md-checkbox ngControl=\"cb\" [(ngModel)]=\"isGood\">Be good</md-checkbox>\n    </form>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxWithFormDirectives);
    return CheckboxWithFormDirectives;
}());
/** Simple test component with multiple checkboxes. */
var MultipleCheckboxes = (function () {
    function MultipleCheckboxes() {
    }
    MultipleCheckboxes = __decorate([
        core_1.Component(({
            directives: [checkbox_1.MdCheckbox],
            template: "\n    <md-checkbox>Option 1</md-checkbox>\n    <md-checkbox>Option 2</md-checkbox>\n  "
        })), 
        __metadata('design:paramtypes', [])
    ], MultipleCheckboxes);
    return MultipleCheckboxes;
}());
/** Simple test component with tabIndex */
var CheckboxWithTabIndex = (function () {
    function CheckboxWithTabIndex() {
        this.customTabIndex = 7;
        this.isDisabled = false;
    }
    CheckboxWithTabIndex = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox],
            template: "\n    <md-checkbox [tabindex]=\"customTabIndex\" [disabled]=\"isDisabled\">\n    </md-checkbox>",
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxWithTabIndex);
    return CheckboxWithTabIndex;
}());
/** Simple test component with an aria-label set. */
var CheckboxWithAriaLabel = (function () {
    function CheckboxWithAriaLabel() {
    }
    CheckboxWithAriaLabel = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox],
            template: "<md-checkbox aria-label=\"Super effective\"></md-checkbox>"
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxWithAriaLabel);
    return CheckboxWithAriaLabel;
}());
/** Simple test component with an aria-label set. */
var CheckboxWithAriaLabelledby = (function () {
    function CheckboxWithAriaLabelledby() {
    }
    CheckboxWithAriaLabelledby = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox],
            template: "<md-checkbox aria-labelledby=\"some-id\"></md-checkbox>"
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxWithAriaLabelledby);
    return CheckboxWithAriaLabelledby;
}());
/** Simple test component with name attribute */
var CheckboxWithNameAttribute = (function () {
    function CheckboxWithNameAttribute() {
    }
    CheckboxWithNameAttribute = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox],
            template: "<md-checkbox name=\"test-name\"></md-checkbox>"
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxWithNameAttribute);
    return CheckboxWithNameAttribute;
}());
/** Simple test component with change event */
var CheckboxWithChangeEvent = (function () {
    function CheckboxWithChangeEvent() {
    }
    CheckboxWithChangeEvent = __decorate([
        core_1.Component({
            directives: [checkbox_1.MdCheckbox],
            template: "<md-checkbox (change)=\"lastEvent = $event\"></md-checkbox>"
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxWithChangeEvent);
    return CheckboxWithChangeEvent;
}());
//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/components/checkbox/checkbox.spec.js.map