import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { ITaskState, getTasksState } from '../../state/reducers/task.reducers';
import { LoadTasksSuccess, CreateTaskSuccess, LoadTaskSuccess } from '../../state/actions/task.actions';
import { ITask, ITaskResponsePage } from '../../common/models';

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
    private http: HttpClient,
    private taskStore: Store<ITaskState>
  ) { }

  /**
   * Creates new Task in DB
   * @param {ITask} model Task model to create.
   */
  // FIXME NG45 - get back to Observable<ITask>:
  // createTask(model: ITask): Observable<ITask> {
  createTask(model: ITask): Observable<any> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.apiUrl, body, { headers: headers })
      .map(res => {
        console.log('NG45 - createTask, response:', res);
        this.taskStore.dispatch(new CreateTaskSuccess(res));
        return res;
      });
  }

  // TODO: implement local cache

  /**
   * Gets tasks page from DB by given taskId, projectId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getTasksPage(taskId = null, projectId = null, page = null, limit = null, dbQuery = '{}'): Observable<ITaskResponsePage> {

    let requestUrl;

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
      .map((responsePage: ITaskResponsePage) => {
        // console.log('Tasks Page loaded, response: ', responsePage);
        this.taskStore.dispatch(new LoadTasksSuccess(responsePage));

        return responsePage;
      });
  }

  /**
   * Returns single Task from DB, reuses get TasksPage by ID :: api/task-api/:taskId
   * FIXME Request cached / Load project data to populate on loaded task
   */
  getTask(taskId: string): Observable<ITask> {
    return this.http.get<ITask>(this.apiUrl + taskId);
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param ITask A Task to update
   */
  updateTask(model: ITask): Observable<ITask> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.apiUrl + model._id, model.toString(), { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - updateTask, res:', res);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Updates multiple tasks by performing a request with PUT HTTP method.
   * @param ids {Array} Task IDs to update
   * @param data {Object} The data to be applied during update in {field: name} format
   */
  bulkUpdateTasks(ids: Array<string>, data: any): Observable<ITask> {
    // TODO Consider encoding the body like in create project above
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids, data: data });
    // console.log('Tasks service, try to update:', ids, data, body);

    return this.http.put(this.apiUrl + 'bulk-update', body, { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - bulkUpdateTasks, response:', res);
          return res;
        }),
        catchError(this.handleError)
      )
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param ITask A Task to delete
   */
  deleteTask(model: ITask) {
    return this.http.delete(this.apiUrl + model._id)
      .pipe(
        map(res => {
          console.log('NG45 - Task deleted, res:', res);
          return res;
        }),
        catchError(this.handleError)
      )
  }

  /**
   * Deletes multiple Tasks by performing a request with PUT HTTP method.
   * @param ids Task IDs to delete
   */
  bulkDeleteTasks(ids: Array<string>): Observable<ITask> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids });

    return this.http.put(this.apiUrl + 'bulk-delete', body, { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - bulkDeleteTasks, res:', res);
          return res;
        }),
        catchError(this.handleError)
      )
  }

  private handleError(error: Response) {
    console.error('Error occured:', error);
    return Observable.throw(error.json() || 'Server error');
  }
}
