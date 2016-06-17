import {Component} from '@angular/core';

@Component({
  selector: 'bp-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent {
  dateInit = new Date('Jun 1 2016');
  dateNow = new Date();
}
