import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { ProjectModel } from './project.model';

/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectService {

  static _cachedProjects = [];

  private apiUrl = '/project-api/';

  static cacheProject(project) {
    this._cachedProjects[project._id] = project;
    // console.log('cache project: ', this._cachedProjects[project._id]);
  }

  static getCachedProject(projectId) {
    // console.log('get cached project by id:', projectId, ': ', this._cachedProjects[projectId]);
    return this._cachedProjects[projectId] || {};
  }

  /**
  * Creates a new ProjectService with the injected Http.
  * @param {Http} http - The injected Http.
  * @constructor
  */
  constructor(private http: Http) {}

  /**
   * Creates the Project.
   * @param {ProjectModel} model - The Project to create.
   */
  createProject(model: ProjectModel): Observable<Response> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl, body, options)
      .map(res => res.json());
  }

  /**
   * Get all projects from DB by given leaderId or projectId
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProjectsPage(projectId = null, leaderId = null, offset = null, limit = null): Observable<Response> {

    // FIXME
    /*
      WAS: const requestUrl = this.apiUrl + (leaderId ? 'leader/' + leaderId : projectId);

      All projects:
        /project-api/
      Project by id:
        /project-api/:projectId
      Projects for Leader:
        /project-api/leader/:leaderId/
    */

    console.log('getProjectsPage:', projectId, leaderId, offset, limit);

    // All projects:                    /project-api/
    let requestUrl = this.apiUrl;

    // Project by id:                   /project-api/:projectId
    if (projectId) {
      requestUrl = this.apiUrl + projectId;
    }

    // Projects for Leader:             /project-api/leader/:leaderId/
    if (leaderId) {
      requestUrl = this.apiUrl + 'leader/' + leaderId;
    }

    // Page of projects:                /project-api/page/:offset/:limit
    if (offset !== null && limit !== null) {
      requestUrl = this.apiUrl + 'page/' + offset + '/' + limit;
    }

    // TODO:
    // Page of projects for a Leader:   /project-api/leader/page/:offset/:limit
    // OR:
    // Page of projects for a Leader:   /project-api/page/leader/:offset/:limit

    const reponseObservable = this.http.get(requestUrl)
      .map((res: Response) => {
        let result;
        // Converting too early?
        const response = res.json();
        if (response.docs && response.docs.forEach) {
          response.docs.forEach(project => this.convertTime(project));
          result = response.docs;
        } else {
          this.convertTime(response);
          result = response;
        }
        // console.log('Projects loaded, response: ', response);
        return result;
      });
    return reponseObservable;
  }

  private convertTime(task) {
    task.dateStarted = new Date(task['dateStarted']);
    task.dateEnded = new Date(task['dateEnded']);
  }

  /**
   * Get a model from DB or from cache.
   */
  getProject(projectId: string): Observable<Response> {
    return this.getProjectsPage(projectId);
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param ProjectModel A Project to update
   */
  updateProject(model: ProjectModel): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.apiUrl + model._id, model.toString(), {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param ProjectModel A Project to delete
   */
  deleteProject(model: ProjectModel) {
    this.http.delete(this.apiUrl + model._id)
        .map(res => console.log('Project deleted:', res.json()))
        .catch(this.handleError)
        .subscribe((res) => {});
  }

  private handleError(error: Response) {
      console.error('Error occured:', error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
