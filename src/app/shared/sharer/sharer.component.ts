import { Component, OnInit, Input, AfterViewChecked, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { ShareService } from './share.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bp-sharer',
  templateUrl: './sharer.component.html',
  styleUrls: ['./sharer.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0.2 })),
      transition('1 => 0', animate('600ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ],
  providers: [ShareService]
})

// TODO: Add subject generator

export class SharerComponent implements AfterViewChecked, OnInit {

  @Input() sharerIsVisible = false;

  @Input() project: ProjectModel;

  formStatus = '';
  emailSent = false;
  emailSendError;

  toEmail: string;
  textToReader: string;

  showEmailPreview = true;
  showHtmlPreview = false;

  shareForm: NgForm;

  @ViewChild('shareForm') currentForm: NgForm;

  formErrors = {
    'toEmail': ''
  };

  validationMessages = {
    'toEmail': {
      'required': 'Будь ласка, заповніть поле',
      'validateEmail': 'Будь ласка, уведіть коректну адресу'
    }
  };

  // Model to share. Here, the videoUrl may be overridden before share:
  emailToShare: any = {
    from: '',
    toEmails: {},
    subject: '',
    html: '',
    videoUrl: ''
  };

  constructor(
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.textToReader = 'Друже, хочу поділитися з тобою своїм задумом: ';
  }

  ngAfterViewChecked() {
   this.formChanged();
  }

  getFormState(stateName) {
    return this.formStatus === stateName;
  }

  formChanged() {
   if (this.currentForm === this.shareForm) { return; }
   this.shareForm = this.currentForm;
   if (this.shareForm) {
     this.shareForm.valueChanges
       .subscribe(data => this.onValueChanged(data));
   }
  }

  handleInputBlur(e) {
    this.onValueChanged(e);
  }

  onValueChanged(data?: any) {
   if (!this.shareForm) {
     return;
   }
   const form = this.shareForm.form;

   for (const field in this.formErrors) {
     if (this.formErrors.hasOwnProperty(field)) {
       // clear previous error message (if any)
       this.formErrors[field] = '';
       const control = form.get(field);

       if (control && (control.dirty || control.touched) && !control.valid) {
         const messages = this.validationMessages[field];
         for (const key in control.errors) {
           if (control.errors.hasOwnProperty(key)) {
             this.formErrors[field] += messages[key] + ' ';
           }
         }
       }
     }
   }
  }

  /*
   * Overriding model videoUrl by email videoUrl
   */
  get videoUrl(): string {
    // FIXME it's called too often
    return this.emailToShare.videoUrl || this.project.videoUrl || '';
  };

  set videoUrl(url: string) {
    this.emailToShare.videoUrl = url;
  };

  get emailSubject(): string {
    return 'Проект "' + this.project.title + '" - BigPolicy';
  }

  /**
   * Share this project
   * @param {project} Project being viewed
   */
  shareItem() {
    if (!this.shareForm.form.valid) {
      this.formStatus = 'formIsNotComplete';
      return false;
    }

    this.formStatus = 'emailIsBeingSent';

    // Populate email properties on before share;
    this.emailToShare.html = this.emailHtml;
    this.emailToShare.from = this.project.managerEmail;
    this.emailToShare.subject = this.emailSubject;
    this.emailToShare.toEmails[this.toEmail] = this.toEmail;

    this.shareService.share(this.emailToShare)
      .subscribe(
        data => {
          this.formStatus = 'emailSent';
          console.log('Project Shared', data);
        },
        err => (er) => {
          this.formStatus = 'emailSendError';
          console.error('Project creation error: ', er);
        },
        () => {}
      );

    return false;
  }

  /**
   * Populate email properties on project before share or preview;
   */
  get emailHtml() {
    return  this.textToReader
            + `<h1 align="center" class="emailH1">
            `
            + this.project.title + `</h1>
            <p style="display:none;">
            `
            + this.project.description + `<br><br></p><p align="center">
            `
            + this.shareService.getYouTubeThumbnail(this.videoUrl, `full`)
            +
            `
            <br>
            <br>
            <a href="` + this.shareService.getUrl() + `">Тут можна детальніше переглянути проект</a>
            <br>
            <br>
            </p>
            <p>Щиро вдячний,<br>`
            + this.project.managerName + `<br>
            <small>` + this.project.managerEmail + `</small></p>
            `
            +
            `
            <a href="http://bigpolicy.eu/"><img src="http://bigpolicy.eu/assets/img/logo.png" width="40"></a>`;
  }

  showSharer() {
    this.sharerIsVisible = !this.sharerIsVisible;
    return false;
  }

  private toggleEmailPreview() {
    this.showEmailPreview = !this.showEmailPreview;
    return false;
  }

  toggleHtmlPreview() {
    this.showHtmlPreview = !this.showHtmlPreview;
    return false;
  }
}
