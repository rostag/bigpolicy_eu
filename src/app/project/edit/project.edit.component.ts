import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel } from '../../shared/project/project.model';
import { LeaderService } from '../../shared/leader/leader.service';
import { Location } from '@angular/common';
import { ILeader, IProject } from '../../shared/models';
import { LeaderModel } from '../../shared/leader/leader.model';
import { Store } from '@ngrx/store';
import { ILeaderState } from '../../state/reducers/leader.reducers';
import { UpdateLeader } from '../../state/actions/leader.actions';
import { IProjectState, getSelectedProject } from '../../state/reducers/project.reducers';
import { CreateProject, UpdateProject, LoadProject, SelectProject } from '../../state/actions/project.actions';
import { UserService } from '../../shared/user/user.service';

@Component({
  templateUrl: './project.edit.component.html',
  styleUrls: ['./project.edit.component.scss']
})

export class ProjectEditComponent implements OnInit {

  get showTasks(): boolean {
    return this.isUpdateMode;
  };

  // if true, editor is used on existing item, false if used for thecreation of new one
  isUpdateMode = false;

  project: IProject;

  // need to extract it to separate component
  public leadersToMoveProjectTo: ILeader[] = null;
  currentLeader: ILeader = new LeaderModel();

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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
        this.projectStore.dispatch(new LoadProject(params.id));
      } else {
        this.projectStore.dispatch(new SelectProject(null));
      }
    });
    // TODO Consider Getting by ID:
    this.projectStore.select(getSelectedProject).subscribe(prj => {
      this.setProject(prj);
    });
  }

  private setProject(project: IProject) {

    this.project = new ProjectModel();
    this.project.parseData(project);
  }

  /**
   * Saves new or edited project by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Project processing
  saveProject(): boolean {
    const leader = this.leaderService.leader;
    // FIXME TO NGRX LDR
    // this.leaderStore.select(getSelectedLeader).subscribe(l => {
    //   leader = l;
    //   return l;
    // });

    if (this.isUpdateMode) {
      // Update existing project
      this.projectStore.dispatch(new UpdateProject(this.project));
    } else {
      // Create new project
      // FIXME Potential Race Condition
      if (!leader) {
        return false;
      }
      this.project.managerId = leader._id;
      this.project.managerEmail = leader.email;
      this.project.managerName = `${leader.name} ${leader.surName}`;
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
    this.leaderService.getLeadersPage({id: null, page: 1, pageSize: 100, dbQuery: '{}'})
      .subscribe((res) => {
        this.leadersToMoveProjectTo = res['docs'];
        for (const d in this.leadersToMoveProjectTo) {
          if (this.leadersToMoveProjectTo.hasOwnProperty(d)) {
            if (this.project.managerId === this.leadersToMoveProjectTo[d]._id) {
              // Memorize current leader for later usage - we'll remove project from him:
              this.currentLeader.parseData(this.leadersToMoveProjectTo[d]);
            }
          }
        }
      });
  }

  moveProjectToOtherLeader(event) {
    // FIXME NGRX IT
    const newLeader: ILeader = new LeaderModel();
    newLeader.parseData(event.value);

    // Update Project:
    this.project.managerId = newLeader._id;
    this.project.managerName = `${newLeader.name} ${newLeader.surName}`;
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
