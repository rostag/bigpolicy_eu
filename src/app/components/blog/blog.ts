import {Component} from '@angular/core';
import {Http} from '@angular/http';


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
