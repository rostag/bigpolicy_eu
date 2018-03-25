import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DonationModel } from '../donation.model';
import { DonationService } from '../donation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations.list.component.html',
  styleUrls: ['./donations.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DonationService]
})

export class DonationsListComponent implements OnChanges {

  // List title
  @Input() title = '';

  // FIXME Implement interface for targets as Leader, Project, Task
  @Input() target: any;

  // Either Leader, Project or Task
  @Input() targetType: string;

  // How many list items to show and to request from db in single turn
  @Input() pageSize = 5;

  // To find items in DB, we can use mongo query in HTML: dbQuery='{ "$where": "this.tasks.length > 0" }'
  @Input() dbQuery = '{}';

  public items: BehaviorSubject<any> = new BehaviorSubject([{title: 'Loading...'}]);
  public itemsPage = {
    docs: this.items,
    limit: this.pageSize,
    page: 1,
    pages: 0,
    total: 0
  };

  ngOnChanges(changes) {
    const target = changes.target.currentValue;
    if (target && target._id ||
        changes.pageSize && changes.pageSize.currentValue ||
        changes.dbQuery && changes.dbQuery.currentValue) {
      this.requestItems();
    }
  }

  constructor(
    private donationService: DonationService,
    private http: HttpClient
  ) {}

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestItems();
  }

  // FIXME REMOVE CODE DUPLICATION
  requestItems() {
    const proxySub = this.donationService.getDonationsPage(
        null,
        this.target._id,
        this.targetType,
        this.itemsPage.page,
        this.pageSize,
        this.dbQuery
      )
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

}
