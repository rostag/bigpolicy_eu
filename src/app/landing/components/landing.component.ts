import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button/button';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'bp-landing',
  moduleId: module.id,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  directives: [MD_GRID_LIST_DIRECTIVES, ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MdButton, MdIcon],
  providers: [MdIconRegistry]
})

export class LandingComponent {
  leaderCount = '0';
  donorCount = '0';
  coinCount = '0';

  supportLeader() {
    console.log('support leader');
  }

}
