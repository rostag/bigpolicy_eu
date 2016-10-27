import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { TaskModel } from './task.model'

/**
 * This class provides the TaskList service with methods to get and save tasks.
 */
@Injectable()
export class TaskService {

  private apiUrl = '/task-api/';

  /**
   * The array of initial tasks provided by the service.
   * @type {Array}
   */
  tasks;

  /**
   * Contains the currently pending request.
   * @type {Observable<TaskModel[]>}
   */
  private request;

  /**
   * Creates a new TaskService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
    this.tasks = [];
  }

  /**
   * Creates the Task.
   * @param {TaskModel} model - The Task to create.
   */
  createTask(model: TaskModel): Observable<Response> {
    var body: string = encodeURIComponent(model.toString());
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
  getTasks(modelId: string = '', projectId: string = ''): Observable<Response> {
    if (this.tasks && this.tasks.length) {
      return Observable.from([this.tasks]);
    }

    if (!this.request) {
      this.request = this.http.get(this.apiUrl + modelId + '/' + projectId)
        .map((res:Response) => {
          this.tasks = res.json()
          if (this.tasks.forEach) {
            this.tasks.forEach((task) => {
              task.dateStarted = new Date(task['dateStarted'])
              task.dateEnded = new Date(task['dateEnded'])
            })
          }
          else {
            this.tasks.dateStarted = new Date(this.tasks['dateStarted'])
            this.tasks.dateEnded = new Date(this.tasks['dateEnded'])
          }
          // console.log('Tasks loaded, response: ', this.tasks)
          return this.tasks
        })
    }
    return this.request;

    // return this.http.get(this.apiUrl).map((res:Response) => res.json());
  }

  /**
   * Get a model from DB or from cache.
   */
  getTask(modelId: string): Observable<Response> {
    return this.getTasks(modelId)
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param TaskModel A Task to update
   */
  updateTask(model:TaskModel):Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.apiUrl + model._id, model.toString(), {headers: headers})
        .map(res => res.json())
        .catch(this.handleError)
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param TaskModel A Task to delete
   */
  deleteTask(model:TaskModel) {
    this.http.delete(this.apiUrl + model._id)
        .map(res => console.log('Task deleted:', res.json()))
        .catch(this.handleError)
        .subscribe((res) => {});
  }

  private handleError(error: Response) {
      console.error("Error occured:", error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
