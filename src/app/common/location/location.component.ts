import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getRegions();
    // this.locationService.getCitiesForRegion(1);
  }

}
