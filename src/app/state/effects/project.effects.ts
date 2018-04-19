import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action } from "rxjs/scheduler/Action";
import { HttpClient } from "selenium-webdriver/http";
import { ProjectActionTypes, LoadProjectFail, LoadProjectSuccess, ProjectAction } from "../actions/project.actions";
import { mergeMap, map } from "rxjs/operators";
import { ProjectService } from "../../shared/project";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class ProjectEffects {

    @Effect() $loadProjects: Observable<ProjectAction> = this.$actions.pipe(
        ofType(ProjectActionTypes.PROJECT_LOAD),
        mergeMap((action: ProjectAction) =>
            this.projectService.getProject(action.payload).pipe(
                map(data => new LoadProjectSuccess(data)),
                catchError(err => of(new LoadProjectFail(err)))
            )
        )
    )

    constructor(
        private projectService: ProjectService,
        private $actions: Actions
    ) { }
}