import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

/**
 * This class provides the LeaderList service with methods to read names and add names.
 */
@Injectable()
export class LeaderListService {

  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  names: string[] = [];

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request: Observable<string[]>;

  /**
   * Creates a new LeaderListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get() {
    let d = '';
    this.http.get('http://localhost:4200/leader-api')
      .map( ( res : Response ) => {
        console.log('RES: ', res);
        return res.json()
      })
      .subscribe(
        data => d = data,
        err => this.logError(err),
        () => console.log('getLeaders Complete ', d)
      );
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  private processResponse(data) {
    console.log('Process reponse:', data)
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value - The name to add.
   */
  add(value: string): void {
    var body: string = JSON.stringify({
      "name": "Name of Leader",
      "surName": "Surname of leader",
      "parentName": "2",
      "vision": "4",
      "mission": "5",
      "photo": "6",
      "video": "7",
      "logo": "8",
      "party": 9,
      "officialPost": "10",
      "socialNetworks": "11",
      "skills": "12",
      "docActionPlan": "13",
      "docElectionProgram": "14",
      "docPropertyDeclaration": "15",
      "docCriminalRecord": "16",
      "docCorruptionRecord": "17",
      "docPassport": "18"
    });

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

}
