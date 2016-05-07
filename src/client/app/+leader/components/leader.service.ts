export class Leader {
  constructor(public id: number, public name: string) { }
}

const CRISES = [
  new Leader(1, 'Dragon Burning Cities'),
  new Leader(2, 'Sky Rains Great White Sharks'),
  new Leader(3, 'Giant Asteroid Heading For Earth'),
  new Leader(4, 'Procrastinators Meeting Delayed Again'),
];

let crisesPromise = Promise.resolve(CRISES);

import { Injectable } from '@angular/core';

@Injectable()
export class LeaderService {

  static nextLeaderId = 100;

  getCrises() { return crisesPromise; }

  getLeader(id: number | string) {
    return crisesPromise
      .then((crises:any) => crises.filter((c:any) => c.id === +id)[0]);
  }

  addLeader(name: string) {
    name = name.trim();
    if (name) {
      let leader = new Leader(LeaderService.nextLeaderId++, name);
      crisesPromise.then((crises:any) => crises.push(leader));
    }
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
