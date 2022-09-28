import { Component, Input, AfterViewChecked, ViewContainerRef, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ShareService } from './share.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bp-sharer',
  templateUrl: './sharer.component.html',
  styleUrls: ['./sharer.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0.2})),
      transition('1 => 0', animate('600ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ],
  providers: [ShareService]
})

// TODO: Add subject generator

export class SharerComponent implements AfterViewChecked, OnChanges {

  // Controlled by button — visibility of the compinent
  @Input() sharerIsVisible = false;

  // Can be Project, Leader, Task, etc.
  @Input() itemToShare: any;

  formStatus = '';

  // Error message to display if there's an error of sending email
  emailSendError;

  toEmail: string;

  showEmailPreview = true;

  shareForm: NgForm;

  @ViewChild('shareForm', { static: true }) currentForm: NgForm;

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
  ) {
  }

  ngOnChanges(data?: any): void {
    if (data.itemToShare) {
      this.prepareItemForSharing();
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  getFormState(stateName) {
    return this.formStatus === stateName;
  }

  formChanged() {
    if (this.currentForm === this.shareForm) {
      return;
    }
    this.shareForm = this.currentForm;
    if (this.shareForm) {
      this.shareForm.valueChanges
        .subscribe(() => this.onValueChanged());
    }
  }

  handleInputBlur() {
    this.onValueChanged();
  }

  onValueChanged() {
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
    return this.emailToShare.videoUrl || this.itemToShare.videoUrl || '';
  };

  set videoUrl(url: string) {
    this.emailToShare.videoUrl = url;
  };

  // TODO Make subject manually editable
  get emailSubject(): string {
    return this.itemToShare.subject;
  }

  prepareItemForSharing(): void {
    // this.itemToShare = {
    //   videoUrl: '',
    // };

    // Tasks and Projects have .title property to use in subject
    if (this.itemToShare.hasOwnProperty('title')) {
      // Leaders have .name / surName properties
      this.itemToShare.textToReader = 'Друже, хочу поділитися з тобою своїм задумом: ';
      this.itemToShare.subject = `Проект "${this.itemToShare.title}" - BigPolicy`;
      this.itemToShare.text = this.itemToShare.description;

      this.itemToShare.detailsLink =
        `
      <br><br>
      <a href="${this.shareService.getUrl()}">Тут можна детальніше переглянути проект</a>
      <br><br>
      `;
    } else if (this.itemToShare.hasOwnProperty('name')) {
      // Leader properties 'name' and 'surName'
      this.itemToShare.subject = `${this.itemToShare.name} ${this.itemToShare.surName}`;
      this.itemToShare.text = `${this.itemToShare.mission}<p></p>${this.itemToShare.vision}`;
      this.itemToShare.textToReader = 'Будьмо знайомі: ';
      this.itemToShare.detailsLink =
        `
      <br><br>
      <a href="${this.shareService.getUrl()}">Відвідай мою сторінку на БігПолісі</a>
      <br><br>
      `;
      this.itemToShare.managerName = this.itemToShare.name;
      this.itemToShare.managerEmail = this.itemToShare.email;
    }
  }

  /**
   * Send the form
   */
  shareItem() {
    if (!this.shareForm.form.valid) {
      this.formStatus = 'formIsNotComplete';
      return false;
    }

    this.formStatus = 'emailIsBeingSent';

    // Populate email properties on before share;
    this.emailToShare.html = this.emailHtml;
    this.emailToShare.from = this.itemToShare.managerEmail;
    this.emailToShare.subject = this.emailSubject;
    this.emailToShare.toEmails = {};
    this.emailToShare.toEmails[this.toEmail] = this.toEmail;
    this.emailToShare.videoUrl = this.videoUrl;

    this.shareService.share(this.emailToShare)
      .subscribe(
        () => {
          this.formStatus = 'emailSent';
          scroll(0, 0);
        },
        (er) => {
          this.formStatus = 'emailSendError';
          console.error('Project sharing error: ', er);
        },
        () => {
        }
      );

    return false;
  }

  /**
   * Populate email properties on itemToShare before share or preview;
   */
  get emailHtml() {
    return `${this.itemToShare.textToReader}
      <h1 class="emailH1">
      ${this.itemToShare.subject}</h1>
            <p style="display:none;">
      ${this.itemToShare.text}<br><br></p><p>
      ${this.shareService.getYouTubeThumbnail(this.videoUrl, 'full')}
      ${this.itemToShare.detailsLink}
        </p>
        <p>Щиро вдячний,<br>
        ${this.itemToShare.managerName}<br>
        <small>${this.itemToShare.managerEmail}</small></p>
        <a href="https://bigpolicy.eu/"><img src="https://bigpolicy.eu/assets/img/logo.png" width="40"></a>`;
  }

  toggleSharer() {
    this.sharerIsVisible = !this.sharerIsVisible;
    return false;
  }
}
