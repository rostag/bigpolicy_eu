import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { IProject } from '../../common/models';
import { Store, select } from '@ngrx/store';
import { IProjectState, getProjectsState } from '../../state/reducers/projects.reducers';
import { SelectProject } from '../../state/actions/projects.actions';

@Component({
  selector: 'app-project-view',
  templateUrl: './project.view.component.html',
  styleUrls: ['./project.view.component.scss']
})

export class ProjectViewComponent implements OnInit {

  // Whether it has visual like image or video or it hasn't
  hasVisual = false;

  project: IProject = new ProjectModel();

  fundratio = 0;

  /**
  * Dependency Injection: route (for reading params later)
  */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private projectStore: Store<IProjectState>
  ) {
    this.projectStore.pipe(select(getProjectsState))
      .subscribe((pState: IProjectState) => {
        this.setProject(pState.projectsById[pState.selectedProjectId]);
      });
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        // console.log('View Project by ID from route params:', id)
        this.projectStore.dispatch(new SelectProject(id));
        this.loadProject(id);
      });
  }

  private setProject(data: IProject) {
    this.project = new ProjectModel();
    this.project.parseData(data);
    this.hasVisual = !!(this.project && (this.project.imageUrl || this.project.videoUrl));
    this.fundratio = this.project.totalDonationsReceived / this.project.cost * 100;
    ProjectService.cacheProject(this.project);
  }

  loadProject(id) {
    if (id) {
      this.projectService.getProject(id)
        .subscribe(
          // this.setProject,
          err => console.error(err),
          () => { }
        );
    }
  }

  /**
   * Remove this project
   * @param {project} Project being viewed
   */
  deleteProject(project: IProject) {
    // Delete from DB
    this.projectService.deleteProject(project, true);

    // this.router.navigate(['/projects']);
    return false;
  }
}
