import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
    LeaderAction, LeaderActionTypes, LoadLeaderSuccess, LoadLeaderFail, CreateLeaderSuccess,
    CreateLeaderFail, DeleteLeaderFail, DeleteLeaderSuccess, DeleteLeader, UpdateLeader, UpdateLeaderFail,
    UpdateLeaderSuccess, CreateLeader, LoadLeader, LoadLeadersPage, LoadLeadersPageSuccess, LoadLeadersPageFail
} from '../actions/leader.actions';
import { LeaderService } from '../../shared/leader';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LeaderEffects {

    @Effect() $createLeader: Observable<LeaderAction> = this.$actions.pipe(
        ofType(LeaderActionTypes.LEADER_CREATE),
        mergeMap((action: CreateLeader) =>
            this.leaderService.createLeader(action.payload).pipe(
                map(data => new CreateLeaderSuccess(data)),
                catchError(err => of(new CreateLeaderFail(err)))
            )
        )
    );

    @Effect() $loadLeader: Observable<LeaderAction> = this.$actions.pipe(
        ofType(LeaderActionTypes.LEADER_LOAD),
        mergeMap((action: LoadLeader) =>
            this.leaderService.getLeader(action.payload).pipe(
                map(data => new LoadLeaderSuccess(data)),
                catchError(err => of(new LoadLeaderFail(err)))
            )
        )
    );

    @Effect() $updateLeader: Observable<LeaderAction> = this.$actions.pipe(
        ofType(LeaderActionTypes.LEADER_UPDATE),
        mergeMap((action: UpdateLeader) =>
            this.leaderService.updateLeader(action.payload).pipe(
                map(data => {
                    this.leaderService.gotoLeaderView(data);
                    return new UpdateLeaderSuccess(data);
                }),
                catchError(err => of(new UpdateLeaderFail(err)))
            )
        )
    );

    @Effect() $deleteLeader: Observable<LeaderAction> = this.$actions.pipe(
        ofType(LeaderActionTypes.LEADER_DELETE),
        mergeMap((action: DeleteLeader) =>
            this.leaderService.deleteLeader(action.payload).pipe(
                map(data => new DeleteLeaderSuccess(data)),
                catchError(err => of(new DeleteLeaderFail(err)))
            )
        )
    );

    // TODO Look to update it to @Effect() $loadLeadersPage: Observable<LoadLeadersPage> = this.$actions.pipe(
    @Effect() $loadLeadersPage: Observable<LeaderAction> = this.$actions.pipe(
        ofType(LeaderActionTypes.LEADERS_PAGE_LOAD),
        mergeMap((action: LoadLeadersPage) =>
            this.leaderService.getLeadersPage(action.payload).pipe(
                map(data => new LoadLeadersPageSuccess(data)),
                catchError(err => of(new LoadLeadersPageFail(err)))
            )
        )
    );

    constructor(
        private leaderService: LeaderService,
        private $actions: Actions
    ) { }
}
