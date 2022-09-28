import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import { ILeader, IProject } from '../../models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit, OnInit {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  leader: ILeader;
  @Input() dataSource = [];

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    load: 2,
    speed: 2000,
    animation: 'lazy',
    // interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }
  // CarouselItems = [1, 2, 3];

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    // this.carouselTileItems.forEach(el => {
    //   this.carouselTileLoad(el);
    // });
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }

}
