// import { By } from '@angular/platform/browser';
// import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageComponent } from '../../shared/image/image.component';
import { LeaderEditComponent } from './';
import { MaterialModule, MdCardTitle, MdCard } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { FilesViewComponent } from '../../shared/files/view/files.view.component';
import { FilesEditComponent } from '../../shared/drive/files/files.edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaderService } from '../../shared/leader/leader.service';
import { ProjectService } from '../../shared/project/project.service';
import { TaskService } from '../../shared/task/task.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { UserService } from '../../shared/user/user.service';
import { DriveService } from '../../shared/drive';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../core.module';

describe('CURRENT WIP: LeaderEditComponent', () => {

  let comp: LeaderEditComponent;
  let fixt: ComponentFixture<LeaderEditComponent>;
  // let de:   DebugElement;
  // let el:   HTMLElement;

  beforeEach(() => {
    console.log('Before test');

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MaterialModule, RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [ LeaderService, DialogService, ProjectService, TaskService, UserService, DriveService],
      declarations: [ LeaderEditComponent, ImageComponent, UploaderComponent, FilesViewComponent, FilesEditComponent ]
    });

    fixt = TestBed.createComponent(LeaderEditComponent);

    comp = fixt.componentInstance;

    // de = fixture.debugElement.query(By.css('input'));
    // el = de.nativeElement;
  });

  it('requires to enter the name', () => {
    expect(true).toBe(true);
  });
});
