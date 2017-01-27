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
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireSign(model: DonationModel) {
    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'getsgndta', body, options)
  }

  // FIXME UNUSED
  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireDonationForm(model: DonationModel) {
    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'getliqform', body, options)
  }

  // TODO Rename to createDonation
  /**
   * Donates a target
   * @param DonationModel A Donation to send
   */
  donateTarget(model: DonationModel) {

    console.log('Donate target: ', model.toString());

    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'donate', body, options)
      .map(res => console.log('Target donated:', res.json()))
      .catch(this.handleError)
      .subscribe((res) => {});
  }

  private handleError(error: Response) {
    console.error("Error occured:", error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
