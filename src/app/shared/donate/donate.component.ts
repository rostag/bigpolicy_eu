import { Component, OnChanges, Input, AfterViewChecked, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { DonationModel, DonationService } from './index';
import { UserService } from '../../shared/user/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'bp-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  providers: [DonationService, UserService]
})

export class DonateComponent implements OnChanges {

  // FIXME Implement DonationTarget interface
  @Input() target: any;
  @Input() amount: number;
  @Input() targetType: string = 'leader';
  @Input() label: string = 'Підтримати:';

  private donationFormHtml: SafeHtml = '';
  private readyToDonate: boolean = false;
  private donationsListVisible: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private donationService: DonationService,
    private userService: UserService
  ){}

  /**
   * Populate target properties when it's ready from parent component
   */
  ngOnChanges(changes){
    if(changes.target) {
      //
    }
  }

  private onDonateToggle() {
    console.log('onDonateToggle:', this.target, this.amount);
    this.target.totalDonationsReceived += this.amount;
    // FIXME implement order status check
    this.donationService.createDonation(this.getDonationModel());
    // TODO if not virtual transaction
    this.readyToDonate = !this.readyToDonate;
    this.getDonationForm();
    return false;
  }

  private getDonationModel() {
    var d = new DonationModel();
    var userProfile = this.userService.userProfile;
    var donorName = userProfile && userProfile['name'] || 'Анонімний донор';

    // FIXME
    d.targetType = this.targetType;
    d.targetId = this.target._id;
    // FIXME Use real donor when logged in
    d.donorId = userProfile && userProfile['email'] || 'Anonymous';
    d.amount = this.amount;
    d.dateStarted = new Date();
    console.log('#### window.location: ', window.location.href);
    d.result_url = window.location.href;

    if (this.targetType === 'leader') {
      d.description = 'Переказ ' + d.amount + ' UAH. Отримувач: ' + this.target.name + ' ' + this.target.surName + '. Донор: ' + donorName + '. Дякуємо!';
    } else if (this.targetType === 'project') {
      d.description = 'Переказ ' + d.amount + ' UAH. Призначення: проект "' + this.target.title + '". Донор: ' + donorName + '. Дякуємо!';
    } else if (this.targetType === 'task') {
      d.description = 'Переказ ' + d.amount + ' UAH. Призначення: захід "' + this.target.title + '". Донор: ' + donorName + '. Дякуємо!';
    }

    // order_id
    // FIXME add mongo ID here
    d.externalId = 'bp_donation_' + d.amount + '__from_' + d.donorId + '__to_' + d.targetId + '__type_' + d.targetType + '__t_' + Date.now();

    return d;
  }

  private getDonationForm() {
    return this.donationService.requireSign(this.getDonationModel())
      .map(res => {
        return res;
      })
      .subscribe((res) => {
        var sgndta = res["_body"].split('-BGPLCXX-');
        var formStr =
        '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8"><input type="hidden" name="data" value="' +
          sgndta[0] + '" /><input type="hidden" name="signature" value="' +
          sgndta[1] + '" /><button md-raised-button color="accent">Переказати '+ this.amount +' UAH</button>' +
        '</form>';
        this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(formStr)
      });
  }

  private onToggleDonationsList() {
    this.donationsListVisible = !this.donationsListVisible;
  }

  // UNUSED
  private requireDonationForm() {
    return this.donationService.requireDonationForm(this.getDonationModel())
      .map(res => {
        return res;
      })
      .subscribe((res) => {
        this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(decodeURIComponent(res["_body"]))
      });
  }
}
