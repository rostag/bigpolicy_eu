import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { ShareService } from './share.service';

@Component({
  selector: 'bp-sharer',
  templateUrl: './sharer.component.html',
  styleUrls: ['./sharer.component.css'],
  providers: [ShareService]
})

export class SharerComponent implements OnInit {

  @Input() project: ProjectModel;

  toEmail: string;
  videoUrl: string;
  // TODO: Add subject generator
  textToReader: string = 'Друже, хочу поділитися з тобою своїм задумом: ';
  showDialog: boolean = false;
  showEmailPreview: boolean = false;
  showHtmlPreview: boolean = false;

  constructor(
    private shareService: ShareService
  ) {}

  ngOnInit() {}

  get emailSubject(): string {
    return 'Проект "' + this.project.title + '" - BigPolicy'
  }

  /**
   * Share this project
   * @param {project} Project being viewed
   */
  private shareProject() {
    // Populate email properties on project before share;
    this.project.email = this.getProjectEmail();
    this.project.email.toEmails[this.toEmail] = this.toEmail;

    this.shareService.shareProject(this.project)
      .subscribe(
        data => { console.log('Project Shared', data) },
        err => (err) => console.error('Project creation error: ', err),
        () => {}
      );

    return false;
  }

  get previewHtml() {
    return this.getProjectEmail().html;
  }

  private getUrl() {
    return location.href;
  }

  getYouTubeThumbnail(url, thumbType: string) {
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
  getYouTubeId(url: string = ''): string{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : null;
  }

  private getProjectEmail() {
    // Populate email properties on project before share or preview;
    let contentHtml =
        this.textToReader
      + `<h1 align="center">
      `
      + this.project.title + `</h1>
      <p>
      `
      + this.project.description + `<br><br></p><p align="center">
      `
      + this.getYouTubeThumbnail(this.videoUrl, `full`)
      + `<br><br>
      <a href="` + this.getUrl() + `">Тут можна детальніше переглянути проект</a><br><br></p><p>

      Щиро вдячний,<br>` + this.project.managerName + `<br>
      <small>` + this.project.managerId + `</small></p>`
      + `
      <a href="http://bigpolicy.eu/"><img src="http://bigpolicy.eu/assets/img/logo.png" width="40"></a>`;

    let contentHtmlVideo = `<!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>`
      + this.emailSubject +

      `
      </title>

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
              <source src="m.mp4" type="video/mp4">
              <source src="m.ogg" type="video/ogg">
                <a href="#" ><img height="176"
                  src="" width="320" /></a>
          </video>
      </div>
      <div class="android" style="display:none; width:0px; height:0px; overflow:hidden;">
        <p>Android Div</p>
        <a href="#" ><img height="176"
          src="i.jpg" width="320" /></a>
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

  private showSharer() {
    this.showDialog = !this.showDialog;
    return false;
  }

  private toggleEmailPreview() {
    this.showEmailPreview = !this.showEmailPreview;
    return false;
  }

  private toggleHtmlPreview() {
    this.showHtmlPreview = !this.showHtmlPreview;
    return false;
  }
}
