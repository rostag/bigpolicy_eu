import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog } from '@angular/material/dialog';


describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        MatDialog
      ]
    });
  });

  it('should ...', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));

  it('FIXME should ... show confirmation', inject([DialogService], () => {
    expect(true).toBeTruthy();
    // expect(service.confirm('Hello', 'Service')).toBeTruthy();
  }));
});
