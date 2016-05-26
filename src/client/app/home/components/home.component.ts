import {Component} from '@angular/core';

// FIXME: GO BACK FROM MATERIALIZE TO GRID LIST ASAP
// import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list/grid-list';
import {MdButton} from '@angular2-material/button/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import { Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  // moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'app/home/components/home.component.html',
  styleUrls: ['assets/css/material-icons.css', 'app/home/materialize/css/materialize.min.css', 'app/home/components/home.component.css'],
  directives: [MdButton, MD_CARD_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class HomeComponent {

}
