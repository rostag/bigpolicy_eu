import { Component } from '@angular/core';
import { LeaderModel, LeaderService } from '../../shared/leader/index';
import { DonationModel, DonationService } from '../../shared/donate/index';
import { UserService } from '../../shared/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  templateUrl: './leader.view.component.html',
  styleUrls: ['./leader.view.component.scss'],
  providers: [LeaderService, UserService]
})

export class LeaderViewComponent {

  leader: LeaderModel = new LeaderModel()

  /**
   * Dependency Injection: route (for reading params later)
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    private donationService: DonationService,
    private user: UserService,
    private sanitizer: DomSanitizer
  ){}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('View Leader by ID from route params:', id)
        if (id) {
          this.leaderService.getLeader(id)
          .subscribe(
            data => {
              this.setLeader(data);
              this.getDonationForm(70)
            },
            err => console.error(err),
            () => {}
          )
        }
      })
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data){
    console.log('got leader: ', data);
    this.leader = data;
  }

  private donationFormHtml: SafeHtml = '';

  private getDonationForm(amount) {
    console.log('getDonationForm:', this.leader, amount);

    var donation = new DonationModel();
    donation.targetType = 'leader';
    donation.targetId = this.leader._id;
    // FIXME Use real donor
    donation.donorId = 'sandbox';
    donation.amount = amount;
    donation.dateStarted = new Date();
    donation.description = 'to ' + this.leader.name + this.leader.surName;

    var proxySub = this.donationService.requireSign(donation)
    // var proxySub = this.donationService.requireDonationForm(donation)
      .map(res => {
        console.log('Form HTML:', res)
        return res;
      })
      // .catch(this.handleError)
      .subscribe((res) => {
        // -BGPLCXX-
        var sgndta = res["_body"].split('-BGPLCXX-');
        var formStr =
        '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8"><input type="hidden" name="data" value="' +
          sgndta[0] + '" /><input type="hidden" name="signature" value="' +
          sgndta[1] + '" />' +
          // '<input type="image" src="//static.liqpay.com/buttons/p1ru.radius.png" name="btn_text" />'
          '<button md-raised-button color="accent">Підтримати (70 UAH)</button>'
          + '</form>';
        // console.log('LEADER Got donation form:', decodeURIComponent(res["_body"]))
        proxySub.unsubscribe();
        // this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(decodeURIComponent(res["_body"]))
        this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(formStr)
      });

    return proxySub;
  }

  private donateLeader(amount) {
    console.log('donateLeader:', this.leader, amount);

    this.leader.totalDonationsReceived += amount;

    var donation = new DonationModel();
    donation.targetType = 'leader';
    donation.targetId = this.leader._id;
    // FIXME
    donation.donorId = 'sandbox';
    donation.amount = amount;
    donation.dateStarted = new Date();
    donation.description = 'to ' + this.leader.name + this.leader.surName;

    this.donationService.donateLeader(donation);

    // if not virtual transaction
    this.getDonationForm(amount);

    return false;
  }

  /**
   * Remove this leader
   * @param {leader} Leader being viewed
   */
  private deleteLeader(leader: LeaderModel) {
    // Delete from DB
    this.leaderService.deleteLeader(leader)

    this.router.navigate(['/leaders'])
    return false;
  }
}
