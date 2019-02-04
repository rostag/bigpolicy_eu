import { Observable } from 'rxjs/Rx';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Продовжити',
    btnCancelText: string = 'Відмінити'): Observable<boolean> {

    let dialogRef: MatDialogRef<DialogComponent>;
    const dialogConfig = new MatDialogConfig();

    dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.btnCancelText = btnCancelText;
    dialogRef.componentInstance.btnOkText = btnOkText;

    const result = dialogRef.afterClosed();

    return result;
  }

  public info(title: string, message: string): Observable<boolean> {
    return this.confirm(title, message, 'OK', null);
  }
}
