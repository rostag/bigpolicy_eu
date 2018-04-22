import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ProjectService } from '../../shared/project/project.service';
import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ENV } from 'app/../environments/env.config';
import { Store } from '@ngrx/store';
import { ILeaderState } from '../../state/reducers/leader.reducers';
import { LoadLeadersSuccess } from '../../state/actions/leader.actions';
import { ILeader } from '../../common/models';

declare var localStorage: any;

/**
 * Provides the Leader service with methods to create, read, update and delete models.
 */
@Injectable()
export class LeaderService {

  public leader: ILeader;

  private leaderApiUrl = environment.api_url + '/api/leader-api/';
  private leaderSource = new BehaviorSubject<ILeader>(this.leader);

  public leaderStream = this.leaderSource.asObservable();

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
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private leaderStore: Store<ILeaderState>
  ) { }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  // Basic Ping
  public ping(): Observable<any> {
    return this.http
      .get(`${ENV.BASE_API}leader-api/ping`)
      .pipe(
        catchError(this._handleError)
      );
  }

  // Basic Ping with JWT
  public pingJwt(): Observable<any> {
    return this.http
      .get(`${ENV.BASE_API}leader-api/ping-jwt`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  // Basic Ping with JWT and Admin
  // FIXME
  public pingJwtAdmin(): Observable<any> {
    return this.http
      .get(`${ENV.BASE_API}leader-api/ping-jwt-admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      // FIXME: dispatch LoginRequest action (to be created)
      // this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

  /**
   * Creates the Leader.
   * @param {ILeader} model - The Leader to create.
   */
  public createLeader(model: ILeader) {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders()
      .set('Authorization', this._authHeader)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<ILeader>(this.leaderApiUrl, body, { headers: headers })
      .pipe(map(data => {
        // Post-FTUX
        localStorage.removeItem('BigPolicyLeaderRegistration');
        this.gotoLeaderView(data);
      }));
  }

  /**
   * Gets Leaders page from DB by given leaderId, groupId, page and limit
   * Returns an Observable for the HTTP GET request.
   * @param groupId Group to get Leaders for. Unused.
   * @param page Page number.
   * @param limit Qualntity of items to get.
   * @param dbQuery Database search query.
   * @return {Observable<ILeader>} The Observable for the HTTP request.
   */
  public getLeadersPage(groupId = null, page = null, limit = null, dbQuery = '{}'): Observable<ILeader> {

    let requestUrl;

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
      // FIXME NG5 - get back to: 
      // .map((responsePage: Response) => {
      .map((responsePage: any) => {
        // console.log('Leaders Page loaded, response: ', responsePage);
        this.leaderStore.dispatch(new LoadLeadersSuccess(responsePage))
        return responsePage;
      });
  }

  /**
   * Returns single leader from DB by ID.
   * /api/leader-api/:leaderId
   */
  public getLeader(leaderId: string): Observable<ILeader> {
    if (leaderId) {
      return this.http.get<ILeader>(this.leaderApiUrl + leaderId);
    }
  }

  /**
   * Seaches for leader by user email in DB
   * If found, saves it via callback as userService.leader propery.
   */
  public requestLeaderByEmail(email: string): Observable<ILeader> {

    // FIXME Optimize - use caching, no need to load leaders each time
    // let leader: any = this.findCachedLeaderByEmail(email);
    // if (leader) {
    //   leader = Observable.from({leader});
    // } else {
    // }

    console.log('LeaderService:RequestLeaderByEmail:', email);

    const leaderResponse = this.getLeadersPage(null, 1, 1, '{ "email": "' + email + '" }');
    leaderResponse.subscribe(leader => this.setLeaderForUser(leader['docs'][0]));

    return leaderResponse;
  }

  private findCachedLeaderByEmail(email: string): ILeader {
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
   * @param ILeader A Leader to update
   */
  public updateLeader(model: ILeader): Observable<ILeader> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(this.leaderApiUrl + model._id, model.toString(), { headers: headers })
      .pipe(
        map(res => {
          console.log('NG45 - Leader updated, server response:', res);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  // TODO Bulk Update Leaders (Like Project and Tasks).

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param ILeader A Leader to delete
   */
  public deleteLeader(model: ILeader, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm('Точно видалити?', 'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Leader immediately and, if there are projects, re-assign them to other Leader (admin)
        this.finalizeLeaderDeletion(model, navigateToList);

        if (model.projectIds && model.projectIds.length > 0) {
          this.dialogService.confirm('Що робити з проектами?', `У лідера є проекти. Видалити їх, чи залишити у системі, передавши
            до тимчасової адміністрації?`, 'Видалити', 'Залишити у системі')
            .subscribe(toDeleteProjects => {
              if (toDeleteProjects === true) {
                // Delete Projects and Tasks in DB
                // TODO Delete Projects Firebase data
                // TODO Delete Donations and Task Donations?
                this.projectService.bulkDeleteProjects(model.projectIds)
                  .subscribe((deleteResult) => { console.log('Projects deleted:', deleteResult); });
              } else {
                // Reassign projects to another Leader (this/Admin)
                // FIXME STOP Mixing Logged in / Profile / User Leader and Leader which is to be deleted
                const newLeader = this.leader;
                const projectsUpdate = this.projectService.bulkUpdateProjects(model.projectIds, {
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
  private finalizeLeaderDeletion(leaderModel: ILeader, navigateToLeadersList = true) {
    // TODO Delete Leader Firebase data
    this.http.delete(this.leaderApiUrl + leaderModel._id)
      .pipe(
        map(res => { return res; }),
        catchError(this.handleError)
      )
      .subscribe((res) => {
        this.setLeaderForUser(null);
        if (navigateToLeadersList) {
          this.router.navigate(['/leaders']);
        }
      });
  }

  // TODO Check if the same can be done for projects
  public gotoLeaderView(leader) {
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
    return Observable.throw(error.json() || 'Server error');
  }
}
