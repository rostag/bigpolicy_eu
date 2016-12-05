import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectModel, ProjectService } from '../../shared/project/index';
import { UserService } from '../../shared/user/user.service';
import { LeaderService } from '../../shared/leader/leader.service';

@Component({
  templateUrl: './project.edit.component.html',
  styleUrls: ['./project.edit.component.scss'],
  providers: [ProjectService, LeaderService]
})

export class ProjectEditComponent {

  get showTasks(): boolean {
      return this.isUpdateMode;
  };

  private isUpdateMode: boolean = false;

  project: ProjectModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private leaderService: LeaderService
  ) {
    this.project = new ProjectModel();
  }

  getLeader() {
    var leader = this.leaderService.getLeaderByEmail(this.userService.userProfile['email']);
    console.log('fousnd leader id: ', leader);
    return leader;
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.leaderService.getLeaders().subscribe();
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('Project Editor by ID from route params:', id)
        if (id) {
          this.isUpdateMode = true;
          this.projectService.getProject(id)
          .subscribe(
            data => {
              this.setProject(data)
            },
            err => console.error(err),
            () => {}
          )
        }
      });
  }

  /**
   * Project loading handler
   * @param {data} Loaded project data
   */
  setProject(data){
    // Immutability
    this.project = new ProjectModel();
    this.project.parseData(data);
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
   * Saves new or edited project by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Project processing
  saveProject(): boolean {
    if (this.isUpdateMode) {
      // Update existing project
      this.projectService.updateProject(this.project)
      .subscribe(
        data => { this.gotoProject(data) },
        err => (err) => console.error('Project update error: ', err),
        () => {}
      )
    } else {
      // Create new project
      // FIXME - Potential Race Condition
      let leader = this.getLeader();
      this.project.managerId = leader._id;
      this.project.managerEmail = leader.email;
      this.project.managerName = leader.name + ' ' + leader.surName;
      this.projectService.createProject(this.project)
      .subscribe(
        data => { this.gotoProject(data) },
        err => (err) => console.error('Project creation error: ', err),
        () => {}
      )
    }
    return false
  }

  gotoProject(project){
    var projectId = project._id
    if (projectId) {
      console.log('𝕱 𝕱 𝕱 Go to project by ID: ', projectId)
      this.router.navigate(['/project', projectId]).then(_ => {
        //navigation is done
      })
    }
  }
}
