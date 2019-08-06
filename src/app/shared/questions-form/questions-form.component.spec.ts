import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsFormComponent } from './questions-form.component';

describe('QuestionsFormComponent', () => {
  let component: QuestionsFormComponent;
  let fixture: ComponentFixture<QuestionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
