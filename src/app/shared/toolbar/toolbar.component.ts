import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  directives: [ROUTER_DIRECTIVES, MdToolbar, MdIcon],
  providers: [MdIconRegistry]
})
export class ToolbarComponent {}
