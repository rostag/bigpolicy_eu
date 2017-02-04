import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { MdIconModule } from '@angular/material';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'app-bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent {

  isDarkTheme = false;

  constructor(
    public userService: UserService
  ) {}
}
