import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { MdIconModule } from '@angular/material';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'bp-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {

  isDarkTheme = false;

  constructor(
    private userService: UserService
  ){}
}
