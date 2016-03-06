import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
  selector: 'blog',
  templateUrl: 'app/components/blog/blog.html',
  styleUrls: ['app/components/blog/blog.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Blog {

  constructor(http:Http) {
    
  }
}
