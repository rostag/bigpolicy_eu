import { Action, createSelector, createFeatureSelector, State } from '@ngrx/store';
import { TasksAction, TasksActionTypes } from '../actions/task.actions';
import { ITask, ITaskResponsePage } from '../../common/models';

// --------------------------------------------------------------------------------------------------------------------
// Store
// --------------------------------------------------------------------------------------------------------------------

// The AuthState iterface describes the structure of the auth store we create
export interface ITaskState {
    tasks: ITask[];
    selectedTaskId: string;
    tasksById: ITask[];
    tasksPage: ITaskResponsePage;
}

// The initial state of the auth store
const initialState: ITaskState = {
    tasks: [],
    selectedTaskId: null,
    tasksById: [],
    tasksPage: null
}

// --------------------------------------------------------------------------------------------------------------------
// Reducer
// --------------------------------------------------------------------------------------------------------------------

/**
 * Reducer is a pure function, with input-output only and no side effects. 
 * This is the only one who is allowed to change the state directly, it must return the new state.
 * It will be called automatically in response to store.dispatch() of any action named above.
 * Important: state object MUST be immutable.
 * @param state The previous state.
 * @param action The Action to apply to the state.
 */
export function reducer(
    state: ITaskState = initialState,
    action: TasksAction
): ITaskState {

    switch (action.type) {

        // case TasksActionTypes.TASK_ADD_TASK:
        // return state;

        case TasksActionTypes.TASK_SELECT:
            console.log('Reducer :: Task Select ::', action.payload);
            return { ...state, selectedTaskId: action.payload }


        case TasksActionTypes.TASK_CREATE_SUCCESS:
            console.log('Reducer :: Create Tasks Success ::', action.payload);
            const task: ITask = action.payload;
            state = {
                ...state,
                tasks: [...state.tasks, task],
                tasksById: [...[state.tasksById[task._id] = task]],
                selectedTaskId: task._id
            }
            return state;

        case TasksActionTypes.TASK_LOAD_SUCCESS:
            let newState;
            const loadedTask: ITask = { ...action.payload };
            const s = { ...state };
            if (s.tasks && s.tasks.indexOf(loadedTask) === -1) {
                // Add to tasks
                s.tasks = [...s.tasks, loadedTask];
                // Add to tasks by id
                s.tasksById[s.selectedTaskId] = { ...loadedTask }
                newState = { ...s, tasks: [...s.tasks], selectedTaskId: s.selectedTaskId };
            }
            console.log(':: Reducer :: Load Task Success ::', newState);            
            return newState;

        case TasksActionTypes.LoadTaskPageSuccess:
            const newTasks: ITask[] = [];
            const responseData: ITaskResponsePage = action.payload;
            responseData && responseData.docs && responseData.docs.forEach(doc => {
                if (state.tasks.indexOf(doc) === -1) {
                    newTasks.push(doc)
                }
            })

            const nState = { ...state, tasks: [...newTasks], tasksPage: { ...action.payload } };
            console.log(':: Reducer :: Load TASKS Success ::', nState);
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
export const getTasksState = createFeatureSelector<ITaskState>('tasksState');
export const getTasks = createSelector(getTasksState, (state: ITaskState) => state.tasks);
export const getTasksPage = createSelector(getTasksState, (state: ITaskState) => state.tasksPage);
export const getSelectedTaskId = createSelector(getTasksState, (state: ITaskState) => state.selectedTaskId);
export const getSelectedTask = createSelector(getTasksState, getSelectedTaskId,
    (state: ITaskState, selectedTaskId: string) => state.tasksById[selectedTaskId]
);
