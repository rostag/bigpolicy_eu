import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.css'],
  directives: [MD_GRID_LIST_DIRECTIVES, MdCard, MdButton, MdIcon, MdToolbar],
  providers: [MdIconRegistry]
})

export class LeaderViewComponent {

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private route: ActivatedRoute
  ){}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('Leader View, ID from route params is:', id)
      });
  }

}
