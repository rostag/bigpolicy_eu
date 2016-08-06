import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {

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
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    if (this.names && this.names.length) {
      return Observable.from([this.names]);
    }
    if (!this.request) {
      this.request = this.http.get('/assets/data.json')
        .map((response: Response) => response.json())
        .map((data: string[]) => {
          this.request = null;
          return this.names = data;
        });
    }
    return this.request;
  }

  create(): void {
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
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });

    console.log('request: ', body);
    // if (!this.request) {
    //   this.http.post('leader-api', body, options)
    //     .map((response: Response) => response.json())
    //     .map((data: string[]) => {
    //       this.request = null;
    //       console.log('data: ', data);
    //       return data;
    //     });
    // }
    // return this.request;

    this.http.post('http://localhost:4200/leader-api', body, options)
        .map(res => res.json())
        .subscribe(
          data => this.processResponse(data),
          err => (err) => console.error('Data send error: ', err),
          () => console.log('Data sent')
        );
  }

  private processResponse(data) {
    console.log('Process reponse:', data)
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value - The name to add.
   */
  add(value: string): void {
    this.names.push(value);
  }
}
