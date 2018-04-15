import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LeadersAction, LeadersActionTypes } from '../actions/leaders.actions';

@Injectable()
export class LeadersEffects {

    @Effect() $login: Observable<Action> = this.actions$.pipe(
        ofType(LeadersActionTypes.LEADERS_LOAD),
        map((action: LeadersAction) => {
            console.log('Effect: Load Leader', action.payload);
            return ({ type: LeadersActionTypes.LEADERS_LOAD_SUCCESS })
        }));

    constructor(
        public http: HttpClient,
        public actions$: Actions
    ) { }
}