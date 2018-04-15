// Import necessary building blocks from the library
import { Action, createSelector, createFeatureSelector, State } from '@ngrx/store';
// import { AuthActionTypes, AuthAction } from '../actions/auth.actions';
import { ILeader } from '../../common/models';
import { LeadersAction, LeadersActionTypes } from '../actions/leaders.actions';

// --------------------------------------------------------------------------------------------------------------------
// Store
// --------------------------------------------------------------------------------------------------------------------

// The AuthState iterface describes the structure of the auth store we create
export interface ILeadersState {
  leaders: ILeader[];
  selectedLeaderId: string;
  leadersById: ILeader[];
}

// The initial state of the auth store
const initialState: ILeadersState = {
  leaders: [],
  selectedLeaderId: null,
  leadersById: []
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
  state: ILeadersState = initialState,
  action: LeadersAction
): ILeadersState {

  switch (action.type) {

    case LeadersActionTypes.LEADER_SELECT:
      console.log('Reducer :: Leader Select:', action.payload);
      return { ...state, selectedLeaderId: action.payload }

    case LeadersActionTypes.LEADER_LOAD_SUCCESS:
      console.log('Reducer :: Load Leader Success:', action.payload);
      const l = { ...action.payload };
      const s = { ...state };
      if (s.leaders) {
        // Add to leaders
        if (s.leaders.indexOf(l) === -1) {
          s.leaders = [...s.leaders, l];
        }
        // Add to leaders by id
        if (!s.leadersById[s.selectedLeaderId]) {
          s.leadersById[s.selectedLeaderId] = { ...action.payload }
        }
        const r = { ...s, leaders: [...s.leaders], selectedLeaderId: s.selectedLeaderId };
        console.log('Result :::: ', r);
        return r;
      }
      return state;

    case LeadersActionTypes.LEADERS_LOAD_SUCCESS:
      console.log('Reducer :: Load Leaders Success:', action.payload);
      return { ...state, leaders: { ...action.payload } }

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
export const getLeadersState = createFeatureSelector<ILeadersState>('leadersState');
export const getLeaders = createSelector(getLeadersState, (state: ILeadersState) => state.leaders);
export const getSelectedLeaderId = createSelector(getLeadersState, (state: ILeadersState) => state.selectedLeaderId);
export const getSelectedLeader = createSelector(getLeadersState, getSelectedLeaderId,
  (state: ILeadersState, selectedLeaderId: string) => state.leadersById[selectedLeaderId]
);
