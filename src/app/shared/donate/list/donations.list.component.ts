import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DonationModel, DonationService } from '../index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations.list.component.html',
  styleUrls: ['./donations.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DonationService]
})

export class DonationsListComponent implements OnChanges {

  // FIXME Implement interface for targets as Leaader, Project, Task
  @Input() target: any;
  // Either Leader, Project or Task
  @Input() targetType: string;

  @Input() pageSize = 5;

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
    if (target && target._id) {
      this.requestItems();
    } else if (changes.pageSize && changes.pageSize.currentValue) {
      this.requestItems();
    }
  }

  constructor(
    private donationService: DonationService,
    private http: Http
  ) {}

  pageChanged(pageNumber) {
    this.itemsPage.page = pageNumber;
    this.requestItems();
  }

  // FIXME REMOVE CODE DUPLICATION
  requestItems() {
    const proxySub = this.donationService.getDonationsPage(null, this.target._id, this.targetType, this.itemsPage.page, this.pageSize)
      .subscribe(responsePage => {
        console.log('Next, responsePage:', responsePage);
        this.itemsPage.docs.next(responsePage['docs']);
        this.itemsPage.limit = responsePage['limit'];
        this.itemsPage.page = responsePage['page'];
        this.itemsPage.pages = responsePage['pages'];
        this.itemsPage.total = responsePage['total'];
        proxySub.unsubscribe();
      });
  }

// OBSOLETE
  // private requestDonations() {
  //   const proxySub = this.donationService.getDonations('', this.target._id, this.targetType, ).subscribe(donations => {
  //     this.donations.next(donations);
  //     proxySub.unsubscribe();
  //   });
  // }

}
