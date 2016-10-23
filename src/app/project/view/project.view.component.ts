import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { ProjectModel, ProjectService } from '../../shared/project/index';

@Component({
  selector: 'project-view',
  templateUrl: './project.view.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './project.view.component.css'],
  providers: [ProjectService, UserService]
})

export class ProjectViewComponent {

  project: ProjectModel = new ProjectModel();
  private videoUrl: string = '';
  /**
  * Dependency Injection: route (for reading params later)
  */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private user: UserService,
    private sanitizer: DomSanitizer
  ){}

  get updateVideoUrl() {
    this.videoUrl = this.youTubeId
      ? 'https://www.youtube.com/embed/' + this.youTubeId
      : null;

    // TODO: SECURITY
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  get videoThumbUrl() {
    return this.youTubeId
      ? 'http://img.youtube.com/vi/' + this.youTubeId + '/0.jpg'
      : 'assets/img/project/project-placeholder.png';
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        // console.log('View Project by ID from route params:', id)
        this.loadProject(id);
      })
  }

  loadProject(id) {
    if (id) {
      this.projectService.getProject(id)
      .subscribe(
        data => {
          this.setProject(data)
        },
        err => console.error(err),
        () => {}
      )
    }
  }

  /**
   * Project loading handler
   * @param {data} Loaded project data
   */
  setProject(data){
    this.project = data;
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

  get youTubeId() {
    if (!this.project.videoUrl) {
      return null;
    }
    var match = this.project.videoUrl.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    return (match && match[7].length == 11) ? match[7] : null;
  }
}
