import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomBrowserXhr } from './xhr';
import { Unsubscribable as AnonymousSubscription, TeardownLogic } from 'rxjs';

@Component({
  selector: 'app-working-progress',
  template: `<mat-progress-bar mode="indeterminate" [class.hidden]="!isVisible" color="accent"></mat-progress-bar>`,
  styleUrls: ['spinner.component.scss']
})
export class WorkingSpinnerComponent implements OnInit, OnDestroy {

  public isVisible: boolean;

  private _subscription: AnonymousSubscription;
  private _connectionCounter = 0;

  constructor( public browserXhr: CustomBrowserXhr ) {}

  ngOnInit() {
    this._subscription = this.browserXhr.observable.subscribe(next => {
    switch (next.type) {
      case 'open':
        this._connectionCounter++;
        break;
      case 'load':
        this._connectionCounter--;
        break;
      case 'progress':
        break;
      case 'abort':
        this._connectionCounter--;
        break;
      case 'error':
        this._connectionCounter--;
        break;
      }
      this.isVisible = this._connectionCounter > 0; // if larger 0, its visible! otherwise hide us
    });
  }

  ngOnDestroy(): void {
    if (!this._subscription) {
      return;
    };
    this._subscription.unsubscribe();
    this._subscription = null;
  }
}
