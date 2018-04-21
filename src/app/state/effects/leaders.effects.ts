import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LeadersAction, LeadersActionTypes, LoadLeadersSuccess, LoadLeaderSuccess, LoadLeaderFail } from '../actions/leaders.actions';
import { LeaderService } from '../../shared/leader';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LeaderEffects {

    @Effect() $loadLeaderrrr: Observable<LeadersAction> = this.$actions.pipe(
        ofType(LeadersActionTypes.LEADER_LOAD),
        mergeMap((action: LeadersAction) =>
            this.leaderService.getLeader(action.payload).pipe(
                map(data => new LoadLeaderSuccess(data)),
                catchError(err => of(new LoadLeaderFail(err)))
            )
        )
    )

    constructor(
        private leaderService: LeaderService,
        private $actions: Actions
    ) { }
}