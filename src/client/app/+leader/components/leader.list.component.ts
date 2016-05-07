import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';

import { Leader, LeaderService } from './leader.service';

@Component({
    template: `
    <h2>List</h2>
    <!-- ul class="items">
      <li *ngFor="let leader of leaders"
        [class.selected]="isSelected(leader)"
        (click)="onSelect(leader)">
        <span class="badge">{{leader.id}}</span> {{leader.name}}
      </li>
    </ul -->
  `,
})
export class LeaderListComponent
// implements OnActivate
{
    // leaders: Leader[];
    // private currSegment: RouteSegment;
    // private selectedId: number;
    //
    // constructor(
    //     private service: LeaderService,
    //     private router: Router) { }
    //
    // isSelected(leader: Leader) { return leader.id === this.selectedId; }
    //
    // routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
    //     this.currSegment = curr;
    //     this.selectedId = +currTree.parent(curr).getParam('id');
    //     this.service.getCrises().then((leaders:Leader[]) => this.leaders = leaders);
    // }
    //
    // onSelect(leader: Leader) {
    //     // Absolute link
    //     // this.router.navigate([`/leader-center`, leader.id]);
    //
    //     // Relative link
    //     this.router.navigate([`./${leader.id}`], this.currSegment);
    // }
}
