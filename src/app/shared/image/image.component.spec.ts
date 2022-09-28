import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImageComponent } from './image.component';

xdescribe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create ImageComponent', () => {
    expect(component).toBeTruthy();
  });
});
