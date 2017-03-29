import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBriefComponent } from './project.brief.component';

describe('ProjectBriefComponent', () => {
  let component: ProjectBriefComponent;
  let fixture: ComponentFixture<ProjectBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
