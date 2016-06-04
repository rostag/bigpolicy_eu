import {Component} from '@angular/core';
import {MdButton} from '@angular2-material/button/button';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list/grid-list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';

@Component({
  selector: 'bp-landing',
  templateUrl: 'app/landing/components/landing.component.html',
  styleUrls: ['app/landing/components/landing.component.css'],
  directives: [MD_GRID_LIST_DIRECTIVES, MD_CARD_DIRECTIVES, MdButton, ROUTER_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})

export class LandingComponent {
  leaderCount = 0;
  donorCount = 0;
  coinCount = 0;

  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'blue'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Four', cols: 2, rows: 1, color: 'green'},
  ];

  dogs: Object[] = [
    { name: 'Porter', human: 'Kara' },
    { name: 'Mal', human: 'Jeremy' },
    { name: 'Koby', human: 'Igor' },
    { name: 'Razzle', human: 'Ward' },
    { name: 'Molly', human: 'Rob' },
    { name: 'Husi', human: 'Matias' },
  ];

  ratioGutter: number = 1;
  fitListHeight: string = '400px';
  ratio: string = '4:1';
}
