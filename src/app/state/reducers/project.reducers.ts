import { Action, createSelector, createFeatureSelector, State } from '@ngrx/store';
import { ProjectAction, ProjectActionTypes } from '../actions/project.actions';
import { IProject, IProjectResponsePage } from '../../common/models';

// --------------------------------------------------------------------------------------------------------------------
// Store
// --------------------------------------------------------------------------------------------------------------------

// The AuthState iterface describes the structure of the auth store we create
export interface IProjectState {
  projects: IProject[];
  selectedProjectId: string;
  projectsById: IProject[];
  projectsPage: IProjectResponsePage;
}

// The initial state of the auth store
const initialState: IProjectState = {
  projects: [],
  selectedProjectId: null,
  projectsById: [],
  projectsPage: null
};

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
  state: IProjectState = initialState,
  action: ProjectAction
): IProjectState {

  switch (action.type) {

    case ProjectActionTypes.PROJECT_SELECT:
      return { ...state, selectedProjectId: action.payload };

    case ProjectActionTypes.PROJECT_LOAD_SUCCESS:
      const loadedProject: IProject = { ...action.payload };
      const newState = { ...state, selectedProjectId: loadedProject._id };
      if (newState.projects && newState.projects.indexOf(loadedProject) === -1) {
        const projectsById = [...newState.projectsById];
        projectsById[newState.selectedProjectId] = { ...loadedProject };
        return {
          ...newState,
          projects: [...newState.projects, loadedProject],
          projectsById: <IProject[]>projectsById,
          selectedProjectId: newState.selectedProjectId
        };
      }
      return newState;

    case ProjectActionTypes.PROJECTS_PAGE_LOAD_SUCCESS:
      const newProjects: IProject[] = [];
      const responseData: IProjectResponsePage = action.payload;
      if (responseData && responseData.docs && responseData.docs) {
        responseData.docs.forEach(doc => {
          if (state.projects.indexOf(doc) === -1) {
            newProjects.push(doc);
          }
        });
      }

      const nState = { ...state, projects: [...newProjects], projectsPage: { ...action.payload } };
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
export const getProjectsState = createFeatureSelector<IProjectState>('projectsState');
export const getProjects = createSelector(getProjectsState, (state: IProjectState) => state.projects);
export const getProjectsById = createSelector(getProjectsState, (state: IProjectState) => state.projectsById);
export const getProjectsPage = createSelector(getProjectsState, (state: IProjectState) => state.projectsPage);
export const getSelectedProjectId = createSelector(getProjectsState, (state: IProjectState) => state.selectedProjectId);
export const getSelectedProject = createSelector(getProjectsState, getSelectedProjectId,
  (state: IProjectState, selectedProjectId: string) => state.projectsById[selectedProjectId]
);
