// WIP - Fixed the imports and providers

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../shared/dialog/dialog.service';
import { MaterialModule, MdCardTitle, MdCard } from '@angular/material';
import { ProjectBriefComponent } from './project.brief.component';
import { ProjectService } from '../../shared/project/project.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../shared/task/task.service';

xdescribe('WIP - Fixed the imports and providers. ProjectBriefComponent', () => {
  let component: ProjectBriefComponent;
  let fixture: ComponentFixture<ProjectBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterTestingModule ],
      providers: [ ProjectService, TaskService, DialogService ],
      declarations: [ ProjectBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('FIXME should create ProjectBriefComponent', () => {
    expect(component).toBeTruthy();
  });
});
