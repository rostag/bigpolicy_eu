import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button/button';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'bp-landing',
  templateUrl: 'app/landing/components/landing.component.html',
  styleUrls: ['app/landing/components/landing.component.css'],
  directives: [MdButton,ROUTER_DIRECTIVES]
})

export class LandingComponent {
  leaderCount = 0;
}
