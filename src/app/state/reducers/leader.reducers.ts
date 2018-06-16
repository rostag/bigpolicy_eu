// Import necessary building blocks from the library
import { Action, createSelector, createFeatureSelector, State } from '@ngrx/store';
// import { AuthActionTypes, AuthAction } from '../actions/auth.actions';
import { ILeader, ILeaderResponsePage } from '../../common/models';
import { LeaderAction, LeaderActionTypes } from '../actions/leader.actions';
import { isArray } from 'util';

// --------------------------------------------------------------------------------------------------------------------
// Store
// --------------------------------------------------------------------------------------------------------------------

// The AuthState iterface describes the structure of the auth store we create
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
}

// --------------------------------------------------------------------------------------------------------------------
// Reducer
// --------------------------------------------------------------------------------------------------------------------

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
      console.log('Reducer :: Leader Select ::', action.payload);
      return { ...state, selectedLeaderId: action.payload }

    case LeaderActionTypes.LEADER_LOAD_SUCCESS:
      let newState;
      const loadedLeader: ILeader = { ...action.payload };
      const s = { ...state };
      if (s.leaders && s.leaders.indexOf(loadedLeader) === -1) {
        // Add to leaders
        s.leaders = [...s.leaders, loadedLeader];
        // Add to leaders by id
        s.leadersById[s.selectedLeaderId] = { ...loadedLeader }
        newState = { ...s, leaders: [...s.leaders], selectedLeaderId: s.selectedLeaderId };
      }
      console.log('Reducer :: Load Leader Success ::', state);
      return newState;

    case LeaderActionTypes.LEADERS_PAGE_LOAD_SUCCESS:
      const newLeaders: ILeader[] = [];
      const responseData: ILeaderResponsePage = action.payload;
      responseData && responseData.docs && responseData.docs.forEach(doc => {
        if (state.leaders.indexOf(doc) === -1) {
          newLeaders.push(doc)
        }
      })
      const nState = { ...state, leaders: [...newLeaders], leadersPage: { ...action.payload } };
      console.log(':: Reducer :: Load LEADERS Success ::', nState);
      return nState;

    default:
      return state;
  }
}

// --------------------------------------------------------------------------------------------------------------------
// Selector functions are used to access the slices of the state from application
// More info on 'createFeatureSelector' and 'createSelector' can be found here:
// https://github.com/ngrx/platform/blob/master/docs/store/selectors.md
// --------------------------------------------------------------------------------------------------------------------

// This 'feature' selector selects auth store itself as a feature to be reused in other selectors
export const getLeadersState = createFeatureSelector<ILeaderState>('leadersState');
export const getLeaders = createSelector(getLeadersState, (state: ILeaderState) => state.leaders);
export const getLeadersPage = createSelector(getLeadersState, (state: ILeaderState) => state.leadersPage);
export const getSelectedLeaderId = createSelector(getLeadersState, (state: ILeaderState) => state.selectedLeaderId);
export const getSelectedLeader = createSelector(getLeadersState, getSelectedLeaderId,
  (state: ILeaderState, selectedLeaderId: string) => state.leadersById[selectedLeaderId]
);
