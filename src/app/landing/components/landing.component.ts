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
  leaderCount = 'å';
  donorCount = 'ß';
  coinCount = 'µ';

  // FIXME - Legacy Demo Code To Be Removed
  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  dogs: Object[] = [
    { name: 'Porter', human: 'Kara' },
    { name: 'Mal', human: 'Jeremy' },
    { name: 'Koby', human: 'Igor' },
    { name: 'Razzle', human: 'Ward' },
    { name: 'Molly', human: 'Rob' },
    { name: 'Husi', human: 'Matias' },
  ];

  fixedCols: number = 4;
  fixedRowHeight: number = 100;
  ratioGutter: number = 1;
  fitListHeight: string = '400px';
  ratio: string = '4:1';

  addTileCols() {
    this.tiles[2].cols++;
  }

  getColor() {
    // let tunes = ['', 'light'];
    // let colors = ['yellow', 'green', 'blue', 'grey'];
    // let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey'];
    // let randomTune = Math.floor(Math.random() * tunes.length);
    // let randomColor = Math.floor(Math.random() * colors.length);
    return 'transparent';
    // return tunes[randomTune] + colors[randomColor];
  }
}
