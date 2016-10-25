import { Component, OnInit, Input, AfterViewChecked, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { ShareService } from './share.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'bp-sharer',
  templateUrl: './sharer.component.html',
  styleUrls: ['./sharer.component.css'],
  providers: [ShareService],
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('1 => 0', animate('200ms')),
      transition('0 => 1', animate('500ms'))
    ])
  ]
})

// TODO: Add subject generator

export class SharerComponent implements OnInit {

  @Input() isVisible: boolean = false;

  @Input() project: ProjectModel;

  animationDone(e){
    console.log('e1', e);
    this.dialogShown = e.toState;
    console.log('e2', this.dialogShown);
  }

  dialogShown = false;
  state = '';
  emailSent: boolean = false;
  emailSendError;

  toEmail: string;
  textToReader: string = 'Друже, хочу поділитися з тобою своїм задумом: ';

  showEmailPreview: boolean = false;
  showHtmlPreview: boolean = false;

  shareForm: NgForm;
  @ViewChild('shareForm') currentForm: NgForm;

  // Model to be shared.
  // Here, the videoUrl may be overridden before share:
  emailToShare: any = {
    from: '',
    toEmails: {},
    subject: '',
    html: '',
    videoUrl: ''
  }

  formState(stateName){
    return this.state === stateName;
  }

  ngAfterViewChecked() {
   this.formChanged();
  }

  formChanged() {
   if (this.currentForm === this.shareForm) { return; }
   this.shareForm = this.currentForm;
   if (this.shareForm) {
     this.shareForm.valueChanges
       .subscribe(data => this.onValueChanged(data));
   }
  }

  handleInputBlur(e){
    this.onValueChanged(e);
  }

  onValueChanged(data?: any) {
   if (!this.shareForm) { return; }
   const form = this.shareForm.form;

   for (const field in this.formErrors) {
     // clear previous error message (if any)
     this.formErrors[field] = '';
     const control = form.get(field);

     if (control && (control.dirty || control.touched) && !control.valid) {
       const messages = this.validationMessages[field];
       for (const key in control.errors) {
         this.formErrors[field] += messages[key] + ' ';
       }
     }
   }
  }

  formErrors = {
    'toEmail': ''
  };

  validationMessages = {
    'toEmail': {
      'required': 'Будь ласка, заповніть поле',
      'validateEmail': 'Будь ласка, уведіть коректну адресу'
    }
  };

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
    if (!this.shareForm.form.valid) {
      this.state = 'formIsNotComplete';
      return false;
    }

    this.state = 'emailIsBeingSent';

    // Populate email properties on before share;
    this.emailToShare.html = this.emailHtml;
    this.emailToShare.from = this.project.managerId;
    this.emailToShare.subject = this.emailSubject;
    this.emailToShare.toEmails[this.toEmail] = this.toEmail;

    this.shareService.shareProject(this.emailToShare)
      .subscribe(
        data => {
          this.state = 'emailSent';
          console.log('Project Shared', data)
        },
        err => (err) => {
          this.state = 'emailSendError';
          console.error('Project creation error: ', err)
        },
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
    this.isVisible = !this.isVisible;
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
