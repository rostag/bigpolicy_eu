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

  // TODO: implement local cache

  /**
   * Get all models from DB by donation id or target id
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getDonations(donationId: string = '', targetId: string = '', targetType: string = 'leader'): Observable<any> {

    // FIXME Implement interface and adopt three types of targets
    var requestUrl = this.apiUrl + (targetId ? 'target/' + targetType + '/' + targetId : donationId);

    console.info('Donation Service: get by', requestUrl);

    var reponseObservable = this.http.get(requestUrl)
      .map((res: Response) => {
        let donations = res.json();
        if (donations.forEach) {
          donations.forEach(donation => this.convertTime(donation))
        }
        else {
          this.convertTime(donations)
        }
        return donations
      })
      return reponseObservable;
  }

  private convertTime(donation) {
    donation.dateStarted = new Date(donation['dateStarted']);
    donation.dateCompleted = new Date(donation['dateCompleted']);
  }

  /**
   * Get a model from DB or from cache.
   */
  getDonation(donationId: string): Observable<Response> {
    return this.getDonations(donationId)
  }

  //////////////////////////////////////////////////////////////////////////////
  // LIQ
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireSign(model: DonationModel) {
    var p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'getsgndta', p.body, p.options)
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

  // FIXME UNUSED
  /**
   * Requires donation form
   * @param DonationModel A Donation to send
   */
  requireDonationForm(model: DonationModel) {
    var p = this.getPostData(model);
    return this.http.post(this.apiUrl + 'getliqform', p.body, p.options)
  }
}
