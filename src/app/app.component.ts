import { Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
// FIXME: Avoid Double-declaration (it's also in Module)
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'BigPolicy';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    console.log('• app init, user service: ', this.userService);
  }

  user: UserModel
}
