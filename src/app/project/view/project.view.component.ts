import { Component } from '@angular/core';
import { ProjectModel, ProjectService } from '../../shared/project/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'project-view',
  templateUrl: './project.view.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './project.view.component.css'],
  providers: [ProjectService, UserService]
})

export class ProjectViewComponent {

  project: ProjectModel = new ProjectModel()

  // FIXME -- extract to send module
  textToReader: string = 'Друже, хочу поділитися з тобою своїм задумом: ';
  toEmail: string;
  videoLink: string = 'https://www.youtube.com/watch?v=pktGY3qk0LM';
  previewHtml: string = '<h1>Preview</h1>';

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private user: UserService
  ){}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in project/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('View Project by ID from route params:', id)
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

  private previewShare() {
    console.log('Preview: ');
    var emlHtml = this.getProjectEmail().html;

    this.previewHtml = emlHtml;
    return false;
  }

  private getUrl() {
    return location.href;
  }

  private getVideoThumbnail(thumbType: string) {
    var videoUrl = 'https://www.youtube.com/watch?v=pktGY3qk0LM';
    var urlPrefix = 'http://img.youtube.com/vi/';
    var vParamIndex = videoUrl.indexOf('?v=');
    var videoId: string = videoUrl.substring(vParamIndex + 3, 11);
    console.log('Video URL:', videoUrl, 'videoId:', videoId);
    var thumbs: any = {};

    // 1st Thumb, Small (120x90)
    thumbs.small1 = urlPrefix + videoId + '/1.jpg';
    // 2nd Default Thumb, Small (120x90)
    thumbs.small2 = urlPrefix + videoId + '/2.jpg';
    // 3rd Thumbnail Image, Small (120x90)
    thumbs.small3 = urlPrefix + videoId + '/3.jpg';
    // Default Thumbnail Image, Full-Size (480x360)
    thumbs.full = urlPrefix + videoId + '/0.jpg';

    return thumbs[thumbType];
  }

  private getProjectEmail() {
    // Populate email properties on project before share or preview;
    let contentHtml =
      this.textToReader + `
      <h1 align="center">` + this.project.title + `</h1>
      <p>` + this.project.description + `<br>
      <br>
      <p align="center"><a href="` + this.getUrl() + '">Тут можна детальніше переглянути проект</a><br><br>'
      + '<a href="' + this.getUrl() + '" ><img width="320" height="176" src="' + this.getVideoThumbnail('full') + '" /></a>' +
      + '<br><p>Щиро вдячний,<br/>' + this.project.managerName + '<br/><small>'
      + this.project.managerId + '</small></p>'
      + '<img src="http://bigpolicy.eu/assets/img/logo.png" style="width:40px">';

    let contentHtmlVideo = `<!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>`
      + 'Проект "' + this.project.title + '" - BigPolicy' +
      `</title>

      <style type="text/css">

        @media screen and (max-width:800px) {
          div[class=video_holder] {display:none;}
          div[class=android] {display:block !important;width:320px !important;height:176px !important;}
        }

        @media screen and (width:320px), screen and (width:703px){
          div[class=android] {display:none !important;}
          div[class=video_holder] {display:block !important;}
        }

        .ExternalClass div.video_holder {display:none !important;}
        .ExternalClass div.android {display:block !important;width:100% !important;height:200px !important;}

      </style>
      </head>
      <body>
      `

      + contentHtml +

      `
      <div class="video_holder">
        <p>Video Div</p>
          <video width="320" height="176" controls>
              <source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
              <source src="http://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
                <a href="www.emailonacid.com" ><img height="176"
                  src="http://www.emailonacid.com/images/blog_images/Emailology/2013/html5_video/backup_bunny2.jpg" width="320" /></a>
          </video>
      </div>
      <div class="android" style="display:none; width:0px; height:0px; overflow:hidden;">
        <p>Android Div</p>
        <a href="www.emailonacid.com" ><img height="176"
          src="http://www.emailonacid.com/images/blog_images/Emailology/2013/html5_video/backup_bunny2.jpg" width="320" /></a>
      </div>
      </body>
      </html>`;

    let renderedHtmlTemplate = contentHtml;

    return {
      from: this.project.managerId,
      toEmails: {},
      subject: 'Проект "' + this.project.title + '" - BigPolicy',
      html:
        renderedHtmlTemplate
    }
  }

  /**
   * Share this project
   * @param {project} Project being viewed
   */
  private shareProject() {
    // Populate email properties on project before share;
    this.project.email = this.getProjectEmail();
    this.project.email.toEmails[this.toEmail] = this.toEmail;

    this.projectService.shareProject(this.project)
    .subscribe(
      data => { console.log('Project Shared', data) },
      err => (err) => console.error('Project creation error: ', err),
      () => {}
    )
    return false;
  }

  private showShareDialog() {}

}
