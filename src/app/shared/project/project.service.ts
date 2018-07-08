import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IProjectState, getProjectsById } from '../../state/reducers/project.reducers';
import { IProject, IResponsePage, IDataPageRequest } from '../../common/models';
import { DialogService } from '../../shared/dialog/dialog.service';
import { TaskService } from '../../shared/task/task.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Store, select } from '@ngrx/store';
import 'rxjs/add/operator/map';

/**
 * Provides ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectService {

  private projectApiUrl = environment.api_url + '/api/project-api/';

  private projects$ = this.projectStore.pipe(
    select(getProjectsById)
  );

  public getCachedProject(projectId) {
    let project;
    this.projects$.subscribe(projects => {
      project = projects[projectId];
    });
    return project || {};
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private taskService: TaskService,
    private projectStore: Store<IProjectState>
  ) { }

  // FIXME NG45 - get back to typed as Observable<IProject>:
  // createProject(model: IProject): Observable<IProject> {
  createProject(model: IProject): Observable<any> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.projectApiUrl, body, { headers: headers }).pipe(
      map(data => this.gotoProjectView(data)),
      catchError(this.handleError)
    );
  }

  /**
   * Finalizes opening of the project.
   */
  gotoProjectView(project) {
    if (project && project._id) {
      this.router.navigate(['/project', project._id]).then(_ => { });
    }
  }


  /**
   * Gets Projects page from DB by given projectId, leaderId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProjectsPage(req: IDataPageRequest): Observable<IResponsePage<IProject>> {

    const leaderId = req.id || null;
    const page = req.page || null;
    const limit = req.pageSize || null;
    const dbQuery = req.dbQuery || '{}';

    let requestUrl;

    // Page of Projects :: api/project-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.projectApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // Page of Projects for Leader :: api/project-api/leader/:leaderId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && leaderId !== null) {
      requestUrl = this.projectApiUrl + 'leader/' + leaderId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    return this.http.get<IResponsePage<IProject>>(requestUrl);
  }

  /**
   * Returns single project from DB by ID :: api/project-api/:projectId
   */
  getProject(projectId: string): Observable<IProject> {
    if (projectId) {
      return this.http.get<IProject>(this.projectApiUrl + projectId);
    }
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param IProject A Project to update
   */
  // FIXME NG45 - get back to: Observable<IProject>
  // updateProject(model: IProject): Observable<IProject> {
  updateProject(model: IProject): Observable<IProject> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // TODO Consider encoding the body like in create project above
    // TODO Check is going to proejct from the service like this.gotoProjectView below is the best solution
    return this.http.put(this.projectApiUrl + model._id, model.toString(), { headers: headers })
      .pipe(
        map(res => this.gotoProjectView(res)),
        catchError(this.handleError)
      );
  }

  /**
   * Updates multiple projects by performing a request with PUT HTTP method.
   * @param ids {Array} Project IDs to update
   * @param data {Object} The data to be applied during update in {field: name} format
   */
  // FIXME NG45 - get back to typed Observable<IProject>
  // bulk UpdateProjects(ids: Array<string>, data: any): Observable<IProject> {
  bulkUpdateProjects(ids: string[], data: any): Observable<any> {
    // TODO Consider encoding the body like in create project above
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids, data: data });

    return this.http.put(this.projectApiUrl + 'bulk-update', body, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
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
                  .subscribe(() => { });
              } else {
                // NE NA CHASI: reassign tasks to placeholder Project
                this.getProjectsPage({ id: null, page: 1, pageSize: 3, dbQuery: '{ "$where": "this.title == \\"Не на часі\\"" }' })
                  .subscribe((res) => {
                    this.taskService.bulkUpdateTasks(model.taskIds, { projectId: res['docs'][0]._id }).subscribe((result) => { });
                  });
              }
              this.finalizeProjectDeletion(model, navigateToList);
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
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    console.error('Error occured:', error);
    return Observable.throw(error.json() || 'Server error');
  }
}
