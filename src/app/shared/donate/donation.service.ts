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
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireSign(model: DonationModel) {

    console.log('Get Signature for: ', model.toString());

    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'getsgndta', body, options)
      .map(res => console.log('Got sign:', res))
      .catch(this.handleError)
  }

  // FIXME UNUSED
  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireDonationForm(model: DonationModel) {

    console.log('Get Donation Form: ', model.toString());

    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'getform', body, options)
  }

  /**
   * Donates a leader
   * @param DonationModel A Donation to send
   */
  donateLeader(model: DonationModel) {

    console.log('Donate leader: ', model.toString());

    var body: string = encodeURIComponent(model.toString());
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'donate', body, options)
      .map(res => console.log('Leader donated:', res.json()))
      .catch(this.handleError)
      .subscribe((res) => {});
  }

  private handleError(error: Response) {
    console.error("Error occured:", error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
