import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoetryXComponent } from './random-dom.component';

describe('PoetryXComponent', () => {
  let component: PoetryXComponent;
  let fixture: ComponentFixture<PoetryXComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoetryXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoetryXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
