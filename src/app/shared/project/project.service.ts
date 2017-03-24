import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectModel } from './project.model';

/**
 * Provides ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectService {

  // TODO Implement caching
  static _cachedProjects = [];

  private projectApiUrl = '/project-api/';

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
   * @param {http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Creates new Project.
   * @param {ProjectModel} model Project to create.
   */
  createProject(model: ProjectModel): Observable<Response> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.projectApiUrl, body, options)
      .map(res => res.json()
    );
  }

  /**
   * Gets Projects page from DB by given projectId, leaderId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProjectsPage(projectId = null, leaderId = null, page = null, limit = null, dbQuery = '{}'): Observable<Response> {

    let requestUrl;

    // Project by ID :: project-api/:projectId
    if (projectId) {
      requestUrl = this.projectApiUrl + projectId;
    }

    // Page of Projects :: project-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.projectApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // Page of Projects for Leader :: project-api/leader/:leaderId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && leaderId !== null) {
      requestUrl = this.projectApiUrl + 'leader/' + leaderId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // OBSOLETE requestUrl = this.projectApiUrl;
    // OBSOLETE All Projects for Leader:         /project-api/leader/:leaderId/
    // if (leaderId) {
    //   requestUrl = this.projectApiUrl + 'leader/' + leaderId;
    // }

    // console.log('get Projects Page:', projectId, leaderId, page, limit);

    return this.http.get(requestUrl)
      .map((responsePage: Response) => {
        // console.log('Projects Page loaded, response: ', responsePage);
        return responsePage.json();
      });
  }

  /**
   * Returns single project from DB
   */
  getProject(projectId: string): Observable<Response> {
    return this.getProjectsPage(projectId);
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param ProjectModel A Project to update
   */
  updateProject(model: ProjectModel): Observable<Response> {
    // TODO Consider encoding the body like in create project above
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.projectApiUrl + model._id, model.toString(), {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Deletes a Project by performing a request with DELETE HTTP method.
   * @param ProjectModel Project to delete
   */
  deleteProject(model: ProjectModel) {
    this.http.delete(this.projectApiUrl + model._id)
      .map(res => console.log('Project deleted:', res.json()))
      .catch(this.handleError)
      .subscribe((res) => {});
  }

  private handleError(error: Response) {
    console.error('Error occured:', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
