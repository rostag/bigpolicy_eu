import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { UserService } from '../../shared/user/user.service';
import { LeaderService } from '../../shared/leader/leader.service';
import { LeaderModel } from '../../shared/leader/leader.model';
import { Location } from '@angular/common';

@Component({
  templateUrl: './project.edit.component.html',
  styleUrls: ['./project.edit.component.scss']
})

export class ProjectEditComponent implements OnInit {

  get showTasks(): boolean {
      return this.isUpdateMode;
  };

  isUpdateMode = false;

  project: ProjectModel;

  // Used for changing leaders by admin
  leaders: Array<LeaderModel> = null;
  selectedLeader: LeaderModel = new LeaderModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private leaderService: LeaderService,
    private location: Location,
    public userService: UserService
  ) {
    this.project = new ProjectModel();
  }

  /**
   * Initialization Event Handler, used to parse route params
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
            .subscribe((data: ProjectModel) => {
              this.project = new ProjectModel();
              this.project.parseData(data);
            },
            err => console.error(err),
            () => {}
          );
        }
      }
    );
  }

  /**
   * Remove this project
   * @param {project} Project being viewed
   */
  private deleteProject(project: ProjectModel) {
    // Delete from DB
    this.projectService.deleteProject(project);

    this.router.navigate(['/projects']);
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
      this.selectedLeader = this.leaderService.leader;
      this.projectService.updateProject(this.project)
      .subscribe(
        data => { this.gotoProject(data); },
        err => (er) => console.error('Project update error: ', er),
        () => {}
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
        () => {}
      );
    }
    return false;
  }

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

  requestLeaders() {
    // this.userService.isAdmin()
    this.leaderService.getLeadersPage(null, null, 1, 100, '{}')
      .subscribe((res) => {
        this.leaders = res['docs'];
        console.log('got leaders: ', this.leaders);
        for (const d in this.leaders) {
          if ( this.leaders.hasOwnProperty(d)) {
            console.log('got leader: ', this.leaders[d]._id, this.leaders[d].name);
          }
        }
      });
  }

  setNewLeader(event) {
    const l = event.value;
    console.log(`set new laders `, l);
    this.project.managerId = l._id;
    this.project.managerName = l.name + ' ' + l.surName;
    this.project.managerEmail = l.email;
  }

}
