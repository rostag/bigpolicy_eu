import { throwError as observableThrowError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';
import { ProjectService } from '../project';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from 'app/../environments/env.config';
import { ILeader, ILeaderResponsePage, IDataPageRequest } from '../../common/models';

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

  // FIXME TO NGRX LDR - store selected leader from here
  public set leader(leader: ILeader) {
    this._leader = leader;
  };

  private models;
  private _leader: ILeader;
  private leaderApiUrl = environment.api_url + '/api/leader-api/';
  private leaderSource = new BehaviorSubject<ILeader>(this.leader);
  public leaderStream = this.leaderSource.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService
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
    }
  }

  /**
   * Seaches for leader by user email in DB
   * If found, saves it via callback as userService.leader propery.
   */
  public requestLeaderByEmail(email: string): Observable<ILeaderResponsePage> {
    // let leader: any = this.findCachedLeaderByEmail(email);
    // if (leader) {
    //   leader = of({leader});
    // }

    console.log('LeaderService:RequestLeader ByEmail:', email);

    // FIXME NGRX IT LP
    const leaderResponse = this.getLeadersPage({id: null, page: 1, pageSize: 1, dbQuery: '{ "email": "' + email + '" }'});
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
   * @param model ILeader A Leader to update
   */
  public updateLeader(model: ILeader): Observable<ILeader> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put<ILeader>(this.leaderApiUrl + model._id, model.toString(), {headers: headers})
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a model by performing a request with DELETE HTTP method.
   * @param model ILeader A Leader to delete
   * @param navigateToList
   */
  public deleteLeader(model: ILeader, navigateToList = true): Observable<boolean> {
    // Show Delete Confirmation Dialog
    const dialogResult = this.dialogService.confirm('Точно видалити?',
      'Ця дія незворотня, продовжити?', 'Видалити', 'Відмінити');

    dialogResult.subscribe(toDelete => {
      if (toDelete === true) {
        // Delete Leader immediately and, if there are projects, re-assign them to other Leader (admin)
        this.finalizeLeaderDeletion(model, navigateToList);

        if (model.projectIds && model.projectIds.length > 0) {
          this.dialogService.confirm('Що робити з проектами?',
            `У лідера є проекти. Видалити їх, чи залишити у системі, передавши
            до тимчасової адміністрації?`, 'Видалити', 'Залишити у системі')
            .subscribe(toDeleteProjects => {
              if (toDeleteProjects === true) {
                // Delete Projects and Tasks in DB
                // TODO delete projects fbs, donations and task donations data
                this.projectService.bulkDeleteProjects(model.projectIds)
                  .subscribe((deleteResult) => {
                    console.log('Projects deleted:', deleteResult);
                  });
              } else {
                // Reassign projects to another Leader (this/Admin)
                // FIXME STOP Mixing Logged in / Profile / User Leader and Leader which is to be deleted
                const newLeader = this.leader;
                const projectsUpdate = this.projectService.bulkUpdateProjects(model.projectIds, {
                  managerId: newLeader._id,
                  managerEmail: newLeader.email,
                  managerName: newLeader.name + ' ' + newLeader.surName
                });
                projectsUpdate.subscribe((updateResult) => {
                  console.log('Projects update result:', updateResult);
                });
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
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.setLeaderForUser(null);
        if (navigateToLeadersList) {
          this.router.navigate(['/leaders']);
        }
      });
  }

  // TODO Check if the same can be done for projects
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
    // FIXME Depersonation happens, check admin editing different leaders, see Profile for each
    this.leader = leader;
    this.leaderSource.next(leader);
  }

  private handleError(error: Response) {
    return observableThrowError(error.json() || 'Server error');
  }
}
