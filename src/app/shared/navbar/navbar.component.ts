import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { UserService } from '../user/user.service';

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
export class NavbarComponent {

  constructor(
    private userService: UserService
  ) {}

}
