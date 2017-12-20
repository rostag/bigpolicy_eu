import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ProjectService } from '../../shared/project/project.service';

import { LeaderModel } from './leader.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

declare var localStorage: any;

/**
 * Provides the Leader service with methods to create, read, update and delete models.
 */
@Injectable()
export class LeaderService {

  leader: LeaderModel;

  private leaderApiUrl = '/api/leader-api/';
  private leaderSource = new BehaviorSubject<LeaderModel>(this.leader);

  leaderStream = this.leaderSource.asObservable();

  /**
   * The array of models provided by the service.
   * @type {Array}
   */
  private models;

  /**
   * Creates a new LeaderService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(
    private http: Http,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService
  ) {}

  /**
   * Creates the Leader.
   * @param {LeaderModel} model - The Leader to create.
   */
  createLeader(model: LeaderModel, email) {
    model.email = email;
    const body: string = encodeURIComponent(model.toString());
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });

    this.http.post(this.leaderApiUrl, body, options)
      .map(res => res.json())
      .subscribe(
        data => {
          // Normal Save
          this.gotoLeaderView(data);
          // Post-FTUX
          // console.log('Finalizing leader registration, cleaning localLeader');
          localStorage.removeItem('BigPolicyLeaderRegistration');
        },
        err => (er) => console.error('Leader creation error: ', er),
        () => {}
      );
  }

  /**
   * Gets Leaders page from DB by given leaderId, groupId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @param leaderId Leader ID to get.
   * @param groupId Group to get Leaders for. Unused.
   * @param page Page number.
   * @param limit Qualntity of items to get.
   * @param dbQuery Database search query.
   * @return {Observable<LeaderModel>} The Observable for the HTTP request.
   */
  getLeadersPage(leaderId = null, groupId = null, page = null, limit = null, dbQuery = '{}'): Observable<LeaderModel> {

    let requestUrl;

    // Leader by ID
    // /api/leader-api/:leaderId
    if (leaderId) {
      requestUrl = this.leaderApiUrl + leaderId;
    }

    // Page of Leaders
    // /api/leader-api/page/:page/:limit/q/:dbQuery
    if (page !== null && limit !== null) {
      requestUrl = this.leaderApiUrl + 'page/' + page + '/' + limit + '/q/' + encodeURIComponent(dbQuery);
    }
    // OBSOLETE: All Leaders for Group:         /api/leader-api/group/:groupId/
    // if (groupId) {
    //   requestUrl = this.apiUrl + 'group/' + groupId;
    // }
    // RESERVED: Page of leaders for Group:     /api/leader-api/group/:groupId/page/:page/:limit
    // if (page !== null && limit !== null && groupId !== null) {
    //   requestUrl = this.apiUrl + 'group/' + groupId + '/page/' + page + '/' + limit;
    // }

    // console.log('get Leaders Page:', leaderId, groupId, page, limit);

    return this.http.get(requestUrl)
      .map((responsePage: Response) => {
        // console.log('Leaders Page loaded, response: ', responsePage);
        return responsePage.json();
      });
  }

  /**
   * Returns single leader from DB.
   */
  getLeader(leaderId: string): Observable<LeaderModel> {
    return this.getLeadersPage(leaderId);
  }

  /**
   * Seaches for leader by user email in DB
   * If found, saves it via callback as userService.leader propery.
   */
  requestLeaderByEmail(email: string): Observable<LeaderModel> {

    // FIXME Optimize - use caching, no need to load leaders each time
    // let leader: any = this.findCachedLeaderByEmail(email);
    // if (leader) {
    //   leader = Observable.from({leader});
    // } else {
    // }

    console.log('LeaderService:RequestLeaderByEmail:', email);

    const leaderResponse = this.getLeadersPage(null, null, 1, 1, '{ "email": "' + email + '" }');
    leaderResponse.subscribe( leader => this.setLeaderForUser(leader['docs'][0]));

    return leaderResponse;
  }

  private findCachedLeaderByEmail(email: string): LeaderModel {
    const leaders = this.models;
    let foundLeader;
    for (const l in leaders) {
      if (leaders[l].email === email) {
        foundLeader = leaders[l];
      }
    }
    return foundLeader;
  }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param LeaderModel A Leader to update
   */
  updateLeader(model: LeaderModel): Observable<LeaderModel> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.leaderApiUrl + model._id, model.toString(), {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  // TODO Bulk Update Leaders (Like Project and Tasks).

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param LeaderModel A Leader to delete
   */
  deleteLeader(model: LeaderModel, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm('Точно видалити?', 'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Leader immediately and, if there are projects, re-assign them to other Leader (admin)
        this.finalizeLeaderDeletion(model, navigateToList);

        if (model.projects && model.projects.length > 0) {
          this.dialogService.confirm('Що робити з проектами?', `У лідера є проекти. Видалити їх, чи залишити у системі, передавши
            до тимчасової адміністрації?`, 'Видалити', 'Залишити у системі')
            .subscribe(toDeleteProjects => {
            if (toDeleteProjects === true) {
              // Delete Projects and Tasks in DB
              // TODO Delete Projects Firebase data
              // TODO Delete Donations and Task Donations?
              this.projectService.bulkDeleteProjects(model.projects)
              .subscribe((deleteResult) => { console.log('Projects deleted:', deleteResult); });
            } else {
              // Reassign projects to another Leader (this/Admin)
              // FIXME STOP Mixing Logged in / Profile / User Leader and Leader which is to be deleted
              const newLeader = this.leader;
              const projectsUpdate = this.projectService.bulkUpdateProjects(model.projects, {
                managerId: newLeader._id,
                managerEmail: newLeader.email,
                managerName: newLeader.name + ' ' + newLeader.surName
              });
              projectsUpdate.subscribe((updateResult) => { console.log('Projects update result:', updateResult); });
            }
            this.finalizeLeaderDeletion(model, navigateToList);
          });
        } // If Project reassignment was needed
      }
    });
    return dialogResult;
  }

  /*
   * Deletes Leader
   */
  finalizeLeaderDeletion(leaderModel: LeaderModel, navigateToList = true) {
    // TODO Delete Leader Firebase data
    this.http.delete(this.leaderApiUrl + leaderModel._id)
    .map(res => { return res; })
    .catch( this.handleError )
    .subscribe((res) => {
      this.setLeaderForUser(null);
      if (navigateToList) {
        this.router.navigate(['/leaders']);
      }
    });
  }

  // TODO Check if the same can be done for projects
  gotoLeaderView(leader) {
    this.setLeaderForUser(leader);
    const leaderId = leader._id;
    if (leaderId) {
      this.router.navigate(['/leader', leaderId]).then(_ => {
        // navigation is done
      });
    }
  }

  private setLeaderForUser(leader) {
    if (!leader) {
      return;
    }
    // FIXME Impersonation happens - check with admin editing different leaders (and see Profile then)
    console.log('👤 Leader service. Set leader for', leader.email);
    this.leader = leader;
    // Notify observers;
    // http://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2/35568924#35568924
    this.leaderSource.next(leader);
  }

  private handleError(error: Response) {
    console.error('Error occured: ', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
