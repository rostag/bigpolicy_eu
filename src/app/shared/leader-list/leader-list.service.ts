import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { LeaderModel } from './leader.model.ts';

/**
 * This class provides the LeaderList service with methods to read names and add names.
 */
@Injectable()
export class LeaderListService {

  private leadersUrl = '/leader-api/';

  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  names: string[] = [];

  leaders;

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request;

  /**
   * Creates a new LeaderListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  public getLds (): Observable<any> {
    return this.http.get(this.leadersUrl)
                    .map(this.extractData)
                    // .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json()
    console.log('res:', res)
    return body.data || { }
  }

  getLeaders(leadersHandler:Function) {
    var ls;
    var rs = this.http.get(this.leadersUrl)
      .map((res:Response) => res.json())
      .subscribe(
        data => this.saveData(leadersHandler, data),
        err => console.error(err),
        () => {
          console.log('getLeaders:', this.leaders)
          ls = this.leaders
          return ls
        }
      );
      return rs
  }

  private saveData(leadersHandler, data) {
    this.leaders = data;
    leadersHandler( data );
    console.log('saveData:', data);
    return data;
  }

  private logError(error) {
    console.error('logError:', error);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get() {
    var d;
    if (this.names && this.names.length) {
      return Observable.from([this.names]);
    }
    if (!this.request) {
      this.request = this.http.get('http://localhost:4200/leader-api')
        .map( ( res : Response ) => {
          d = res.json();
          console.log('RES: ', d);
          return d
        })
        .subscribe(
          data => d = data,
          err => this.logError(err),
          () => console.log('getLeaders Complete ', d)
        );
    }
    // console.log('d=', d);
    return this.request;
  }

  getl() {
    var d;
    if (this.leaders && this.leaders.length) {
      return Observable.from([this.leaders]);
    }
    if (!this.request) {
      this.request = this.http.get('http://localhost:4200/leader-api')
        .map( ( res : Response ) => {
          d = res.json();
          console.log('RES: ', d);
          return d
        })
        .subscribe(
          data => this.leaders = data,
          err => this.logError(err),
          () => console.log('getLeaders Complete ', this.leaders)
        );
    }
    // console.log('d=', d);
    return this.request;
  }

  private processResponse(data) {
    console.log('Process reponse:', data)
  }

  // FIXME: Complete form processing
  /**
   * Adds the given name to the array of names.
   * @param {string} value - The name to add.
   */
  add(leader: LeaderModel): void {
    var body: string = leader.toString();

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:4200/leader-api', body, options)
        .map(res => res.json())
        .subscribe(
          data => this.processResponse(data),
          err => (err) => console.error('Data send error: ', err),
          () => console.log('Data sent')
        );
  }

  /**
   * Performs a request with delete http method.
   */
  deleteLeader(leader:LeaderModel) {
    console.log('service, deleteLeader:', leader._id);

    this.http.delete(this.leadersUrl + leader._id)
        .map(res => console.log('DELETED:', res.json()))
        .catch(this.handleError)
        .subscribe((res) => {});
  }

  private handleError(error: Response) {
      console.error("HANDLERERROR:", error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
