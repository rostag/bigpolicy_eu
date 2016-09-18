import { Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
import { UserService } from './shared/user/user.service';

import { NavbarComponent, ToolbarComponent } from './shared/index';

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
    console.log('• - • app init ' + this.userService + ' • - •')
  }

  user: UserModel
}
