import { Component, OnDestroy } from '@angular/core';
import { DialogService } from '../../shared/dialog/dialog.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnDestroy {
  dateInit = new Date('Jun 1 2016');
  dateNow = new Date();

  private onDestroy$ = new Subject<void>();

  constructor(private dialogService: DialogService) {
  }

  // Actually, this is just a dummy test
  confirmLogo(evt: MouseEvent) {
    console.log('Confirm logo:', evt);
    let iid = 0;
    this.dialogService.confirm({
        title: 'Дякуємо!',
        message: `Дякуємо за інтерес до нашого лого.
        Роботи по дизайну ведуться зараз, тож скоро поновлення!`,
        btnOkText: undefined,
        btnCancelText: undefined,
        width: '340px',
        inexistent: null
      }
    ).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
      console.log('Dialog result:', res);
      iid = setInterval(() => {
        console.log(`Interval ID: ${iid}, click by ${evt.screenX}:${evt.screenY}`);
      }, 1000);
    }, error => {
      console.log(`Error: ${error}`);
    }, () => {
      clearInterval(iid);
      console.log(`Completed ${iid}`);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
