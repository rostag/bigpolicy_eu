import { Component, Input, OnChanges } from '@angular/core';
import { ProjectModel, ProjectService } from '../../shared/project/index';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project.brief.component.html',
  styleUrls: ['./project.brief.component.css']
})
export class ProjectBriefComponent implements OnChanges {

  @Input() projectId = '';

  project: ProjectModel = new ProjectModel();

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnChanges(changes) {
    if (changes.projectId) {
      if (changes.projectId.currentValue = 'random') {
        console.log('Get random project');
        this.requestProject(this.projectId);
      }
    }
  }

  requestProject(id) {
    this.projectService.getProject(id)
    .subscribe(
      (data) => {
          this.project = data;
      },
      err => console.error(err),
      () => {}
    );
  }
}
