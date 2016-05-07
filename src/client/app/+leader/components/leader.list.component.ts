import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';

import { Leader, LeaderService } from './leader.service';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let leader of leaders"
        [class.selected]="isSelected(leader)"
        (click)="onSelect(leader)">
        <span class="badge">{{leader.id}}</span> {{leader.name}}
      </li>
    </ul>
  `,
})
export class LeaderListComponent implements OnActivate {
  leaders: Leader[];
  private currSegment: RouteSegment;
  private selectedId: number;

  constructor(
    private service: LeaderService,
    private router: Router) { }

  isSelected(leader: Leader) { return leader.id === this.selectedId; }

  routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
    this.currSegment = curr;
    this.selectedId = +currTree.parent(curr).getParam('id');
    this.service.getCrises().then(leaders => this.leaders = leaders);
  }

  onSelect(leader: Leader) {
    // Absolute link
    // this.router.navigate([`/leader-center`, leader.id]);

    // Relative link
    this.router.navigate([`./${leader.id}`], this.currSegment);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
