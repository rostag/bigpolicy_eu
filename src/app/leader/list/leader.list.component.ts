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

  @Input() title = '';

  // How many leaders to show and to request from db in single turn
  @Input() pageSize = 6;

  // To find items in DB, we can use mongo query in HTML: dbQuery='{ "$where": "this.tasks.length > 0" }'
  @Input() dbQuery = '{}';

  // Reserved for future use
  @Input() groupId;

  // Whether to show the pagination (it's not needed at Home, for example)
  @Input() showPagination = true;

  // To let override view context for child briefs:
  @Input() viewContext = 'leaderListPage';

  @Input() flexSettings = '33|33|33|50|100';

  flexState = {
      flex: '33',
      lg: '33',
      md: '33',
      sm: '50',
      xs: '100'
  };

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
    if (changes.flexSettings && changes.flexSettings.currentValue ) {
      const f = changes.flexSettings.currentValue.split('|');
      this.flexState.flex = f[0];
      this.flexState.lg = f[1];
      this.flexState.md = f[2];
      this.flexState.sm = f[3];
      this.flexState.xs = f[4];
      console.log('Leader List flexState:', this.flexState);
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestLeaders();
  }

  requestLeaders() {
    const proxySub = this.leaderService.getLeadersPage(
        null,
        this.groupId,
        this.itemsPage.page,
        this.pageSize,
        this.dbQuery)
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

  deleteLeader(leaderToRemove: LeaderModel) {
    // Delete from DB
    this.leaderService.deleteLeader(leaderToRemove, false).subscribe( dialogResult => {
      if (dialogResult === true ) {
        // Delete in UI
        let updatedLeaders;
        this.leaders.subscribe ( projects => {
          updatedLeaders = projects.filter( project => project._id !== leaderToRemove._id);
        });
        this.leaders.next( updatedLeaders );
      }
    });
    return false;
  }
}
