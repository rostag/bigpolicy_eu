import { Observable } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

export interface BPDialogConfig extends MatDialogConfig {
  [key: string]: any
}

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public confirm(dialogConfig?: BPDialogConfig): Observable<boolean> {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, dialogConfig);
    const comp: any = dialogRef.componentInstance;

    comp.title = dialogConfig.title;
    comp.message = dialogConfig.message;
    comp.btnCancelText = dialogConfig.btnCancelText || 'Відмінити';
    comp.btnOkText = dialogConfig.btnOkText || 'Продовжити';
    dialogRef.componentInstance = comp;

    return dialogRef.afterClosed();
  }

  public info(dialogConfig?: BPDialogConfig): Observable<boolean> {
    return this.confirm({...dialogConfig, btnOkText: 'OK'});
  }
}
