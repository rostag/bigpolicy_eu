import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private userService: UserService
  ){}
}
