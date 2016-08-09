import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { LeaderModel } from './leader.model.ts';

/**
 * This class provides the Leader service with methods to create, read, update and delete leaders.
 */
@Injectable()
export class LeaderService {

  private leadersUrl = '/leader-api/';

  /**
   * The array of leaders provided by the service.
   * @type {Array}
   */
  private leaders;

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request;

  /**
   * Creates a new LeaderService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Creates the Leader.
   * @param {LeaderModel} leader - The Leader to create.
   */
  createLeader(leader: LeaderModel): Observable<Response> {
    var body: string = leader.toString();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.leadersUrl, body, options)
        .map(res => res.json())
  }

  /**
   * Get all leaders from DB
   * Returns an Observable for the HTTP GET request.
   * If there was a previous successful request
   * (the local leaders array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  getLeaders(leaderId: string = ''): Observable<Response> {
    if (this.leaders && this.leaders.length) {
      return Observable.from([this.leaders]);
    }

    if (!this.request) {
      this.request = this.http.get(this.leadersUrl + leaderId)
        .map((res:Response) => {
          this.leaders = res.json()
          console.log('Leaders loaded, response: ', this.leaders)
          return this.leaders
        })
    }
    return this.request;

    // return this.http.get(this.leadersUrl).map((res:Response) => res.json());
  }

  /**
   * Get a leader from DB or from cache.
   */
  getLeader(leaderId: string): Observable<Response> {
    return this.getLeaders(leaderId)
  }

  /**
   * Updates a leader by performing a request with PUT HTTP method.
   * @param LeaderModel A Leader to update
   */
  updateLeader(leader:LeaderModel):Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.leadersUrl + leader._id, JSON.stringify(leader), {headers: headers})
        .map(res => res.json())
        .catch(this.handleError)
  }

  /**
   * Deletes a leader by performing a request with DELETE HTTP method.
   * @param LeaderModel A Leader to delete
   */
  deleteLeader(leader:LeaderModel) {
    this.http.delete(this.leadersUrl + leader._id)
        .map(res => console.log('Leader deleted:', res.json()))
        .catch(this.handleError)
        .subscribe((res) => {});
  }

  private handleError(error: Response) {
      console.error("Error occured:", error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
