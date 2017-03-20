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
  getDonationsPage(donationId = null, targetId = null, targetType = 'leader', page = null, limit = null): Observable<any> {

    // FIXME Implement interface and adopt three types of targets
    // const requestUrl = this.apiUrl + (targetId ? 'target/' + targetType + '/' + targetId : donationId);

    // All donations:                    /liqpay-api/
    let requestUrl = this.apiUrl;

    // Donation by id:                   /liqpay-api/target/:targetType/:targetId
    if (donationId) {
      requestUrl = this.apiUrl + donationId;
    }
    // Page of donations:                /liqpay-api/page/:page/:limit
    if (page !== null && limit !== null) {
      requestUrl = this.apiUrl + 'page/' + page + '/' + limit;
    }
    // All Donations for Target:         /liqpay-api/target/:targetType/:targetId
    if (targetId !== null && targetType !== null) {
      requestUrl = this.apiUrl + 'target/' + targetType + '/' + targetId;
    }
    // Page of Donations for Target:     /liqpay-api/target/:targetType/:targetId/page/:page/:limit
    if (targetId !== null && targetType !== null && page !== null && limit !== null) {
      requestUrl = this.apiUrl + 'target/' + targetType + '/' + targetId + '/page/' + page + '/' + limit;
    }

    // console.log('Donation Service: get by:', projectId, leaderId, page, limit);

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
