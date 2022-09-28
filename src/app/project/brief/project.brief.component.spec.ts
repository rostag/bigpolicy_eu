import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ProjectBriefComponent } from './project.brief.component';
import { ProjectService } from '../../shared/project/project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../shared/task/task.service';

xdescribe('ProjectBriefComponent', () => {
  let component: ProjectBriefComponent;
  let fixture: ComponentFixture<ProjectBriefComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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
