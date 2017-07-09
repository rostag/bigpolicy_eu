import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { UserService } from '../../shared/user';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project.brief.component.html',
  styleUrls: ['./project.brief.component.scss']
})
export class ProjectBriefComponent implements OnChanges {

  @Input() projectId = '';
  @Input() viewContext = '';

  hasVisual = false;

  project: ProjectModel = new ProjectModel();

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes) {
    if (changes.projectId && changes.projectId.currentValue) {
      console.log('Get project BY ID:', changes.projectId.currentValue);
      this.requestProject(changes.projectId.currentValue);
    }
  }

  requestProject(id) {
    this.projectService.getProject(id)
    .subscribe(
      (data) => {
        console.log('Got a Project:', data);
        this.project = data;
        this.hasVisual = Boolean(this.project.imageUrl) || Boolean(this.project.videoUrl);
        this.cd.detectChanges();
      },
      err => console.error(err),
      () => {}
    );
  }

  /**
   * Remove this project
   * @param {project} Project being viewed
   */
  deleteProject(project: ProjectModel) {
    // Delete from DB
    this.projectService.deleteProject(project, true);
    return false;
  }

}
