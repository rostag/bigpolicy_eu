import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LeaderService, LeaderModel } from '../../shared/leader/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader.list.component.html',
  styleUrls: ['./leader.list.component.scss']
})

export class LeaderListComponent implements OnInit, OnChanges {

  // How many leaders to show and to request from db in single turn
  @Input() pageSize = 5;

  // For searching for leaders in db
  @Input() dbQuery = '{}';

  // Reserved for future use
  @Input() groupId;

  private leadersUrl = '/leader-api/';

  public leaders: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);
  public itemsPage = {
    docs: this.leaders,
    limit: this.pageSize,
    page: 1,
    pages: 0,
    total: 0
  };

  constructor(
    public userService: UserService,
    private http: Http,
    private leaderService: LeaderService
  ) {}

  ngOnInit() {
    this.requestLeaders();
  }

  ngOnChanges(changes) {
    if (changes.groupId && changes.groupId.currentValue ||
        changes.pageSize && changes.pageSize.currentValue ||
        changes.dbQuery && changes.dbQuery.currentValue) {
      this.requestLeaders();
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestLeaders();
  }

  requestLeaders() {
    const proxySub = this.leaderService.getLeadersPage(null, this.groupId, this.itemsPage.page, this.pageSize, this.dbQuery)
      .subscribe(responsePage => {
        // console.log('Next, responsePage:', responsePage);
        this.itemsPage.docs.next(responsePage['docs']);
        this.itemsPage.limit = responsePage['limit'];
        this.itemsPage.page = responsePage['page'];
        this.itemsPage.pages = responsePage['pages'];
        this.itemsPage.total = responsePage['total'];
        proxySub.unsubscribe();
      });
  }

  // TODO: Re-assign deleted Leader's projects to special person
  deleteLeader(leaderToRemove: LeaderModel) {
    // Delete in UI
    let updatedLeaders;
    this.leaders.subscribe ( projects => {
      updatedLeaders = projects.filter( project => project._id !== leaderToRemove._id);
    });
    this.leaders.next( updatedLeaders );

    // Delete from DB
    this.leaderService.deleteLeader(leaderToRemove);
    return false;
  }
}
