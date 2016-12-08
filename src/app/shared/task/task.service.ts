import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
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
   * Creates a new TaskService with the injected AuthHttp
   */
  constructor(private http: AuthHttp) {

  }

  /**
   * Creates the Task
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

  // TODO: implement local cache

  /**
   * Get all models from DB by task id or project id
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getTasks(taskId: string = '', projectId: string = ''): Observable<any> {

    var requestUrl = this.apiUrl + (projectId ? 'project/' + projectId : taskId);

    console.info('Task Service: get by', requestUrl);

    var reponseObservable = this.http.get(requestUrl)
      .map((res: Response) => {
        let tasks = res.json();
        if (tasks.forEach) {
          tasks.forEach(task => this.convertTime(task))
        }
        else {
          this.convertTime(tasks)
        }
        return tasks
      })
      return reponseObservable;
  }

  private convertTime(task) {
    task.dateStarted = new Date(task['dateStarted']);
    task.dateEnded = new Date(task['dateEnded']);
  }

  /**
   * Get a model from DB or from cache.
   */
  getTask(taskId: string): Observable<Response> {
    return this.getTasks(taskId)
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param TaskModel A Task to update
   */
  updateTask(model: TaskModel): Observable<Response> {
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
  deleteTask(model: TaskModel) {
    this.http.delete(this.apiUrl + model._id)
        .map(res => console.log('Task deleted:', res.json()))
        .catch(this.handleError)
        .subscribe();
  }

  private handleError(error: Response) {
      console.error("Error occured:", error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
