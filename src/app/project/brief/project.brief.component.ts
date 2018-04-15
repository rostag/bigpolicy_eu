import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { UserService } from '../../shared/user/user.service';
import { IProject } from '../../common/models';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project.brief.component.html',
  styleUrls: ['./project.brief.component.scss']
})
export class ProjectBriefComponent implements OnChanges {

  @Input() projectId = '';
  @Input() project: IProject = new ProjectModel();
  @Input() viewContext = '';

  // Whether it has visual like image or video or it hasn't
  hasVisual = false;

  constructor(
    public userService: UserService,
    private projectService: ProjectService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectId && changes.projectId.currentValue) {
      // console.log('Get project by ID:', changes.projectId.currentValue);
      if (!this.project || !this.project._id || !this.project.managerId) {
        this.requestProject(changes.projectId.currentValue);
      }
    }
  }

  private requestProject(id) {
    this.projectService.getProject(id)
    .subscribe(
      (data) => {
        // console.log('Got a Project:', data);
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
