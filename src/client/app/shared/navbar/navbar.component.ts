import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MdButton} from '@angular2-material/button';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, MdButton]
})
export class NavbarComponent {}
