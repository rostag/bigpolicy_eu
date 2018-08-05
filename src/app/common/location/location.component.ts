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

  private locationOptions = null;

  public myControl = new FormControl();
  public options: string[] = ['Київ', 'Харківська', 'Львівська'];
  public filteredOptions: Observable<string[]>;

  constructor(private locationService: LocationService) { }

  public ngOnInit() {
    this.locationService.getRegions().subscribe(result => {
      this.locationOptions = result;
      console.log('>> location options:', this.locationOptions);
    });
    // this.locationService.getCitiesForRegion(1);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
