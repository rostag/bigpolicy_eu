import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../../shared/user/user.service';
import { HttpClient } from '@angular/common/http';
import { ILeader, ILeaderResponsePage, IDataPageRequest } from '../../common/models';
import { Store } from '@ngrx/store';
import { ILeaderState, getLeaders, getLeadersPage } from '../../state/reducers/leader.reducers';
import { LoadLeadersPage } from '../../state/actions/leader.actions';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader.list.component.html',
  styleUrls: ['./leader.list.component.scss']
})

export class LeaderListComponent implements OnInit, OnChanges {

  @Input() title = '';

  // How many leaders to show and to request from db in single turn
  @Input() pageSize = 6;

  // To find items in DB, we can use mongo query in HTML: dbQuery='{ "$where": "this.taskIds.length > 0" }'
  @Input() dbQuery = '{}';

  // Reserved for future use
  @Input() groupId;

  // Whether to show the pagination (it's not needed at Home, for example)
  @Input() showPagination = true;

  // To let override view context for child briefs:
  @Input() viewContext = 'leaderListPage';

  @Input() flexSettings = '33|33|33|50|100';

  flexState = {
    flex: '33%',
    lg: '33%',
    md: '33%',
    sm: '50%',
    xs: '100%'
  };

  public leaders: BehaviorSubject<any> = new BehaviorSubject([{ title: 'Loading...' }]);
  public itemsPage = {
    docs: this.leaders,
    limit: this.pageSize,
    page: 1,
    pages: 0,
    total: 0
  };

  constructor(
    public userService: UserService,
    private http: HttpClient,
    private leaderStore: Store<ILeaderState>
  ) { }

  ngOnInit() {
    this.requestLeaders();
    this.leaderStore.select(getLeadersPage).subscribe(leaderPage => this.setLeaderPage(leaderPage));
  }

  ngOnChanges(changes) {
    if (changes.groupId && changes.groupId.currentValue ||
      changes.pageSize && changes.pageSize.currentValue ||
      changes.dbQuery && changes.dbQuery.currentValue) {
      this.requestLeaders();
    }
    if (changes.flexSettings && changes.flexSettings.currentValue) {
      const f = changes.flexSettings.currentValue.split('|');
      this.flexState.flex = f[0];
      this.flexState.lg = f[1];
      this.flexState.md = f[2];
      this.flexState.sm = f[3];
      this.flexState.xs = f[4];
    }
  }

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestLeaders();
  }

  requestLeaders() {
    this.leaderStore.dispatch(new LoadLeadersPage({
      id: this.groupId,
      page: this.itemsPage.page,
      pageSize: this.pageSize,
      dbQuery: this.dbQuery
    }));
  }

  private setLeaderPage(responsePage: ILeaderResponsePage) {
    if (!responsePage) {
      return;
    }
    this.itemsPage.docs.next(responsePage['docs']);
    this.itemsPage.limit = responsePage['limit'];
    this.itemsPage.page = responsePage['page'];
    this.itemsPage.pages = responsePage['pages'];
    this.itemsPage.total = responsePage['total'];
    // FIXME RESTORE UNSUBSCRIBE via onDestroy hook
    // proxySub.unsubscribe();
  }
}
