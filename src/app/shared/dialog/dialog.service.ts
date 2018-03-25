import { Observable } from 'rxjs/Rx';
import { DialogComponent } from './dialog.component';
// FIXME Look can in be removed
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ViewContainerRef, Injectable } from '@angular/core';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

    public confirm(
      title: string,
      message: string,
      btnOkText: string = 'Продовжити',
      btnCancelText: string = 'Відмінити',
      viewContainerRef?: ViewContainerRef): Observable<boolean> {

        // Docs: https://material.angular.io/components/component/dialog
        // http://www.madhur.co.in/blog/2017/03/26/angular-confirmation-dialog.html

        let dialogRef: MatDialogRef<DialogComponent>;
        const dialogConfig = new MatDialogConfig();
        // FIXME dialogConfig.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(DialogComponent, dialogConfig);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        const result = dialogRef.afterClosed();

        return result;
    }

}
