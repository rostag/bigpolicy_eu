import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DonationModel, DonationService } from '../index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'donations-list',
  templateUrl: './donations.list.component.html',
  styleUrls: ['./donations.list.component.scss'],
  providers: [DonationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DonationsListComponent implements OnChanges {

  // FIXME Implement interface for targets as Leaader, Project, Task
  @Input() target: any;

  private donations: BehaviorSubject<any> = new BehaviorSubject([{title:'Loading...'}]);

  ngOnChanges(changes) {
    var target = changes.target.currentValue;
    if (target && target._id) {
      this.requestDonations(target._id)
    }
  }

  constructor(
    private donationService: DonationService,
    private http: Http
  ) {}

  requestDonations(projectId) {
    var proxySub = this.donationService.getDonations('', projectId).subscribe(donations => {
      this.donations.next(donations);
      proxySub.unsubscribe();
    });
  }

}
