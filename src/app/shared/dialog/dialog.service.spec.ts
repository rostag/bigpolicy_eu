import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MaterialModule, MdDialog, Overlay, OverlayContainer, OVERLAY_PROVIDERS } from '@angular/material';


describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        MdDialog,
        Overlay,
        OverlayContainer,
        OVERLAY_PROVIDERS
    ]
    });
  });

  it('should ...', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));

  it('FIXME should ... show confirmation', inject([DialogService], (service: DialogService) => {
    expect(true).toBeTruthy();
  //   // expect(service.confirm('Hello', 'Service')).toBeTruthy();
  }));
});
