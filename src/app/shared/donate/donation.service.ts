import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { DonationModel } from './donation.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) {
  }

  /**
   * Create a donation for target
   * @param model DonationModel A Donation to create
   */
  createDonation(model: DonationModel) {
    const p = this.getPostData(model);
    return this.http.post<string>(this.apiUrl + 'create-donation', p.body, p.options);
  }

  // TODO: implement local cache

  /**
   * Gets page of donations for given target type and ID
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getDonationsPage(
    donationId = null,
    targetId = null,
    targetType = 'leader',
    page = null, limit = null,
    dbQuery = '{}'
  ): Observable<DonationModel> {
    if (!!targetId && !!targetType && !!page && !!limit) {
      return this.http
        .get(`${this.apiUrl}target/${targetType}/${targetId}/page/${page}/${limit}/q/${encodeURIComponent(dbQuery)}`)
        .pipe(map((donations: DonationModel) => donations));
    }
  }

  /**
   * Get a model from DB or from cache.
   */
  getDonation(donationId: string): Observable<any> {
    return this.getDonationsPage(donationId);
  }

  //////////////////////////////////////////////////////////////////////////////
  // LIQ
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Requires donation form
   * @param model DonationModel A Donation to send
   */
  requireSign(model: DonationModel) {
    const p = this.getPostData(model);
    return this.http.post<string>(this.apiUrl + 'getsgndta', p.body, p.options);
  }

  /**
   * Internal utility to get post data
   */
  private getPostData(model: DonationModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return {
      body: encodeURIComponent(model.toString()),
      options: {headers: headers, responseType: 'text' as 'json'}
    };
  }

}
