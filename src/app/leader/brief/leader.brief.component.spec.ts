import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBriefComponent } from './leader.brief.component';

describe('LeaderBriefComponent', () => {
  let component: LeaderBriefComponent;
  let fixture: ComponentFixture<LeaderBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
