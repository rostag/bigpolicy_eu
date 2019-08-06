import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ProjectModel } from '../../shared/project/project.model';
import { UserService } from '../../shared/user/user.service';
import { IProject } from '../../common/models';
import { Store, select } from '@ngrx/store';
import { IProjectState, getSelectedProject } from '../../state/reducers/project.reducers';
import { LoadProject } from '../../state/actions/project.actions';

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
    private cd: ChangeDetectorRef,
    private projectStore: Store<IProjectState>
  ) {
    this.projectStore.pipe(select(getSelectedProject)).subscribe(
      selectedProject => this.applyChanges(selectedProject));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectId && changes.projectId.currentValue) {
      if (!this.project || !this.project._id || !this.project.managerId) {
        this.requestProject(changes.projectId.currentValue);
      } else {
        this.applyChanges(this.project);
      }
    }
  }

  private applyChanges(project: IProject) {
    this.project = project;
    this.hasVisual = !!(this.project && (this.project.imageUrl || this.project.videoUrl));
  }

  private requestProject(id) {
    this.projectStore.dispatch(new LoadProject(id));
  }

}
