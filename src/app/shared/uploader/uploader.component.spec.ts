import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../dialog/dialog.service';
import { ProjectService } from '../project';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../task';
import { UploaderComponent } from './uploader.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../core.module';
import { AngularFireDatabase } from 'angularfire2/database';

xdescribe('UploaderComponent', () => {
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
