import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

import { RouterTestingModule } from '@angular/router/testing';
import { LeaderListComponent } from '../leader/list/index';
import { ProjectListComponent } from '../project/list/index';

import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';

// import { UserService } from '../shared/user';
// import { LeaderService } from '../shared/leader';
import { CoreModule } from '../core.module';

// , PaginationInstance, PaginatePipe, PaginationControlsComponent, PaginationControlsDirective

// You need to configure all the routing. For testing, rather than using the Router Module,
// you can use the RouterTestingModule from @angular/router/testing, where you can set up some mock routes.
// You will also need to import the CommonModule from @angular/common for your *ngFor.
// Below is a complete passing test

// http://stackoverflow.com/questions/39577920/angular-2-unit-testing-components-with-routerlink/39579009#39579009

describe('FIXME HomeComponent', () => {
  // let component: HomeComponent;
  // let fixture: ComponentFixture<HomeComponent>;
  //
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ HomeComponent, LeaderListComponent, ProjectListComponent],
  //     imports: [ RouterTestingModule, MaterialModule, Ng2PaginationModule, CoreModule ]
  //   })
  //   .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create HomeComponent', () => {
    // expect(component).toBeTruthy();
  });
});
