import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  //  listen to the result of the login and after a success redirect the user to the home page
  onSubmit(email, password) {
    // this.userService.login()
    // .subscribe((result) => {
    //   if (result) {
    //     this.router.navigate(['']);
    //   }
    // });
  }
}
