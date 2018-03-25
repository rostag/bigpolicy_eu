// WIP - Fixed the imports and providers

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ProjectService } from '../../shared/project/project.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../shared/task/task.service';
import { UploaderComponent } from './uploader.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../core.module';
import { AngularFireDatabase } from 'angularfire2/database';

xdescribe('WIP - Fixed the imports and providers. UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  // http://stackoverflow.com/questions/42692901/angular2-karma-test-failed-no-provider-for-token-firebaseurl
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [ ProjectService, TaskService, DialogService, AngularFireDatabase ],
      declarations: [ UploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('FIXME - should create UploaderComponent', () => {
    expect(component).toBeTruthy();
  });
});
