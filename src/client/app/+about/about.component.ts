import { Component } from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css'],
  directives: [MD_CARD_DIRECTIVES]
})
export class AboutComponent {}
