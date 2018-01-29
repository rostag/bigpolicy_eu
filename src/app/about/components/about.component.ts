import { Component } from '@angular/core';
import { MdIconModule } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent {
  dateInit = new Date('Jun 1 2016');
  dateNow = new Date();
}
