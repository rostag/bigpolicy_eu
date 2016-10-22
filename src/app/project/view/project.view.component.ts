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
  // TODO: Add subject generator
  toEmail: string;
  videoUrl: string;
  previewHtml: string = '<h1>Preview</h1>';
  emailSubject: string = 'Проект "' + this.project.title + '" - BigPolicy';
  textToReader: string = 'Друже, хочу поділитися з тобою своїм задумом: ';

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

  private getYouTubeThumbnail(url, thumbType: string) {
    var urlPrefix = 'http://img.youtube.com/vi/';
    var videoId: string = this.getYouTubeId(url);
    var thumbs: any = {};

    // Standard YouTube Thumbs:
    // 1st: Small (120x90)
    // 2nd: Small (120x90) (Default)
    // 3rd: Small (120x90)
    // Default Thumbnail Image, Full-Size (480x360)
    thumbs = {
      small1: '/1.jpg',
      small2: '/2.jpg',
      small3: '/3.jpg',
      full: '/0.jpg'
    }

    // console.log('Video URL:', url, 'videoId:', videoId, ', thumb: ', urlPrefix + videoId + thumbs[thumbType]);

    return videoId !== null
      ? '<a href="' + this.getUrl() + '" ><img src="' + urlPrefix + videoId + thumbs[thumbType] + '" /></a>'
      : '';
  }

  /**
    * Get video Thumbnail by given yotube URL.
    * Supported URL formats:
      http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
      http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
      http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
      http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
      http://www.youtube.com/embed/0zM3nApSvMg?rel=0
      http://www.youtube.com/watch?v=0zM3nApSvMg
      http://youtu.be/0zM3nApSvMg
      @origin: http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
    */
  private getYouTubeId(url: string = ''): string{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : null;
  }

  private getProjectEmail() {
    // Populate email properties on project before share or preview;
    let contentHtml =
        this.textToReader
      + '<h1 align="center">' + this.project.title + '</h1><p>'
      + this.project.description + '<br><br>'
      + '</p><p align="center"><a href="' + this.getUrl() + '">Тут можна детальніше переглянути проект</a><br><br>'
      + this.getYouTubeThumbnail(this.videoUrl, 'full')
      + '</p><p>Щиро вдячний,<br>' + this.project.managerName + '<br><small>'
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
      subject: this.emailSubject,
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
      );

    return false;
  }

  private showShareDialog() {}

}
