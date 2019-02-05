import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../shared/dialog/dialog.service';
import { LeaderBriefComponent } from './leader.brief.component';
import { LeaderService } from '../../shared/leader/index';
import { ProjectService } from '../../shared/project/project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../shared/task/task.service';

xdescribe('LeaderBriefComponent', () => {
  let component: LeaderBriefComponent;
  let fixture: ComponentFixture<LeaderBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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
