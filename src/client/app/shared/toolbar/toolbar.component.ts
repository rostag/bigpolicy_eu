import { Component } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  directives: [MdToolbar]
})
export class ToolbarComponent {}
