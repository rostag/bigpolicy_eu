import { IProjectState, getProjectsById } from '../../state/reducers/project.reducers';
import { IProject, IResponsePage, IDataPageRequest } from '../models';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogService } from '../dialog/dialog.service';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task/task.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {

  private projectApiUrl = environment.api_url + '/api/project-api/';

  private projects$ = this.projectStore.pipe(
    select(getProjectsById)
  );

  public getCachedProject(projectId) {
    let project = null;
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
  ) {
  }

  createProject(model: IProject): Observable<IProject> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.projectApiUrl, body, {headers: headers}).pipe(
      map(data => this.gotoProjectView(data))
    );
  }

  /**
   * Finalizes opening of the project.
   */
  gotoProjectView(project): IProject {
    if (project && project._id) {
      this.router.navigate(['/project', project._id]).then(() => {
      });
    }
    return null;
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
      requestUrl = `${this.projectApiUrl}page/${page}/${limit}/q/${encodeURIComponent(dbQuery)}`;
    }

    // Page of Projects for Leader :: api/project-api/leader/:leaderId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && leaderId !== null) {
      requestUrl = `${this.projectApiUrl}leader/${leaderId}/page/${page}/${limit}/q/${encodeURIComponent(dbQuery)}`;
    }

    return this.http.get<IResponsePage<IProject>>(requestUrl);
  }

  getProject(projectId: string): Observable<IProject> {
    if (projectId) {
      return this.http.get<IProject>(this.projectApiUrl + projectId);
    }
  }

  updateProject(model: IProject): Observable<IProject> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .put(this.projectApiUrl + model._id, model.toString(), {headers: headers})
      .pipe(map(res => this.gotoProjectView(res)));
  }

  bulkUpdateProjects(ids: string[], data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ids: ids, data: data});
    return this.http.put(this.projectApiUrl + 'bulk-update', body, {headers: headers});
  }

  deleteProject(model: IProject, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm({
      title: 'Точно видалити?',
      message: 'Ця дія незворотня, продовжити?',
      btnOkText: 'Видалити',
      btnCancelText: 'Відмінити'
    });

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Project immediately and, if there are tasks, re-assign them to other Project (placeholder)
        this.finalizeProjectDeletion(model, navigateToList);

        if (model.taskIds && model.taskIds.length > 0) {
          this.dialogService.confirm({
            title: 'Що робити з заходами?',
            message: `Проект має заходи. Видалити їх, чи залишити у системі,
            передавши до спецпроекту "Не на часі"?`,
            btnOkText: 'Видалити',
            btnCancelText: 'Залишити у системі'
          }).subscribe(toDeleteTasks => {
            if (toDeleteTasks === true) {
              // Delete Tasks from DB
              // TODO delete tasks, donations and task donations data
              this.taskService.bulkDeleteTasks(model.taskIds)
                .subscribe(() => {
                });
            } else {
              // NENACHASI: reassign tasks to placeholder Project
              this.getProjectsPage({id: null, page: 1, pageSize: 3, dbQuery: `{ "$where": "this.title == \\"Не на часі\\"" }`})
                .subscribe((res) => {
                  this.taskService.bulkUpdateTasks(model.taskIds, {projectId: res['docs'][0]._id}).subscribe(() => {
                  });
                });
            }
            this.finalizeProjectDeletion(model, navigateToList);
          });
        } // If Task reassignment was needed
      }
    });
    return dialogResult;
  }

  finalizeProjectDeletion(projectModel: IProject, navigateToList = true) {
    // TODO Delete Project Firebase data
    this.http.delete(this.projectApiUrl + projectModel._id)
      .subscribe(() => {
        if (navigateToList) {
          this.router.navigate(['/projects']).then();
        }
      });
  }

  bulkDeleteProjects(ids: string[]): Observable<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ids: ids});
    return this.http.put(`${this.projectApiUrl} bulk-delete`, body, {headers: headers});
  }
}
