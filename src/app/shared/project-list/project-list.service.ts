import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { ProjectModel } from './project.model'

/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ProjectListService {

  /**
   * The array of initial projects provided by the service.
   * @type {Array}
   */
  projects = [{
      title: 'Чому я йду до Ради',
      description: 'Замість того, щоб викрити суддю хабарника та притягнути до відповідальності слідчих та прокурорів, які незаконно закрили кримінальне провадження, генеральний прокурор фактично став на захист пшонківських методів розслідування, в якій панує кумівство та позапроцесуальний порядок прийняття рішень у кримінальному провадженні", – наголошує він',
      cost: 120,
      managerId: 0,
      managerName: 'Назар Остапенко',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: 'Освітлити парки за 99 днів',
      description: 'Prj 2 Description',
      cost: 10,
      managerId: 0,
      managerName: 'Unknown',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: '100 робочих місць за 100 днів',
      description: 'Prj 3 Description',
      cost: 100,
      managerId: 0,
      managerName: 'Unknown',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: 'Прийняти закон про прокурорські канікули',
      description: 'Деталі пізніше',
      cost: 100,
      managerId: 0,
      managerName: 'Unknown',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: '100 робочих місць за 100 днів',
      description: 'Prj 3 Description',
      cost: 100,
      managerId: 0,
      managerName: 'Unknown',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: 'Освітлити парки за 99 днів',
      description: 'Prj 2 Description',
      cost: 10,
      managerId: 0,
      managerName: 'Unknown',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }
  ];

  /**
   * Contains the currently pending request.
   * @type {Observable<ProjectModel[]>}
   */
  private request: Observable<ProjectModel[]>;

  /**
   * Creates a new ProjectListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local projects array is defined and has elements), the cached version is returned
   * @return {ProjectModel[]} The Observable for the HTTP request.
   */
  get(): Observable<ProjectModel[]> {
    if (this.projects && this.projects.length) {
      return Observable.from([this.projects]);
    }
    if (!this.request) {
      this.request = this.http.get('/assets/data.json')
        .map((response: Response) => response.json())
        .map((data: ProjectModel[]) => {
          this.request = null;
          return this.projects = data;
        });
    }
    return this.request;
  }

  /**
   * Adds the given project to the array of projects.
   * @param {string} value - The project to add.
   */
  add(value: ProjectModel): void {
    this.projects.push(value);
  }
}
