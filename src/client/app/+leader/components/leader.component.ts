import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { LeaderDetailComponent } from './leader.detail.component';
import { LeaderListComponent }   from './leader.list.component';
import { LeaderService }         from './leader.service';

@Component({
  selector: 'sd-leader',
  templateUrl: 'app/+leader/components/leader.component.html',
  styleUrls: ['app/+leader/components/leader.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers:  [LeaderService]
})
@Routes([
  {path: '',    component: LeaderListComponent }, // , useAsDefault: true - coming soon
  {path: '/:id', component: LeaderDetailComponent}
])
export class LeadersComponent {}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
