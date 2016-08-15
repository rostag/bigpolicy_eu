import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { HTTP_PROVIDERS } from '@angular/http';
import { UserModel, UserService } from './shared/user';

import { NavbarComponent, ToolbarComponent } from './shared/index';

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  viewProviders: [HTTP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon, NavbarComponent, ToolbarComponent],
  providers: [MdIconRegistry]
})

export class AppComponent {
  title = 'BigPolicy';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    console.log('• - • app init • - •')
  }

  user: UserModel
}
