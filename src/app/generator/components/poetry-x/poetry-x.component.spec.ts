import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetryXComponent } from './poetry.component';

describe('PoetryXComponent', () => {
  let component: PoetryXComponent;
  let fixture: ComponentFixture<PoetryXComponent>;

  beforeEach(async(() => {
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
