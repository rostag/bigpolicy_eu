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
  constructor(
    private http: Http
  ) { }

  /**
   * Creates new Task in DB
   * @param {TaskModel} model Task model to create.
   */
  createTask(model: TaskModel): Observable<TaskModel> {
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
  getTasksPage(taskId = null, projectId = null, page = null, limit = null, dbQuery = '{}'): Observable<TaskModel> {

    let requestUrl;

    // Task by ID :: task-api/:taskId
    if (taskId) {
      requestUrl = this.apiUrl + taskId;
    }

    // Page of Tasks :: task-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.apiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // Page of tasks for Project :: task-api/project/:projectId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && projectId !== null) {
      requestUrl = this.apiUrl + 'project/' + projectId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // console.log('get TasksPage:', taskId, projectId, page, limit, dbQuery);

    return this.http.get(requestUrl)
    .map((responsePage: Response) => {
      // console.log('Tasks Page loaded, response: ', responsePage);
      return responsePage.json();
    });
  }

  /**
   * Returns single Task from DB, reuses get TasksPage.
   */
  getTask(taskId: string): Observable<TaskModel> {
    // FIXME Request cached / Load project data to populate on loaded task
    return this.getTasksPage(taskId);
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param TaskModel A Task to update
   */
  updateTask(model: TaskModel): Observable<TaskModel> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.apiUrl + model._id, model.toString(), {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Updates multiple tasks by performing a request with PUT HTTP method.
   * @param ids {Array} Task IDs to update
   * @param data {Object} The data to be applied during update in {field: name} format
   */
  bulkUpdateTasks(ids: Array<string>, data: any): Observable<TaskModel> {
    // TODO Consider encoding the body like in create project above
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids, data: data });
    console.log('Tasks service, try to update:', ids, data, body);

    return this.http.put(this.apiUrl + 'bulk-update', body, {headers: headers})
      .map( res => res.json() )
      .catch( this.handleError );
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

  /**
   * Deletes multiple Tasks by performing a request with PUT HTTP method.
   * @param ids Task IDs to delete
   */
  bulkDeleteTasks(ids: Array<string>): Observable<TaskModel> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids});
    console.log('Task service, try to delete:', ids, body);

    return this.http.put(this.apiUrl + 'bulk-delete', body, {headers: headers})
    .map(res => res.json() )
    .catch( this.handleError );
  }

  private handleError(error: Response) {
    console.error('Error occured:', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
