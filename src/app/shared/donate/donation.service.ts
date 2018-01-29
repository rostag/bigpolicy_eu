import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

import { DonationModel } from './donation.model';

/**
 * Provides the donation service with methods to create, read, update and delete models.
 * Forwards donation requests to liqpay
 */
@Injectable()
export class DonationService {

  private apiUrl = environment.api_url + '/api/donation-api/';

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
   * Gets page of donations for given target type and ID
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getDonationsPage(donationId = null, targetId = null, targetType = 'leader', page = null, limit = null, dbQuery = '{}'): Observable<any> {
    // FIXME Implement interface for three types of targets
    let requestUrl;

    // Page of Donations for Target:     /api/donation-api/target/:targetType/:targetId/page/:page/:limit
    if (targetId !== null && targetType !== null && page !== null && limit !== null) {
      requestUrl =
        this.apiUrl + 'target/' + targetType + '/' + targetId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    console.log('Donation Service: get by', requestUrl);

    const responseObservable = this.http.get(requestUrl)
      .map((responsePage: Response) => {
        const donations = responsePage.json();
        return donations;
      });
      return responseObservable;
  }

  /**
   * Get a model from DB or from cache.
   */
  getDonation(donationId: string): Observable<Response> {
    return this.getDonationsPage(donationId);
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

}
