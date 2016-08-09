import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';
import { MdCard } from '@angular2-material/card/card';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { LeaderListService, LeaderModel } from '../../shared/leader-list/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './leader.list.component.html',
  styleUrls: ['./leader.list.component.css'],
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, MdCard, MdCheckbox, MdButton, MdIcon, MdToolbar, MD_INPUT_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
  providers: [MdIconRegistry, LeaderListService]
})

export class LeaderListComponent {

    private leadersUrl = '/leader-api/';

    leaders = []

    leadersObservable

    constructor(
      public leaderListService: LeaderListService,
      private http: Http
    ) {}

    ngOnInit() {
      this.leadersObservable = this.getLeaders();
      console.log( 'Leaders:', this.leadersObservable );
    }

    // FIXME - Move it to the service
    getLeaders() {
      return this.http.get(this.leadersUrl)
        .map((res:Response) => res.json())
        .subscribe(
          data => this.saveData(data),
          err => console.error(err),
          () => {
            console.log('getLeaders:', this.leaders)
            return this.leaders
          }
        );
    }

    private saveData(data) {
      this.leaders = data;
      console.log('saveData:', data);
      return data;
    }

    private deleteLeader(leader: LeaderModel) {
      // Delete from UI Model:
      var leaderToRemoveIndex = this.leaders.indexOf(leader);
      this.leaders.splice(leaderToRemoveIndex, 1);

      // Delete from DB
      this.leaderListService.deleteLeader(leader);
      return false;
    }

    private editLeader(leader: LeaderModel) {
      console.log('Edit Leader: ', leader);
      return false;
    }

}
