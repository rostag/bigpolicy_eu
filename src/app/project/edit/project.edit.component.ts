import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { LeaderService } from '../../shared/leader/leader.service';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { ILeader, IProject } from '../../common/models';
import { LeaderModel } from '../../shared/leader';
import { Store } from '@ngrx/store';
import { ILeaderState } from '../../state/reducers/leader.reducers';
import { UpdateLeader } from '../../state/actions/leader.actions';
import { IProjectState, getSelectedProject } from '../../state/reducers/project.reducers';
import { CreateProject, UpdateProject, LoadProject } from '../../state/actions/project.actions';
import { UserService } from '../../shared/user/user.service';


@Component({
  templateUrl: './project.edit.component.html',
  styleUrls: ['./project.edit.component.scss']
})

export class ProjectEditComponent implements OnInit {

  get showTasks(): boolean {
    return this.isUpdateMode;
  };

  // If true, editor is used on existing item, false if used for thecreation of new one
  isUpdateMode = false;

  project: IProject;

  // FIXME Used for changing leaders by admin - need to extract it to separate component
  public leadersToMoveProjectTo: ILeader[] = null;
  currentLeader: ILeader = new LeaderModel();

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private leaderService: LeaderService,
    private location: Location,
    private leaderStore: Store<ILeaderState>,
    private projectStore: Store<IProjectState>
  ) {
    this.project = new ProjectModel();
  }

  /**
   * Initialization event handler parses route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isUpdateMode = true;
        this.projectStore.dispatch(new LoadProject(params.id))
      }
    });
    // TODO Consider Getting by ID:
    this.projectStore.select(getSelectedProject).subscribe(prj => this.setProject(prj));
  }

  private setProject(data: IProject) {
    this.project = new ProjectModel();
    this.project.parseData(data);
  }

  /**
   * Removes this project and it's tasks (giving user a choice to move it, see service implementation)
   * @param {project} Project being viewed
   */
  private deleteProject(project: IProject) {
    // Delete from DB
    this.projectService.deleteProject(project, true);
    return false;
  }

  /**
   * Saves new or edited project by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Project processing
  saveProject(): boolean {
    if (this.isUpdateMode) {
      // Update existing project
      this.projectStore.dispatch(new UpdateProject(this.project));
    } else {
      // Create new project
      // FIXME - Potential Race Condition
      const leader = this.leaderService.leader;
      if (!leader) { return false };
      this.project.managerId = leader._id;
      this.project.managerEmail = leader.email;
      this.project.managerName = leader.name + ' ' + leader.surName;
      this.projectStore.dispatch(new CreateProject(this.project));
    }
    return false;
  }

  cancelEditing() {
    this.location.back();
  }

  /**
   * Loads available Leaders to assign the project to
   */
  // FIXME Move to service / component
  requestLeadersToSelectFrom() {
    // this.userService.isAdmin
    // FIXME NGRX IT LP
    this.leaderService.getLeadersPage({ id: null, page: 1, pageSize: 100, dbQuery: '{}' })
      .subscribe((res) => {
        this.leadersToMoveProjectTo = res['docs'];
        console.log('got leadersToMoveProjectTo: ', this.leadersToMoveProjectTo);
        for (const d in this.leadersToMoveProjectTo) {
          if (this.leadersToMoveProjectTo.hasOwnProperty(d)) {
            console.log('Got leader: ', this.leadersToMoveProjectTo[d]._id, this.leadersToMoveProjectTo[d].name);
            if (this.project.managerId === this.leadersToMoveProjectTo[d]._id) {
              // Memorize current leader for later usage - we'll remove project from him:
              this.currentLeader.parseData(this.leadersToMoveProjectTo[d]);
            }
          }
        }
      });
  }

  /**
   * Assigns project to another leader
   */
  // FIXME NGRX IT
  moveProjectToOtherLeader(event) {
    const newLeader: ILeader = new LeaderModel();
    newLeader.parseData(event.value);
    console.log(`> Move Project to: `, newLeader.email);

    // Update Project:
    this.project.managerId = newLeader._id;
    this.project.managerName = newLeader.name + ' ' + newLeader.surName;
    this.project.managerEmail = newLeader.email;
    this.saveProject();

    // Add project to new Leader:
    if (newLeader.projectIds.indexOf(this.project._id) === -1) {
      newLeader.projectIds.push(this.project._id);
      this.leaderStore.dispatch(new UpdateLeader(newLeader));
    }
    // Remove project from current Leader:
    this.currentLeader.projectIds.splice(this.currentLeader.projectIds.indexOf(this.project._id), 1);
    this.leaderStore.dispatch(new UpdateLeader(this.currentLeader));
  }
}
