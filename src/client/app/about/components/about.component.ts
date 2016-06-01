import {Component} from '@angular/core';

@Component({
  selector: 'bp-about',
  templateUrl: 'app/about/components/about.component.html',
  styleUrls: ['app/about/components/about.component.css']
})
export class AboutComponent {
  dateInit = new Date('Jun 1 2016');
  dateNow = new Date();
}
