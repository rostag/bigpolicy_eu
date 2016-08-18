import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  constructor(
    private userService: UserService
  ){}

}
