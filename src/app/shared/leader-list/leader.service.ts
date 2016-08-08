import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LeaderService {

  constructor( private http: Http ) { }

  // FIXME
  // Uses http.get() to load a single JSON file
  getLeaders() {
    var result;
    console.log('getLeaders')
    var r = this.http.get('/leader-api/').map((res:Response) => {
      result = res.json();
      console.log('result:', result);
      return result;
    });
    return result;
  }

  // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
  // The entire operation will result in an error state if any single request fails.
  // getBooksAndMovies() {
  //   return Observable.forkJoin(
  //     this.http.get('/app/books.json').map((res:Response) => res.json()),
  //     this.http.get('/app/movies.json').map((res:Response) => res.json())
  //   );
  // }

}
