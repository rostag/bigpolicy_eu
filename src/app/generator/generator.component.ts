
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  ngOnInit() {}

}
