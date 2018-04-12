import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { DonationModel } from './donation.model';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

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
      // FIXME: Get back to it: .map((responsePage: HttpResponse) => {
      .map((responsePage: any) => {
        const donations = responsePage;
        return donations;
      });
      return responseObservable;
  }

  /**
   * Get a model from DB or from cache.
   */
  // FIXME - NG45 Get back to:
  // getDonation(donationId: string): Observable<HttpResponse> {
  getDonation(donationId: string): Observable<any> {
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
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return {
      body: encodeURIComponent(model.toString()),
      // FIXME - NG45
      options: { headers: headers } 
    };
  }

}
