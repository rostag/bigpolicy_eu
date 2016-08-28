import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectModel, ProjectService } from '../../shared/project/index';
import { UserService } from '../../shared/user/user.service';

import { TaskEditComponent } from '../../task/edit/index';

@Component({
  moduleId: module.id,
  templateUrl: './project.edit.component.html',
  styleUrls: ['./project.edit.component.css'],
  directives: [FORM_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES, TaskEditComponent],
  providers: [MdIconRegistry, ProjectService]
  })

export class ProjectEditComponent {

  private isUpdateMode: boolean = false;
  private isAddingTaskMode: boolean = false;

  project: ProjectModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
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
      this.project.managerName = this.userService.userProfile['name'];
      this.project.managerId = this.userService.userProfile['email'];
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

  addTask(){
    this.isAddingTaskMode = true;
    console.log('Adding task for', this.project.title, ' project, id: ', this.project._id );

    // var tedit = new TaskEditComponent();
  }

}
