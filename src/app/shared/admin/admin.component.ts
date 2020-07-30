import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {Observable} from 'rxjs';
import {BaseUnsubscribe} from '../base-unsubscribe/base.unsubscribe';
import {ILeader} from '../models';
import {getSelectedLeader, ILeaderState} from '../../state/reducers/leader.reducers';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent extends BaseUnsubscribe implements OnInit {

  adminLeader: ILeader;

  private leader$: Observable<ILeader> = this.store.pipe(takeUntil(this.unsubscribe), select(getSelectedLeader));

  constructor(
    public userService: UserService,
    private store: Store<ILeaderState>
  ) {
    super();
  }

  ngOnInit() {
    this.leader$.subscribe(leader => this.adminLeader = leader);
  }
}
