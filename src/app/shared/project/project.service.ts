import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IProjectState, getProjectsState } from '../../state/reducers/project.reducers';
import { LoadProjectsSuccess, LoadProjectSuccess, CreateProjectSuccess } from '../../state/actions/project.actions';
import { IProject, IResponsePage } from '../../common/models';

import { DialogService } from '../../shared/dialog/dialog.service';
import { TaskService } from '../../shared/task/task.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

/**
 * Provides ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectService {

  // TODO Implement caching
  static _cachedProjects = [];

  private projectApiUrl = environment.api_url + '/api/project-api/';

  static cacheProject(project) {
    // FIXME Move it to NGRX
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
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private taskService: TaskService,
    private projectStore: Store<IProjectState>
  ) { }

  /**
   * Creates new Project.
   * @param {IProject} model Project to create.
   */
  // FIXME NG45 - get back to typed as Observable<IProject>:
  // createProject(model: IProject): Observable<IProject> {
  createProject(model: IProject): Observable<any> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.projectApiUrl, body, { headers: headers })
      .map(res => {
        console.log('NG45 - createProject', res);
        this.projectStore.dispatch(new CreateProjectSuccess(res))
        return res;
      });
  }

  /**
   * Gets Projects page from DB by given projectId, leaderId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProjectsPage(projectId = null, leaderId = null, page = null, limit = null, dbQuery = '{}'): Observable<IResponsePage<IProject>> {

    let requestUrl;

    // Page of Projects :: api/project-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.projectApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // Page of Projects for Leader :: api/project-api/leader/:leaderId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && leaderId !== null) {
      requestUrl = this.projectApiUrl + 'leader/' + leaderId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // console.log('get Projects Page:', projectId, leaderId, page, limit);

    return this.http.get(requestUrl)
      // FIXME NG45 - get back to typed HttpResponse:
      // .map((responsePage: HttpResponse) => {
      .map((responsePage: IResponsePage<IProject>) => {
        // console.log('Projects Page loaded, response: ', responsePage);
        this.projectStore.dispatch(new LoadProjectsSuccess(responsePage))
        return responsePage;
      });
  }

  /**
   * Returns single project from DB by ID :: api/project-api/:projectId
   */
  getProject(projectId: string): Observable<IProject> {
    if (projectId) {
      return this.http.get<IProject>(this.projectApiUrl + projectId)
    }
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param IProject A Project to update
   */
  // FIXME NG45 - get back to: Observable<IProject>
  // updateProject(model: IProject): Observable<IProject> {
  updateProject(model: IProject): Observable<any> {
    // TODO Consider encoding the body like in create project above
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(this.projectApiUrl + model._id, model.toString(), { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - updateProject, res:', res);
          return res;
        }),
        catchError(this.handleError)
      )
  }

  /**
   * Updates multiple projects by performing a request with PUT HTTP method.
   * @param ids {Array} Project IDs to update
   * @param data {Object} The data to be applied during update in {field: name} format
   */
  // FIXME NG45 - get back to typed Observable<IProject>
  // bulkUpdateProjects(ids: Array<string>, data: any): Observable<IProject> {
  bulkUpdateProjects(ids: string[], data: any): Observable<any> {
    // TODO Consider encoding the body like in create project above
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids, data: data });

    return this.http.put(this.projectApiUrl + 'bulk-update', body, { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - bulkUpdateProjects, res:', res);
          return res;
        }
        ),
        catchError(this.handleError)
      )
  }

  /**
   * Deletes a Project by performing a request with DELETE HTTP method.
   * @param IProject A Project to delete
   */
  deleteProject(model: IProject, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm('Точно видалити?', 'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Project immediately and, if there are tasks, re-assign them to other Project (placeholder)
        this.finalizeProjectDeletion(model, navigateToList);

        if (model.taskIds && model.taskIds.length > 0) {
          this.dialogService.confirm('Що робити з заходами?', `Проект має заходи. Видалити їх, чи залишити у системі, передавши
            до спецпроекту "Не на часі"?`, 'Видалити', 'Залишити у системі')
            .subscribe(toDeleteTasks => {
              if (toDeleteTasks === true) {
                // Delete Tasks from DB
                // TODO Delete Tasks Firebase data
                // TODO Delete Donations and Task Donations?
                this.taskService.bulkDeleteTasks(model.taskIds)
                  .subscribe((deleteResult) => { console.log('Tasks deleted:', deleteResult); });
              } else {
                // NE NA CHASI: reassign tasks to placeholder Project
                // projectId = null, leaderId = null, page = null, limit = null, dbQuery = '{}'): Observable<IProject>
                this.getProjectsPage(null, null, 1, 3, '{ "$where": "this.title == \\"Не на часі\\"" }')
                  .subscribe((res) => {
                    // console.log('Got Not On Time Project id: ', res['docs'][0]._id);
                    this.taskService.bulkUpdateTasks(model.taskIds, { projectId: res['docs'][0]._id }).subscribe((result) => { });
                  });
              }
            });
        } // If Task reassignment was needed
      }
    });
    return dialogResult;
  }

  /*
   * Deletes Project
   */
  finalizeProjectDeletion(projectModel: IProject, navigateToList = true) {
    // TODO Delete Project Firebase data
    this.http.delete(this.projectApiUrl + projectModel._id)
      .pipe(
        map(res => {
          {
            console.log('NG45 - finalizeProjectDeletion, res: ', res);
            return res;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe((res) => {
        if (navigateToList) {
          this.router.navigate(['/projects']);
        }
      });
  }

  /**
   * Deletes multiple projects by performing a request with PUT HTTP method.
   * @param ids Project IDs to delete
   */
  bulkDeleteProjects(ids: string[]): Observable<IProject> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ ids: ids });

    return this.http.put(this.projectApiUrl + 'bulk-delete', body, { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - bulkDeleteProjects, res:', res);
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
