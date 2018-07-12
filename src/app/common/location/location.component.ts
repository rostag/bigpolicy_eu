import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  private locationOptions = null;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getRegions().subscribe(result => {
      this.locationOptions = result;
      console.log('>> location options:', this.locationOptions);
    });
    // this.locationService.getCitiesForRegion(1);
  }
}
