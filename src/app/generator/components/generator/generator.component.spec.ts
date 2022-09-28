import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeneratorComponent } from './generator.component';

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
