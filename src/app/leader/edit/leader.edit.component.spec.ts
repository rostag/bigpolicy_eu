import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageComponent } from '../../shared/image/image.component';
import { LeaderEditComponent } from './';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { FilesViewComponent } from '../../shared/files/view/files.view.component';
import { FilesEditComponent } from '../../shared/drive/files/files.edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaderService } from '../../shared/leader';
import { ProjectService } from '../../shared/project';
import { TaskService } from '../../shared/task';
import { DialogService } from '../../shared/dialog/dialog.service';
import { UserService } from '../../shared/user/user.service';
import { DriveService } from '../../shared/drive';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../bp.module';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

describe('LeaderEditComponent', () => {

  let component: LeaderEditComponent;
  let fixture: ComponentFixture<LeaderEditComponent>;
  let debug:   DebugElement;
  let submitButton:   HTMLElement;

  beforeEach(() => {
    // .withRoutes([ { path: 'add-leader', component: LeaderEditComponent } ]),
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [ LeaderService, DialogService, ProjectService, TaskService, UserService, DriveService, {
        provide: ActivatedRoute,
        useValue: {
          path: 'leader/:id/edit',
          params: of({id: '58cf0b7d4256ee60fd1261a7'})
        }
      }],
      declarations: [ LeaderEditComponent, ImageComponent, UploaderComponent, FilesViewComponent, FilesEditComponent ]
    });

    fixture = TestBed.createComponent(LeaderEditComponent);
    component = fixture.componentInstance;

    debug = fixture.debugElement;
    submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
  });

  it('should create LeaderEditComponent', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should detect Leader ID from route', () => {
    fixture.detectChanges();
  });

  it('should create a `FormGroup` comprised of `FormControl`s', () => {
    component.ngOnInit();
    expect(component.leaderFormGroup).toBe(true);
  });

  it('should require to enter the Leader data, submit button should be disabled', () => {
    fixture.detectChanges();
    console.log('submitButton.textContent:', submitButton.textContent);
    expect(submitButton.attributes['disabled']).toBeDefined();
  });

  const value0 = {name: 'The', surName: 'Leader', vision: 'Some vision do I have', mission: 'Here is my dear mission'};
  const value = null;

  it('submit button should be enabled after filling the form', () => {
    fixture.detectChanges();
    component.setLeader(value);
    fixture.detectChanges();
    expect(submitButton.attributes['disabled']).toBeUndefined();
  });

  it('submit button should be disabled if Leader name is too short and then become enabled when it\'s OK', () => {
    fixture.detectChanges();
    component.setLeader(value);
    fixture.detectChanges();
    expect(submitButton.attributes['disabled']).toBeDefined();
    component.setLeader(value);
    fixture.detectChanges();
    expect(submitButton.attributes['disabled']).toBeUndefined();
  });

});
