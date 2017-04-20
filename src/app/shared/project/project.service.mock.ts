import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { DialogService } from '../../shared/dialog/dialog.service';
import { TaskService } from '../../shared/task/task.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { ProjectModel } from './project.model';

/**
 * Provides ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectServiceMock {

  // TODO Implement caching
  static _cachedProjects = [];

  private projectApiUrl = '/project-api/';

  private responsePageMock = {
    'docs': [
      {
        '_id': '5842c8bb3540984e175fc5a1',
        'title': 'Електронне декларування!',
        'description': 'Не потрібно говорити, наскільки це режим, тестовий чи ні. Система подання і оприлюднення.',
        'cost': '21',
        'managerName': 'Rostyslav Siryk',
        'managerId': '58cf0b7d4256ee60fd1261a7',
        'dateStarted': '2012-12-03T00:00:00.000Z',
        'dateEnded': '2018-11-02T00:00:00.000Z',
        'videoUrl': 'https://www.youtube.com/watch?v=Or1rUdzjI5E',
        '__v': 4,
        'managerEmail': 'rostislav.siryk@gmail.com',
        'totalDonationsReceived': 2590,
        'imageUrl': '',
        'donations': [
          '588cf80ab58723a2988d4485',
          '588e065faa8da59ae4829043',
          '58cf1d71d8784e0edfcdb4e8'
        ],
        'tasks': [
          '58553ddb3b2db8c32e33c25e',
          '581a6309dc79a49d33d8fd28',
          '581daededf738419b0c3b624'
        ]
      },
      {
        '_id': '5842c8f13540984e175fc5a2',
        'title': 'Gymnastics is Beautiful',
        'description': 'Beautiful moments from the beautiful ladies of the sport of gymnastics.',
        'cost': '1',
        'managerName': 'Rostyslav Siryk',
        'managerId': '58cf0b7d4256ee60fd1261a7',
        'dateStarted': '2016-12-01T00:00:00.000Z',
        'dateEnded': '2016-12-30T00:00:00.000Z',
        'videoUrl': 'https://www.youtube.com/watch?v=yghJX2SOPk8',
        'managerEmail': 'rostislav.siryk@gmail.com',
        '__v': 1,
        'totalDonationsReceived': 0,
        'imageUrl': '',
        'donations': [],
        'tasks': [
          '5842c92d3540984e175fc5a3',
          '5842c96b3540984e175fc5a4',
          '58cd0142ae6d40927988c239',
          '58ce8d9c41a4e4a807adbcaf',
          '58dcad13d05006eebf8f7cf7'
        ]
      },
      {
        '_id': '5842c9e23540984e175fc5a5',
        'title': 'Технології БП',
        'description': 'Додатки,\\nІнтеграції,\\nМедійність',
        'cost': '1',
        'managerName': 'Rostyslav Siryk',
        'managerId': '58cf0b7d4256ee60fd1261a7',
        'dateStarted': '2017-03-01T00:00:00.000Z',
        'dateEnded': '2017-03-17T00:00:00.000Z',
        'videoUrl': 'https://www.youtube.com/watch?v=JbWnRhHfTDA',
        'managerEmail': 'rostislav.siryk@gmail.com',
        '__v': 4,
        'totalDonationsReceived': 0,
        'imageUrl': '',
        'donations': [],
        'tasks': [
          '5842ca0f3540984e175fc5a6',
          '5842ca533540984e175fc5a7',
          '5842cae83540984e175fc5a9',
          '5842cb0d3540984e175fc5aa',
          '5815af4827312685b809bddd',
          '5815afb527312685b809bdde',
          '581e861cdf738419b0c3b627'
        ]
      },
      {
        '_id': '58cc4e21ae6d40927988c236',
        'title': 'Timelapse Tricks',
        'description': 'Learn how to to cool things with timelapasesease.',
        'cost': '1',
        'managerName': 'Rostyslav Siryk',
        'managerId': '58cf0b7d4256ee60fd1261a7',
        'managerEmail': 'rostislav.siryk@gmail.com',
        'dateStarted': '2017-03-17T00:00:00.000Z',
        'dateEnded': '2017-03-17T00:00:00.000Z',
        'videoUrl': '',
        'totalDonationsReceived': 0,
        '__v': 0,
        'imageUrl': '',
        'donations': [],
        'tasks': [
          '58d4e27a9ff81172407e0e5a',
          '58d4e2869ff81172407e0e5b',
          '58d60b61260e94051c643820'
        ]
      },
      {
        '_id': '58ce88bc41a4e4a807adbcab',
        'title': 'Magic Salt',
        'description': 'How to produce read and blue effect.',
        'cost': '1',
        'managerName': 'Rostyslav Siryk',
        'managerId': '58cf0b7d4256ee60fd1261a7',
        'managerEmail': 'rostislav.siryk@gmail.com',
        'dateStarted': '2017-06-19T00:00:00.000Z',
        'dateEnded': '2018-09-19T00:00:00.000Z',
        'videoUrl': '',
        'totalDonationsReceived': 0,
        '__v': 0,
        'imageUrl': '',
        'donations': [],
        'tasks': []
      },
      {
        '_id': '58d08119772ee0389d5aa069',
        'title': 'Arduino Kool',
        'description': 'Learn 12341234 and you set.\\nAll!',
        'cost': '1',
        'managerName': 'Rostyslav Siryk',
        'managerId': '58cf0b7d4256ee60fd1261a7',
        'managerEmail': 'rostislav.siryk@gmail.com',
        'dateStarted': '2017-03-21T00:00:00.000Z',
        'dateEnded': '2017-03-21T00:00:00.000Z',
        'videoUrl': '',
        'totalDonationsReceived': 0,
        '__v': 0,
        'imageUrl': '',
        'donations': [],
        'tasks': []
      },
      {
        '_id': '58e8cf4b534fb9f782a832b5',
        'title': 'rsqr',
        'description': 'qwerq',
        'cost': '1',
        'managerName': 'Cloud a',
        'managerId': '58e8cf24534fb9f782a832b4',
        'managerEmail': 'rostyslav.siryk@gmail.com',
        'dateStarted': '2017-04-08T00:00:00.000Z',
        'dateEnded': '2017-04-08T00:00:00.000Z',
        'imageUrl': '',
        'videoUrl': 'w',
        'totalDonationsReceived': 0,
        '__v': 0,
        'donations': [],
        'tasks': []
      }
    ],
    'total': 7,
    'limit': 10,
    'page': 1,
    'pages': 1
  };

  static cacheProject(project) {
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
    private http: Http,
    private router: Router,
    private dialogService: DialogService,
    private taskService: TaskService
  ) {}

  /**
   * Creates new Project.
   * @param {ProjectModel} model Project to create.
   */
  createProject(model: ProjectModel): Observable<ProjectModel> {
    const body: string = encodeURIComponent(model.toString());
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.projectApiUrl, body, options)
      .map(res => res.json()
    );
  }

  /**
   * Gets Projects page from DB by given projectId, leaderId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @return {string[]} The Observable for the HTTP request.
   */
  getProjectsPage(projectId = null, leaderId = null, page = null, limit = null, dbQuery = '{}'): Observable<ProjectModel> {

    let requestUrl;

    // Project by ID :: project-api/:projectId
    if (projectId) {
      requestUrl = this.projectApiUrl + projectId;
    }

    // Page of Projects :: project-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.projectApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // Page of Projects for Leader :: project-api/leader/:leaderId/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null && leaderId !== null) {
      requestUrl = this.projectApiUrl + 'leader/' + leaderId + '/page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }

    // console.log('get Projects Page:', projectId, leaderId, page, limit);
    {  }
    const respOptions = new ResponseOptions({
      body: this.responsePageMock,
      status: 200
    });
    const responseMock = new Response( respOptions );
    const o = Observable.from([ responseMock ]);

    return o.map((responsePage: Response) => {
      // console.log('Projects Page loaded, response: ', responsePage);
      return responsePage.json();
    });

    // return this.http.get(requestUrl)
    //   .map((responsePage: Response) => {
    //     console.log('Projects Page loaded, response: ', responsePage);
    //     return responsePage.json();
    //   });
  }

  /**
   * Returns single project from DB
   */
  getProject(projectId: string): Observable<ProjectModel> {
    return this.getProjectsPage(projectId);
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param ProjectModel A Project to update
   */
  updateProject(model: ProjectModel): Observable<ProjectModel> {
    // TODO Consider encoding the body like in create project above
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.projectApiUrl + model._id, model.toString(), {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Updates multiple projects by performing a request with PUT HTTP method.
   * @param ids {Array} Project IDs to update
   * @param data {Object} The data to be applied during update in {field: name} format
   */
  bulkUpdateProjects(ids: Array<string>, data: any): Observable<ProjectModel> {
    // TODO Consider encoding the body like in create project above
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids, data: data });
    console.log('Project service, try to update:', ids, data, body);

    return this.http.put(this.projectApiUrl + 'bulk-update', body, {headers: headers})
      .map( res => res.json() )
      .catch( this.handleError );
  }

  /**
   * Deletes a Project by performing a request with DELETE HTTP method.
   * @param ProjectModel A Project to delete
   */
  deleteProject(model: ProjectModel, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm('Точно видалити?', 'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Project immediately and, if there are tasks, re-assign them to other Project (placeholder)
        this.finalizeProjectDeletion(model, navigateToList);

        if (model.tasks && model.tasks.length > 0) {
          this.dialogService.confirm('Що робити з заходами?', `Проект має заходи. Видалити їх, чи залишити у системі, передавши
            до спецпроекту "Не на часі"?`, 'Видалити', 'Залишити у системі')
            .subscribe(toDeleteTasks => {
            if (toDeleteTasks === true) {
              // Delete Tasks from DB
              // TODO Delete Tasks Firebase data
              // TODO Delete Donations and Task Donations?
              this.taskService.bulkDeleteTasks(model.tasks)
              .subscribe((deleteResult) => { console.log('Tasks deleted:', deleteResult); });
            } else {
              // Reassign tasks to another Project (placeholder)
              // FIXME - Retrieve real Placeholder project
              const newProject = new ProjectModel();
              newProject._id = 'NE_NA_CHASI';
              const tasksUpdate = this.taskService.bulkUpdateTasks(model.tasks, { projectId: newProject._id });
              tasksUpdate.subscribe((updateResult) => { console.log('Tasks update result:', updateResult); });
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
  finalizeProjectDeletion(projectModel: ProjectModel, navigateToList = true) {
    // TODO Delete Project Firebase data
    this.http.delete(this.projectApiUrl + projectModel._id)
    .map(res => { return res.json(); })
    .catch( this.handleError )
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
  bulkDeleteProjects(ids: Array<string>): Observable<ProjectModel> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({ ids: ids});
    console.log('Project service, try to delete:', ids, body);

    return this.http.put(this.projectApiUrl + 'bulk-delete', body, {headers: headers})
    .map(res => res.json() )
    .catch( this.handleError );
  }

  private handleError(error: Response) {
    console.error('Error occured:', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
