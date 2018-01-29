// WIP - Fixed the imports and providers

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../shared/dialog/dialog.service';
import { LeaderBriefComponent } from './leader.brief.component';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { MaterialModule, MdCardTitle, MdCard } from '@angular/material';
import { ProjectService } from '../../shared/project/project.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../shared/task/task.service';

xdescribe('WIP - Fixed the imports and providers. LeaderBriefComponent', () => {
  let component: LeaderBriefComponent;
  let fixture: ComponentFixture<LeaderBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterTestingModule ],
      providers: [ LeaderService, DialogService, ProjectService, TaskService ],
      declarations: [ LeaderBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create LeaderBriefComponent', () => {
    expect(component).toBeTruthy();
  });
});
