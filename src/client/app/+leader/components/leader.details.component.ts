import { Component } from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';

import { Leader, LeaderService } from './leader.service';
import { DialogService } from './dialog.service';

@Component({
  template: `
  <div *ngIf="leader">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{leader.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  styles: ['input {width: 20em}']
})

export class LeaderDetailsComponent implements OnActivate, CanDeactivate {
  leader: Leader;
  editName: string;
  private curSegment: RouteSegment;

  constructor(
    private service: LeaderService,
    private router: Router,
    private dialog: DialogService
    ) { }

  routerOnActivate(curr: RouteSegment) {
    this.curSegment = curr;

    let id = +curr.getParam('id');
    this.service.getLeader(id).then((leader:Leader) => {
      if (leader) {
        this.editName = leader.name;
        this.leader = leader;
      } else { // id not found
        this.gotoCrises();
      }
    });
  }

  routerCanDeactivate(): any {
    // Allow synchronous navigation (`true`) if no leader or the leader is unchanged.
    if (!this.leader || this.leader.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialog.confirm('Discard changes?');
  }

  cancel() {
    this.editName = this.leader.name;
    this.gotoCrises();
  }

  save() {
    this.leader.name = this.editName;
    this.gotoCrises();
  }

  gotoCrises() {
    let leaderId = this.leader ? this.leader.id : null;
    // Pass along the hero id if available
    // so that the LeaderListComponent can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    // Absolute link
    this.router.navigate(['/leader-center', {id: leaderId, foo: 'foo'}]);

    // Relative link
    // this.router.navigate(['../', {id: leaderId, foo: 'foo'}], this.curSegment);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
