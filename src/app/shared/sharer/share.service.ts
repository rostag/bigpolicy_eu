import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { ProjectModel } from '../project/project.model'

/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ShareService {

  private mailApiUrl = '/mail-api/';

  /**
   * Contains the currently pending request.
   * @type {Observable<ProjectModel[]>}
   */
  private request;

  /**
   * Creates a new ShareService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
  }

  /**
   * Shares a model
   * @param ProjectModel A Project to share
   */
  shareProject(model: ProjectModel): Observable<Response> {
    var body: string = encodeURIComponent(JSON.stringify(model));
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.mailApiUrl + 'share', body, options).map(res => res.json())

    // TODO: Upsert project in DB:
    // project.events.push({'type': 'share'});
  }

  private handleError(error: Response) {
      console.error("Error occured:", error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
