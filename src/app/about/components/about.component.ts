import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../assets/css/skeleton.css', './about.component.scss']
})

export class AboutComponent {
  dateInit = new Date('Jun 1 2016');
  dateNow = new Date();
}
