import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TaskModel } from './task.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


/**
 * This class provides the TaskList service with methods to get and save tasks.
 */
@Injectable()
export class TaskService {

  private apiUrl = environment.api_url + '/api/task-api/';

  /**
   * Creates a new TaskService with the injected Http
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Creates new Task in DB
   * @param {TaskModel} model Task model to create.
   */
  // FIXME NG45 - get back to Observable<TaskModel>:
  // createTask(model: TaskModel): Observable<TaskModel> {
  createTask(model: TaskModel): Observable<any> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers: headers };

    return this.http.post(this.apiUrl, body, options)
      .map(res => {
        console.log('NG45 - createTask, response:', res);

        return res;
      });
  }

  // TODO: implement local cache

  /**
   * Gets tasks page from DB by given taskId, projectId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getTasksPage(taskId = null, projectId = null, page = null, limit = null, dbQuery = '{}'): Observable<TaskModel> {

    let requestUrl;

    // Task by ID :: api/task-api/:taskId
    if (taskId) {
      requestUrl = this.apiUrl + taskId;
    }

    // Page of Tasks :: api/task-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.apiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // Page of tasks for Project :: api/task-api/project/:projectId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && projectId !== null) {
      requestUrl = this.apiUrl + 'project/' + projectId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // console.log('get TasksPage:', taskId, projectId, page, limit, dbQuery);

    return this.http.get(requestUrl)
      // FIXME NG45 - get back to:  
      // .map((responsePage: Response) => {
      .map((responsePage: any) => {
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
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.apiUrl + model._id, model.toString(), { headers: headers })
      .map(res => {
        console.log('NG45 - updateTask, res:', res);
        return res;
      })
      .catch(this.handleError);
  }

  /**
   * Updates multiple tasks by performing a request with PUT HTTP method.
   * @param ids {Array} Task IDs to update
   * @param data {Object} The data to be applied during update in {field: name} format
   */
  bulkUpdateTasks(ids: Array<string>, data: any): Observable<TaskModel> {
    // TODO Consider encoding the body like in create project above
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids, data: data });
    // console.log('Tasks service, try to update:', ids, data, body);

    return this.http.put(this.apiUrl + 'bulk-update', body, { headers: headers })
      .map(res => {
        console.log('NG45 - bulkUpdateTasks, response:', res);
        return res;
      })
      .catch(this.handleError);
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param TaskModel A Task to delete
   */
  deleteTask(model: TaskModel) {
    this.http.delete(this.apiUrl + model._id)
      .map(res => {
        console.log('NG45 - Task deleted, res:', res);
        return res;
      })
      .catch(this.handleError)
      .subscribe();
  }

  /**
   * Deletes multiple Tasks by performing a request with PUT HTTP method.
   * @param ids Task IDs to delete
   */
  bulkDeleteTasks(ids: Array<string>): Observable<TaskModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids });
    console.log('Task service, try to delete:', ids, body);

    return this.http.put(this.apiUrl + 'bulk-delete', body, { headers: headers })
      .map(res => {
        console.log('NG45 - bulkDeleteTasks, res:', res);
        return res;
      }
      )
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error('Error occured:', error);
    return Observable.throw(error.json() || 'Server error');
  }
}
