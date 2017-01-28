import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { DonationModel } from './donation.model';

/**
 * Provides the donation service with methods to create, read, update and delete models.
 * Forwards donation requests to liqpay
 */
@Injectable()
export class DonationService {

  private apiUrl = '/liqpay-api/';

  /**
   * Creates a new DonationService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Create a donation for target
   * @param DonationModel A Donation to create
   */
  createDonation(model: DonationModel) {
    console.log('Create Donation: ', model.toString());
    var p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'create-donation', p.body, p.options)
      .map(res => {})
      .catch(this.handleError)
      .subscribe((res) => {});
  }

  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireSign(model: DonationModel) {
    var p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'getsgndta', p.body, p.options)
  }

  // FIXME UNUSED
  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireDonationForm(model: DonationModel) {
    var p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'getliqform', p.body, p.options)
  }

  /**
   * Internal utility to get post data
   */
  private getPostData(model: DonationModel) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return {
      body: encodeURIComponent(model.toString()),
      options: new RequestOptions({ headers: headers })
    }
  }

  private handleError(error: Response) {
    console.error("Error occured:", error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
