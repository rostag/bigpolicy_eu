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

  static instance: ProjectListService;
  static isCreating: Boolean = false;

  /**
   * The array of initial projects provided by the service.
   * @type {Array}
   */
  projects: ProjectModel[];

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
  constructor(private http: Http) {
    if (!ProjectListService.isCreating) {
      throw new Error("You can't call new in Singleton instances!");
    }
    // console.log('project list service CONSTRUCTOR');
    this.projects = [{
      title: 'Освітлити парки за 99 днів',
      description: 'Треба Україну трансформувати, а не реформувати. І програма на те і існує, вона працює дуже добре, так що за декілька років ця трансформація відбудеться.',
      cost: 10,
      managerId: 0,
      managerName: 'Марія Олрайт',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: '100 робочих місць за 100 днів',
      description: 'Є причини бути оптимістом, бодай для мене, тому що ми маємо таку програму — «Молодь змінить країну» і, додам, без революції. Себто, Україна в жахливому стані. Вона була такою декілька років тому, вона досі в жахливому стані: політично, економічно, соціально, екологічно.',
      cost: 100,
      managerId: 0,
      managerName: 'Дмитро Полив`яний',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }, {
      title: 'Прийняти закон про зелену енергію',
      description: 'Деталі пізніше',
      cost: 100,
      managerId: 0,
      managerName: 'Остап Занзібар',
      dateStarted: new Date(),
      dateEnded: new Date(),
      iconURL: ''
    }];
  }

  static getInstance() {
    if (ProjectListService.instance == null) {
      ProjectListService.isCreating = true;
      ProjectListService.instance = new ProjectListService(null);
      ProjectListService.isCreating = false;
    }

    return ProjectListService.instance;
  }
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
    console.log("Project added: ", this.projects);
  }
}
