import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CNewsComponent } from './c-news.component';

describe('CNewsComponent', () => {
  let component: CNewsComponent;
  let fixture: ComponentFixture<CNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
