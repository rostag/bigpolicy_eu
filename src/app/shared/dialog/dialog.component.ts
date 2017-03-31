import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

/**
  * Dialog for FTUX's lazy registration, user authorisation request
  */
@Component({
  selector: 'app-dialog',
  template: `

    <md-icon class="inline-icon">info</md-icon>

    <div class="styled">

      <h3 md-dialog-title>{{title}}</h3>

      <md-dialog-content>
        {{ message }}
      </md-dialog-content>

      <md-dialog-actions>
        <button
          md-raised-button
          color="primary"
          md-dialog-close>Продовжити</button>
      </md-dialog-actions>
    </div>
  `,
  styleUrls: ['dialog.component.scss']
})

export class DialogComponent {
  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<DialogComponent>) { }
}
