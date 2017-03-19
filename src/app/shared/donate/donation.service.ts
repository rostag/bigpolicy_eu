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
    const p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'create-donation', p.body, p.options);
  }

  // TODO: implement local cache

  /**
   * Get all models from DB by donation id or target id
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getDonations(donationId = '', targetId = '', targetType = 'leader'): Observable<any> {

    // FIXME Implement interface and adopt three types of targets
    const requestUrl = this.apiUrl + (targetId ? 'target/' + targetType + '/' + targetId : donationId);

    console.log('Donation Service: get by', requestUrl);

    const reponseObservable = this.http.get(requestUrl)
      .map((res: Response) => {
        const donations = res.json();
        return donations;
      });
      return reponseObservable;
  }

  /**
   * Get a model from DB or from cache.
   */
  getDonation(donationId: string): Observable<Response> {
    return this.getDonations(donationId);
  }

  //////////////////////////////////////////////////////////////////////////////
  // LIQ
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireSign(model: DonationModel) {
    const p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'getsgndta', p.body, p.options);
  }

  /**
   * Internal utility to get post data
   */
  private getPostData(model: DonationModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return {
      body: encodeURIComponent(model.toString()),
      options: new RequestOptions({ headers: headers })
    };
  }

  // FIXME UNUSED
  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  // requireDonationForm(model: DonationModel) {
  //   var p = this.getPostData(model);
  //   return this.http.post(this.apiUrl + 'getliqform', p.body, p.options)
  // }
}
