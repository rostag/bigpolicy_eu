import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public region = new FormControl();
  public regionOptions = [];
  public cityOptions = null;
  public filteredRegionOptions: Observable<string[]>;

  constructor(private locationService: LocationService) { }

  public ngOnInit() {
    // this.locationService.getCitiesForRegion(1);
    this.locationService.getRegions().subscribe(result => {
      this.regionOptions = result.map(element => element.sName);
      console.log('>> regionOptions:', JSON.stringify(this.regionOptions, null, '  '));
    });

    this.filteredRegionOptions = this.region.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.regionOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
