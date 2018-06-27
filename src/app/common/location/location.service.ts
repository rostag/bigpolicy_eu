import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  // WIP
  public getRegions(): Observable<any> {
    return this.httpClient.get('api/regions').pipe(
      map(result => { console.log(result); }),
      catchError((err: Response) => {
        console.log('Error:', err);
        return Observable.throw(err.json() || 'Server error')
      })
    );
  }

  // public getCitiesForRegion(regionId: number): Observable<any> {
  //   return this.httpClient.get('api/region/' + regionId + 'cities');
  // }

}
