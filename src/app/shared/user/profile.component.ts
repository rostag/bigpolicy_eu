import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(
    public userService: UserService,
  ) {
    console.log('Profile constructor');
  }

  ngOnInit() {
  }
}
