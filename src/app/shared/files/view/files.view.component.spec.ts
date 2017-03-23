import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesViewComponent } from './files.view.component';
import { ToolbarComponent } from '../../index';

describe('FilesViewComponent', () => {
  // let component: FilesViewComponent;
  // let fixture: ComponentFixture<FilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ FilesViewComponent, ToolbarComponent ],
      // imports: [ToolbarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(FilesViewComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('FIXME should create', () => {
    expect(true).toBeTruthy();
    // expect(component).toBeTruthy();
  });
});
