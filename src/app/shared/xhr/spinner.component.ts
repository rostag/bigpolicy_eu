import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomBrowserXhr } from './xhr';
import { AnonymousSubscription, TeardownLogic } from 'rxjs/Subscription';

@Component({
  selector: 'app-working-progress',
  template: `<md-progress-bar mode="indeterminate" [class.hidden]="!isVisible" color="accent"></md-progress-bar>`,
  styleUrls: ['spinner.component.scss']
})
export class WorkingSpinnerComponent implements OnInit, OnDestroy {

  public isVisible: boolean;

  private _subscription: AnonymousSubscription;
  private _connectionCounter = 0;

  constructor( public browserXhr: CustomBrowserXhr ) {}

  ngOnInit() {
    this._subscription = this.browserXhr.observable.subscribe(next => {
    // console.log(next.type + ' next received in spinner');
    switch (next.type) {
      case 'open':
        this._connectionCounter++;
        break;
      case 'load':
        this._connectionCounter--;
        break;
      case 'progress':
        // console.log('PROGRESS:' , next, next.event.loaded, next.event.total);
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
