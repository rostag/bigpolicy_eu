import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesViewComponent } from './files.component';

describe('FilesViewComponent', () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
