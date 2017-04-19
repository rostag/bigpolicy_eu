import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {

    private _observable: Observable<any>;
    private _subscriber: Subscriber<any>;

    constructor() {
      console.log('Constructor: CustomBrowserXhr');
      super();
      this._observable = Observable.create(subscriber => {
          this._subscriber = subscriber;
      }).share();
    }

    get observable(): Observable<any> {
        return this._observable;
    }

    build(): any {
        const xhr = super.build();
        if (!this._subscriber) {
          return xhr;
        };

        // at the beginning, we create an event that notifies an opening of a connection
        this._subscriber.next({type: 'open', event: {}});

        xhr.onprogress = (event) => {
            this._subscriber.next({type: 'progress', event: event});
        };
        xhr.onload = (event) => {
            this._subscriber.next({type: 'load', event: event});
        };
        xhr.onerror = (event) => {
            this._subscriber.next({type: 'error', event: event});
        };
        xhr.onabort = (event) => {
            this._subscriber.next({type: 'abort', event: event});
        };

        return xhr;
    }

}
