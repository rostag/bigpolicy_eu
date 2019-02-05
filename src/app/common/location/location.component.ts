import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationService} from './location.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends FormControl implements OnInit {

  @Output() locationChange: EventEmitter<any> = new EventEmitter();

  public region = new FormControl();
  public regionOptions = [];
  public cityOptions = null;
  public filteredRegionOptions: Observable<string[]>;

  constructor(private locationService: LocationService) {
    super();
  }

  public ngOnInit() {
    // this.locationService.getCitiesForRegion(1);
    this.locationService.getRegions().subscribe(result => {
        this.regionOptions = result.map(element => element.sName);
        // console.log('>> regionOptions:', JSON.stringify(this.regionOptions, null, '    '), this.cityOptions);
      },
      err => {
        console.log('Err:', err);
      }
    );

    this.filteredRegionOptions = this.region.valueChanges
      .pipe(
        startWith(''),
        map(value => this.regionOptions.filter(option => option.toLowerCase().includes(value.toLowerCase()))));
  }

  public onLocationChange() {
    this.locationChange.emit(this.region.value);
  }
}
