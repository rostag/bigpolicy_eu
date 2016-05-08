import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from 'angular2/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {LeadersComponent} from '../leader/leader.component';

export function main() {
  describe('Leader component', () => {


    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Leader');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [LeadersComponent],
  template: '<sd-leader></sd-leader>'
})
class TestComponent {}
