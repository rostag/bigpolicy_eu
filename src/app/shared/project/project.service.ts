import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { ProjectModel } from './project.model'

/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectService {

  private apiUrl = '/project-api/';

  /**
   * The array of initial projects provided by the service.
   * @type {Array}
   */
  projects;

  /**
   * Contains the currently pending request.
   * @type {Observable<ProjectModel[]>}
   */
  private request;

  /**
   * Creates a new ProjectService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {

    this.projects = [];

    // console.log('project list service CONSTRUCTOR');

  }

  /**
   * Creates the Project.
   * @param {ProjectModel} model - The Project to create.
   */
  createProject(model: ProjectModel): Observable<Response> {
    var body: string = model.toString();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl, body, options)
        .map(res => res.json())
  }

  /**
   * Get all models from DB
   * Returns an Observable for the HTTP GET request.
   * If there was a previous successful request
   * (the local models array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  getProjects(modelId: string = ''): Observable<Response> {
    if (this.projects && this.projects.length) {
      return Observable.from([this.projects]);
    }

    if (!this.request) {
      this.request = this.http.get(this.apiUrl + modelId)
        .map((res:Response) => {
          this.projects = res.json()
          if (this.projects.forEach) {
            this.projects.forEach((project) => {
              project.dateStarted = new Date(project['dateStarted'])
              project.dateEnded = new Date(project['dateEnded'])
            })
          }
          else {
            this.projects.dateStarted = new Date(this.projects['dateStarted'])
            this.projects.dateEnded = new Date(this.projects['dateEnded'])
          }
          // console.log('Projects loaded, response: ', this.projects)
          return this.projects
        })
    }
    return this.request;

    // return this.http.get(this.apiUrl).map((res:Response) => res.json());
  }

  /**
   * Get a model from DB or from cache.
   */
  getProject(modelId: string): Observable<Response> {
    return this.getProjects(modelId)
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param ProjectModel A Project to update
   */
  updateProject(model:ProjectModel):Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.apiUrl + model._id, model.toString(), {headers: headers})
        .map(res => res.json())
        .catch(this.handleError)
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param ProjectModel A Project to delete
   */
  deleteProject(model:ProjectModel) {
    this.http.delete(this.apiUrl + model._id)
        .map(res => console.log('Project deleted:', res.json()))
        .catch(this.handleError)
        .subscribe((res) => {});
  }

  private handleError(error: Response) {
      console.error("Error occured:", error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
