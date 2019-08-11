import {createSelector, createFeatureSelector} from '@ngrx/store';
import {ILeader, ILeaderResponsePage} from '../../shared/models';
import {LeaderAction, LeaderActionTypes} from '../actions/leader.actions';

// Store

// The AuthState interface describes the structure of the auth store we create
export interface ILeaderState {
  leaders: ILeader[];
  selectedLeaderId: string;
  leadersById: ILeader[];
  leadersPage: ILeaderResponsePage;
}

// The initial state of the auth store
const initialState: ILeaderState = {
  leaders: [],
  selectedLeaderId: null,
  leadersById: [],
  leadersPage: null
};

// Reducer

/**
 * Reducer is a pure function, with input-output only and no side effects.
 * This is the only one who is allowed to update the state directly, it must return the updated state.
 * It will be called automatically in response to store.dispatch() of any action named above.
 * Important: state object MUST be immutable.
 * @param state The previous state.
 * @param action The Action to apply to the state.
 */
export function reducer(
  state: ILeaderState = initialState,
  action: LeaderAction
): ILeaderState {

  switch (action.type) {

    case LeaderActionTypes.LEADER_SELECT:
      return {...state, selectedLeaderId: action.payload};

    case LeaderActionTypes.LEADER_LOAD_SUCCESS:
      const loadedLeader: ILeader = {...action.payload};
      const s = {...state};
      if (s.leaders && s.leaders.indexOf(loadedLeader) === -1) {
        s.leaders = [...s.leaders, loadedLeader];
        s.leadersById[loadedLeader._id] = {...loadedLeader};
      }
      return {...s, leaders: [...s.leaders], selectedLeaderId: loadedLeader._id};

    case LeaderActionTypes.LEADERS_PAGE_LOAD_SUCCESS:
      const newLeaders: ILeader[] = [];
      const responseData: ILeaderResponsePage = action.payload;
      if (responseData && responseData.docs && responseData) {
        responseData.docs.forEach(doc => {
          if (state.leaders.indexOf(doc) === -1) {
            newLeaders.push(doc);
          }
        });
      }
      return {...state, leaders: [...newLeaders], leadersPage: {...action.payload}};

    default:
      return state;
  }
}

// Selector functions are used to access the slices of the state from application
// More info on 'createFeatureSelector' and 'createSelector' can be found here:
// https://github.com/ngrx/platform/blob/master/docs/store/selectors.md

// This 'feature' selector selects auth store itself as a feature to be reused in other selectors
export const getLeadersState = createFeatureSelector<ILeaderState>('leadersState');
export const getLeaders = createSelector(getLeadersState, (state: ILeaderState) => state.leaders);
export const getLeadersPage = createSelector(getLeadersState, (state: ILeaderState) => state.leadersPage);
export const getSelectedLeaderId = createSelector(getLeadersState, (state: ILeaderState) => state.selectedLeaderId);
export const getSelectedLeader = createSelector(getLeadersState, getSelectedLeaderId,
  (state: ILeaderState, selectedLeaderId: string) => state.leadersById[selectedLeaderId]
);
