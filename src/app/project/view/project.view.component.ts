import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { ProjectModel, ProjectService } from '../../shared/project/index';

@Component({
  selector: 'app-project-view',
  templateUrl: './project.view.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './project.view.component.scss']
})

export class ProjectViewComponent implements OnInit {

  project: ProjectModel = new ProjectModel();

  /**
  * Dependency Injection: route (for reading params later)
  */
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        // console.log('View Project by ID from route params:', id)
        this.loadProject(id);
      });
  }

  loadProject(id) {
    if (id) {
      this.projectService.getProject(id)
        .subscribe((data: ProjectModel) => {
          this.project = new ProjectModel();
          this.project.parseData(data);
          ProjectService.cacheProject(this.project);
        },
        err => console.error(err),
        () => {}
      );
    }
  }

  /**
   * Remove this project
   * @param {project} Project being viewed
   */
  deleteProject(project: ProjectModel) {
    // Delete from DB
    this.projectService.deleteProject(project);

    this.router.navigate(['/projects']);
    return false;
  }

}
