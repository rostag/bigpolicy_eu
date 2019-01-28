import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/user/user.service';
import {ProjectModel} from '../../shared/project';
import {IProject} from '../../common/models';
import {Store, select} from '@ngrx/store';
import {IProjectState, getSelectedProject} from '../../state/reducers/project.reducers';
import {SelectProject, LoadProject, DeleteProject} from '../../state/actions/project.actions';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-project-view',
  templateUrl: './project.view.component.html',
  styleUrls: ['./project.view.component.scss']
})

export class ProjectViewComponent implements OnInit {

  // Whether it has visual like image or video or it hasn't
  public hasVisual = false;

  public project: IProject;
  // FIXME Apply this solution to all other cases of the ProjectModel
  // project: IProject = new ProjectModel();
  public project$: BehaviorSubject<IProject> = new BehaviorSubject(null);

  public fundratio = 0;

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private projectStore: Store<IProjectState>
  ) {
    // this.projectStore.pipe(select(getProjectsState))
    //   .subscribe((pState: IProjectState) => {
    //     const selectedProject = pState.projectsById[pState.selectedProjectId];
    //     this.project$.next(selectedProject)
    //     this.setProject(selectedProject);
    //   });
    this.projectStore.pipe(select(getSelectedProject))
      .subscribe((selectedProject: IProject) => {
        this.project$.next(selectedProject);
        this.setProject(selectedProject);
      });
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  public ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => this.loadProject(id));
  }

  private setProject(data: IProject) {
    this.project = new ProjectModel();
    this.project.parseData(data);
    this.hasVisual = !!(this.project && (this.project.imageUrl || this.project.videoUrl));
    this.fundratio = this.project.totalDonationsReceived / this.project.cost * 100;
  }

  private loadProject(id) {
    if (id) {
      this.projectStore.dispatch(new SelectProject(id));
      this.projectStore.dispatch(new LoadProject(id));
    }
  }

  /**
   * Remove this project
   * @param {project} project IProject being viewed
   */
  deleteProject(project: IProject) {
    this.projectStore.dispatch(new DeleteProject(project));

    return false;
  }
}
