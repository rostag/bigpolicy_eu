import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MdCard } from '@angular2-material/card/card';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  directives: [ROUTER_DIRECTIVES, MdCard]
})

export class ProfileComponent {

  constructor(
    private userService: UserService
  ) {
    console.info('Profile constructor')
  }
}
