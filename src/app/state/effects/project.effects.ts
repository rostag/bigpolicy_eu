import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action } from "rxjs/scheduler/Action";
import { HttpClient } from "selenium-webdriver/http";
import { ProjectActionTypes, LoadProjectFail, LoadProjectSuccess, ProjectAction, CreateProjectFail, CreateProjectSuccess, UpdateProjectFail, UpdateProjectSuccess, DeleteProjectSuccess, DeleteProjectFail, LoadProjectsPageSuccess, LoadProjectsPageFail } from "../actions/project.actions";
import { mergeMap, map } from "rxjs/operators";
import { ProjectService } from "../../shared/project";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class ProjectEffects {

    @Effect() $createProject: Observable<ProjectAction> = this.$actions
        .pipe(
            ofType(ProjectActionTypes.PROJECT_CREATE),
            mergeMap((action: ProjectAction) =>
                this.projectService
                    .createProject(action.payload)
                    .pipe(
                        map(data => new CreateProjectSuccess(data)),
                        catchError(err => of(new CreateProjectFail(err)))
                    )
            )
        )

    @Effect() $loadProject: Observable<ProjectAction> = this.$actions
        .pipe(
            ofType(ProjectActionTypes.PROJECT_LOAD),
            mergeMap((action: ProjectAction) =>
                this.projectService
                    .getProject(action.payload)
                    .pipe(
                        map(data => new LoadProjectSuccess(data)),
                        catchError(err => of(new LoadProjectFail(err)))
                    )
            )
        )

    @Effect() $updateProject: Observable<ProjectAction> = this.$actions
        .pipe(
            ofType(ProjectActionTypes.PROJECT_UPDATE),
            mergeMap((action: ProjectAction) =>
                this.projectService
                    .updateProject(action.payload)
                    .pipe(
                        map(data => new UpdateProjectSuccess(data)),
                        catchError(err => of(new UpdateProjectFail(err)))
                    )
            )
        )

    @Effect() $deleteProject: Observable<ProjectAction> = this.$actions
        .pipe(
            ofType(ProjectActionTypes.PROJECT_DELETE),
            mergeMap((action: ProjectAction) =>
                this.projectService
                    .deleteProject(action.payload)
                    .pipe(
                        map(data => new DeleteProjectSuccess(data)),
                        catchError(err => of(new DeleteProjectFail(err)))
                    )
            )
        )

    @Effect() $loadProjectsPage: Observable<ProjectAction> = this.$actions
        .pipe(
            ofType(ProjectActionTypes.PROJECTS_PAGE_LOAD),
            mergeMap((action: ProjectAction) =>
                this.projectService
                    .getProjectsPage(action.payload)
                    .pipe(
                        map(data => new LoadProjectsPageSuccess(data)),
                        catchError(err => of(new LoadProjectsPageFail(err)))
                    )
            )
        )

    constructor(
        private projectService: ProjectService,
        private $actions: Actions
    ) { }
}