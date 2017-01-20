import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { DonationModel } from './donation.model';

/**
 * Provides the Leader service with methods to create, read, update and delete models.
 */
@Injectable()
export class DonationService {

  private apiUrl = '/liqpay-api/';

  /**
   * Creates a new DonationService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
    console.log('DonationService Constructor')
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param LeaderModel A Leader to delete
   */
  donateLeader(model:DonationModel) {

    console.log('Donate leader: ', model._id);

    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + '/donate', body, options)
        .map(res => console.log('Leader donated:', res.json()))
        .catch(this.handleError)
        .subscribe((res) => {});
  }

  private handleError(error: Response) {
      console.error("Error occured:", error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
