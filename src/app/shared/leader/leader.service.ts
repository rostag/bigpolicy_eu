import {throwError as observableThrowError, Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DialogService} from '../dialog/dialog.service';
import {ProjectService} from '../project/project.service';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ENV} from 'app/../environments/env.config';
import {ILeader, ILeaderResponsePage, IDataPageRequest} from '../models';
import {Store} from '@ngrx/store';
import {ILeaderState} from '../../state/reducers/leader.reducers';
import {LoadLeaderSuccess} from '../../state/actions/leader.actions';

declare var localStorage: any;

/**
 * Provides the Leader service with methods to create, read, update and delete models.
 */
@Injectable()
export class LeaderService {

  // FIXME NGRX IT
  public get leader(): ILeader {
    return this._leader;
  };

  // FIXME TO NGRX LDR Store selected leader from here
  public set leader(leader: ILeader) {
    this._leader = leader;
  };

  private _leader: ILeader;
  private leaderApiUrl = environment.api_url + '/api/leader-api/';

  private static handleError(error: Response) {
    return observableThrowError(error.json() || 'Server error');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private store: Store<ILeaderState>
  ) {
  }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  public ping(): Observable<any> {
    return this.http.get(`${ENV.BASE_API}leader-api/ping`);
  }

  public pingJwt(): Observable<any> {
    return this.http.get(`${ENV.BASE_API}leader-api/ping-jwt`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  public pingJwtAdmin(): Observable<any> {
    return this.http.get(`${ENV.BASE_API}leader-api/ping-jwt-admin`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  public createLeader(model: ILeader) {
    const body: string = encodeURIComponent(model.toString());
    const headers = new HttpHeaders()
      .set('Authorization', this._authHeader)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<ILeader>(this.leaderApiUrl, body, {headers: headers})
      .pipe(map(data => {
        // Post-FTUX
        localStorage.removeItem('BigPolicyLeaderRegistration');
        this.gotoLeaderView(data);
      }));
  }

  /**
   * Gets Leaders page from DB by given leaderId, groupId, page and limit.
   * by URL like: /api/leader-api/page/:page/:limit/q/:dbQuery
   * Returns an Observable for the HTTP GET request.
   * @param req IDataPageRequest with the following fields:
   *   id       Group to get Leaders for. Unused.
   *   page     Page number.
   *   pageSize Quantity of items to get.
   *   dbQuery  Database search query.
   * @return {Observable<ILeader>} The Observable for the HTTP request.
   */
  public getLeadersPage(req: IDataPageRequest): Observable<ILeaderResponsePage> {
    if (!!req && !!req.page && !!req.pageSize) {
      return this.http.get<ILeaderResponsePage>(
        `${this.leaderApiUrl}page/${req.page}/${req.pageSize}/q/${encodeURIComponent(req.dbQuery)}`
      );
    }
  }

  /**
   * Returns single leader from DB by ID.
   * /api/leader-api/:leaderId
   */
  public getLeader(leaderId: string): Observable<ILeader> {
    if (leaderId) {
      return this.http.get<ILeader>(this.leaderApiUrl + leaderId);
    } else {
      return of(null);
    }
  }

  /**
   * Searches for leader by user email in DB
   * If found, saves it via callback as userService.leader propery.
   */
  public requestLeaderByEmail(email: string): Observable<ILeaderResponsePage> {
    // let leader: any = this.findCachedLeaderByEmail(email);
    // if (leader) {
    //   leader = of({leader});
    // }

    console.log('RequestLeader ByEmail:', email);

    // FIXME NGRX IT LP
    const leaderResponse = this.getLeadersPage({id: null, page: 1, pageSize: 1, dbQuery: `{ "email": "${email}" }`});
    leaderResponse.subscribe((response: any) => {
      if (response && response.name && response.name === 'MongoError') {
        console.warn('Error getting leader by email, response is: ', response);
      } else {
        this.setLeaderForUser(response['docs'][0]);
      }
    });
    return leaderResponse;
  }

  // private findCachedLeaderByEmail(email: string): ILeader {
  //   const leaders = this.models;
  //   let foundLeader;
  //   for (const l in leaders) {
  //     if (leaders[l].email === email) {
  //       foundLeader = leaders[l];
  //     }
  //   }
  //   return foundLeader;
  // }

  /**
   * Updates a model by performing a request with PUT HTTP method.
   * @param model ILeader A Leader to update
   */
  public updateLeader(model: ILeader): Observable<ILeader> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put<ILeader>(this.leaderApiUrl + model._id, model.toString(), {headers: headers})
      .pipe(
        map(res => res),
        catchError(LeaderService.handleError)
      );
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param model ILeader A Leader to delete
   * @param navigateToList
   */
  public deleteLeader(model: ILeader, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm({
      title: 'Точно видалити?',
      message: 'Ця дія незворотня, продовжити?',
      btnOkText: 'Видалити',
      btnCancelText: 'Відмінити'
    });

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Leader immediately and, if there are projects, re-assign them to other Leader (admin)
        this.finalizeLeaderDeletion(model, navigateToList);

        if (model.projectIds && model.projectIds.length > 0) {
          this.dialogService.confirm({
            title: 'Що робити з проектами?',
            message: `У лідера є проекти. Видалити їх, чи залишити у системі, передавши
            до тимчасової адміністрації?`,
            btnOkText: 'Видалити',
            btnCancelText: 'Залишити у системі'
          }).subscribe(toDeleteProjects => {
            if (toDeleteProjects === true) {
              // Delete Projects and Tasks in DB, TODO delete task donations data
              this.projectService.bulkDeleteProjects(model.projectIds)
                .subscribe((deleteResult) => {
                  console.log('Projects deleted:', deleteResult);
                });
            } else {
              // Reassign projects to another Leader (this/Admin)
              // FIXME Check mixing of the logged in, profile, user leader, or leader to be deleted
              const newLeader = this.leader;
              const projectsUpdate = this.projectService.bulkUpdateProjects(model.projectIds, {
                managerId: newLeader._id,
                managerEmail: newLeader.email,
                managerName: `${newLeader.name} ${newLeader.surName}`
              });
              projectsUpdate.subscribe();
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
      .pipe(catchError(LeaderService.handleError))
      .subscribe(() => {
        this.setLeaderForUser(null);
        if (navigateToLeadersList) {
          this.router.navigate(['/leaders']);
        }
      });
  }

  public gotoLeaderView(leader) {
    this.setLeaderForUser(leader);
    if (leader._id) {
      this.router.navigate(['/leader', leader._id]);
    }
  }

  private setLeaderForUser(leader) {
    if (!leader) {
      return;
    }
    // FIXME Issues happen, check admin editing different leaders, see Profile for each
    this.leader = leader;
    this.store.dispatch(new LoadLeaderSuccess(leader));
  }
}
