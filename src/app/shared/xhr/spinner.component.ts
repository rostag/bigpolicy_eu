import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomBrowserXhr } from './xhr';
import { AnonymousSubscription, TeardownLogic } from 'rxjs/Subscription';
import { HttpModule, BrowserXhr } from '@angular/http';

@Component({
    selector: 'app-working-spinner',
    template: `<md-progress-spinner mode="indeterminate" *ngIf="_visible"></md-progress-spinner>`,
    styleUrls: ['spinner.component.scss'],
    providers: [
    {
      provide: BrowserXhr,
      useExisting: CustomBrowserXhr
    }]
})
export class WorkingSpinnerComponent implements OnInit, OnDestroy {

    private _visible: boolean;
    private _subscription: AnonymousSubscription;
    private _connectionCounter = 0;

    constructor(public browserXhr: CustomBrowserXhr ) {
    }

    ngOnInit() {
        this._subscription = this.browserXhr.observable.subscribe(next => {
            console.log(next.type + ' next received in spinner');
            switch (next.type) {
                case 'open':
                    this._connectionCounter++;
                    break;
                case 'load':
                    this._connectionCounter--;
                    break;
                case 'abort':
                    this._connectionCounter--;
                    break;
                case 'error':
                    this._connectionCounter--;
                    break;
            }
            this._visible = this._connectionCounter > 0; // if larger 0, its visible! otherwise hide us
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
