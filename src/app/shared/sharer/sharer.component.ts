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

  // Model to be shared. Here, the videoUrl may be overridden before share:
  emailToShare: any = {
    from: '',
    toEmails: {},
    subject: '',
    html: '',
    videoUrl: ''
  };

  toEmail: string;
  textToReader: string = 'Друже, хочу поділитися з тобою своїм задумом: ';

  showDialog: boolean = false;
  showEmailPreview: boolean = false;
  showHtmlPreview: boolean = false;

  // TODO: Add subject generator

  constructor(
    private shareService: ShareService
  ) {}

  ngOnInit() { }

  /*
   * Overriding model videoUrl by email videoUrl
   */
  get videoUrl(): string {
    // FIXME it's called too often
    return this.emailToShare.videoUrl || this.project.videoUrl || ''
  };

  set videoUrl(url: string) {
    this.emailToShare.videoUrl = url;
  };

  get emailSubject(): string {
    return 'Проект "' + this.project.title + '" - BigPolicy'
  }

  /**
   * Share this project
   * @param {project} Project being viewed
   */
  private shareProject() {
    // Populate email properties on before share;
    this.emailToShare.html = this.emailHtml;
    this.emailToShare.from = this.project.managerId;
    this.emailToShare.subject = this.emailSubject;
    this.emailToShare.toEmails[this.toEmail] = this.toEmail;

    this.shareService.shareProject(this.emailToShare)
      .subscribe(
        data => { console.log('Project Shared', data) },
        err => (err) => console.error('Project creation error: ', err),
        () => {}
      );

    return false;
  }

  /**
   * Populate email properties on project before share or preview;
   */
  private get emailHtml() {
    return  this.textToReader
            + `<h1 align="center">
            `
            + this.project.title + `</h1>
            <p>
            `
            + this.project.description + `<br><br></p><p align="center">
            `
            + this.shareService.getYouTubeThumbnail(this.videoUrl, `full`)
            + `<br><br>
            <a href="` + this.shareService.getUrl() + `">Тут можна детальніше переглянути проект</a><br><br></p><p>

            Щиро вдячний,<br>` + this.project.managerName + `<br>
            <small>` + this.project.managerId + `</small></p>`
            + `
            <a href="http://bigpolicy.eu/"><img src="http://bigpolicy.eu/assets/img/logo.png" width="40"></a>`;
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
