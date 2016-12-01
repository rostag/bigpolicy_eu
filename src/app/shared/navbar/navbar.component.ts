import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'bp-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private userService: UserService
  ) {}

}
