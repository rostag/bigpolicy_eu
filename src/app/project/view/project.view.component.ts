import { Component } from '@angular/core';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'project-view',
  templateUrl: './project.view.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './project.view.component.css'],
  providers: [ProjectService, UserService]
})

export class ProjectViewComponent {

  project: ProjectModel = new ProjectModel()

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private user: UserService
  ){}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('View Project by ID from route params:', id)
        this.loadProject(id);
      })
  }

  loadProject(id) {
    if (id) {
      this.projectService.getProject(id)
      .subscribe(
        data => {
          this.setProject(data)
        },
        err => console.error(err),
        () => {}
      )
    }
  }

  /**
   * Project loading handler
   * @param {data} Loaded project data
   */
  setProject(data){
    this.project = data;
  }

  /**
   * Remove this project
   * @param {project} Project being viewed
   */
  private deleteProject(project: ProjectModel) {
    // Delete from DB
    this.projectService.deleteProject(project)

    this.router.navigate(['/projects'])
    return false;
  }

  /**
   * Share this project
   * @param {project} Project being viewed
   */
  private shareProject() {
    // Update in from DB
    // project.shareCount++;
    // TODO: this.projectService.updateProject(project);

    this.projectService.shareProject(this.project)
    .subscribe(
      data => { console.log('Project Shared', data) },
      err => (err) => console.error('Project creation error: ', err),
      () => {}
    )

    return false;
  }
}
