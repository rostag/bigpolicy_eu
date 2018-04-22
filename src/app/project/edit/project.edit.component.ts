import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { ProjectServiceMock } from '../../shared/project/index';
import { UserService } from '../../shared/user/user.service';
import { LeaderService } from '../../shared/leader/leader.service';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { ILeader, IProject } from '../../common/models';
import { LeaderModel } from '../../shared/leader';
import { Store } from '@ngrx/store';
import { ILeaderState } from '../../state/reducers/leader.reducers';
import { UpdateLeader } from '../../state/actions/leader.actions';


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
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private leaderService: LeaderService,
    private location: Location,
    public userService: UserService,
    private leaderStore: Store<ILeaderState>
  ) {
    this.project = new ProjectModel();
  }

  /**
   * Initialization event handler parses route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        // console.log('Project Editor by ID from route params:', id)
        if (id) {
          this.isUpdateMode = true;
          this.projectService.getProject(id)
            .subscribe((data: IProject) => {
              this.project = new ProjectModel();
              this.project.parseData(data);
            },
              err => console.error(err),
              () => { }
            );
        }
      }
      );
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
      // FIXME
      this.projectService.updateProject(this.project)
        .subscribe(
          data => { this.gotoProject(data); },
          err => (er) => console.error('Project update error: ', er),
          () => { }
        );
    } else {
      // Create new project
      // FIXME - Potential Race Condition
      const leader = this.leaderService.leader;
      if (!leader) {
        return false;
      }
      this.project.managerId = leader._id;
      this.project.managerEmail = leader.email;
      this.project.managerName = leader.name + ' ' + leader.surName;
      this.projectService.createProject(this.project)
        .subscribe(
          data => { this.gotoProject(data); },
          err => (er) => console.error('Project creation error: ', er),
          () => { }
        );
    }
    return false;
  }

  /**
   * Finalizes opening of the project.
   */
  gotoProject(project) {
    const projectId = project._id;
    if (projectId) {
      console.log('𝕱 𝕱 𝕱 Go to project by ID: ', projectId);
      this.router.navigate(['/project', projectId]).then(_ => {
        // navigation is done
      });
    }
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
    this.leaderService.getLeadersPage({id: null, page: 1, pageSize: 100, dbQuery: '{}' })
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
