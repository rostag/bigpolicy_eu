import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

/**
  * Dialog — for FTUX's lazy registration, content deletion etc
  */
@Component({
  selector: 'app-dialog',
  template:
    ` <mat-icon class="inline-icon">info</mat-icon>

      <div class="styled">
        <h3 mat-dialog-title>{{title}}</h3>

        <mat-dialog-content>
          {{ message }}
        </mat-dialog-content>

        <mat-dialog-actions>
          <button mat-button color="primary" (click)="dialogRef.close(false)">{{btnCancelText}}</button>
          <button mat-raised-button color="primary" (click)="dialogRef.close(true)">{{btnOkText}}</button>
        </mat-dialog-actions>
      </div>
    `,
  styleUrls: ['dialog.component.scss']
})

export class DialogComponent {
  public title?: string;
  public message?: string;
  public btnOkText?: string;
  public btnCancelText?: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }
}
