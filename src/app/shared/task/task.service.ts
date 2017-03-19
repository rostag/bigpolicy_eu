import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { TaskModel } from './task.model';

/**
 * This class provides the TaskList service with methods to get and save tasks.
 */
@Injectable()
export class TaskService {

  private apiUrl = '/task-api/';

  /**
   * Creates a new TaskService with the injected Http
   */
  constructor(private http: Http) { }

  /**
   * Creates new Task in DB
   * @param {TaskModel} model Task model to create.
   */
  createTask(model: TaskModel): Observable<Response> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl, body, options)
        .map(res => res.json());
  }

  // TODO: implement local cache

  /**
   * Gets tasks page from DB by given taskId, projectId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getTasksPage(taskId = null, projectId = null, page = null, limit = null): Observable<Response> {

    // All tasks:                    /task-api/
    let requestUrl = this.apiUrl;

    // Task by id:                   /task-api/:taskId
    if (taskId) {
      requestUrl = this.apiUrl + taskId;
    }
    // Page of tasks:                /task-api/page/:page/:limit
    if (page !== null && limit !== null) {
      requestUrl = this.apiUrl + 'page/' + page + '/' + limit;
    }
    // All Tasks for Leader:         /task-api/project/:projectId/
    if (projectId) {
      requestUrl = this.apiUrl + 'project/' + projectId;
    }
    // Page of tasks for Leader:     /task-api/project/:projectId/page/:page/:limit
    if (page !== null && limit !== null && projectId !== null) {
      requestUrl = this.apiUrl + 'project/' + projectId + '/page/' + page + '/' + limit;
    }

    console.log('getTasksPage:', taskId, projectId, page, limit);

    return this.http.get(requestUrl)
      .map((responsePage: Response) => {
        console.log('Tasks Page loaded, response: ', responsePage);
        return responsePage.json();
      });
  }

  /**
   * Returns single Task from DB, reuses getTasksPage.
   */
  getTask(taskId: string): Observable<Response> {
    return this.getTasksPage(taskId);
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param TaskModel A Task to update
   */
  updateTask(model: TaskModel): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.apiUrl + model._id, model.toString(), {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param TaskModel A Task to delete
   */
  deleteTask(model: TaskModel) {
    this.http.delete(this.apiUrl + model._id)
        .map(res => console.log('Task deleted:', res.json()))
        .catch(this.handleError)
        .subscribe();
  }

  private handleError(error: Response) {
      console.error('Error occured:', error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
