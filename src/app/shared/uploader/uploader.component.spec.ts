import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogService } from '../dialog/dialog.service';
import { ProjectService } from '../project/project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../task/task.service';
import { UploaderComponent } from './uploader.component';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {firebaseConfig} from '../../bp.module';

xdescribe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  // http://stackoverflow.com/questions/42692901/angular2-karma-test-failed-no-provider-for-token-firebaseurl
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,
        // FIXME FIREBASE_CONFIG
        //    const firebase = require('firebase');
        //    const admin = require('firebase-admin');
        //    firebase.initialize App(JSON.parse(process.env.FIREBASE_CONFIG));
        // AngularFireModule.initialize App(firebaseConfig)
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
