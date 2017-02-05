import { Component, OnChanges, Input, AfterViewChecked, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { DonationModel, DonationService } from './index';
import { UserService } from '../../shared/user/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-bp-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  providers: [DonationService, UserService]
})

export class DonateComponent implements OnChanges {

  // FIXME Implement DonationTarget interface
  @Input() target: any;
  @Input() amount: number;
  @Input() targetType = 'leader';
  @Input() label = 'Підтримати:';

  donationFormHtml: SafeHtml = '';
  private readyToDonate = false;
  private donationsListVisible = false;

  constructor(
    private sanitizer: DomSanitizer,
    private donationService: DonationService,
    private userService: UserService
  ) {}

  /**
   * Populate target properties when it's ready from parent component
   */
  ngOnChanges(changes) {
    if (changes.target) {
      //
    }
  }

  onDonateToggle() {
    console.log('onDonateToggle:', this.target, this.amount);
    this.target.totalDonationsReceived += this.amount;
    // FIXME implement order status check
    this.donationService.createDonation(this.getDonationModel())
      .subscribe((res) => {
        const b = res['_body'];
        const id = b.substring(1, b.length - 1);
        // TODO if not virtual transaction
        this.readyToDonate = !this.readyToDonate;
        this.getDonationForm(id);
      });

      return false;
  }

  private getDonationModel() {
    const d = new DonationModel();
    const userProfile = this.userService.userProfile;
    const donorName = userProfile && userProfile['name'] || 'Анонімний донор';

    // FIXME
    d.targetType = this.targetType;
    d.targetId = this.target._id;
    // FIXME Use real donor when logged in
    d.donorId = this.userService.getEmail() || 'Anonymous';
    d.amount = this.amount;
    d.dateStarted = new Date();
    const wl = window.location;
    d.server_url = wl.protocol + '//' + wl.host;
    d.result_url = wl.href;
    console.log('##server_url: ', d.server_url);

    if (this.targetType === 'leader') {
      d.description = 'Переказ ' + d.amount + ' UAH. Отримувач: ' + this.target.name + ' ' + this.target.surName +
      '. Донор: ' + donorName + '. Дякуємо!';
    } else if (this.targetType === 'project') {
      d.description = 'Переказ ' + d.amount + ' UAH. Призначення: проект "' + this.target.title + '". Донор: ' + donorName + '. Дякуємо!';
    } else if (this.targetType === 'task') {
      d.description = 'Переказ ' + d.amount + ' UAH. Призначення: захід "' + this.target.title + '". Донор: ' + donorName + '. Дякуємо!';
    }

    return d;
  }

  private getDonationForm(_id) {
    const model = this.getDonationModel();
    model._id = _id;
    return this.donationService.requireSign(model)
      .map(res => {
        return res;
      })
      .subscribe((res) => {
        const sgndta = res['_body'].split('-BGPLCXX-');
        const formStr =
        '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8"><input type="hidden" name="data" ' +
          'value="' + sgndta[0] + '" /><input type="hidden" name="signature" value="' +
          sgndta[1] + '" /><button md-raised-button color="accent">Переказати ' + this.amount + ' UAH</button>' +
        '</form>';
        this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(formStr);
      });
  }

  onToggleDonationsList() {
    this.donationsListVisible = !this.donationsListVisible;
  }

  // UNUSED
  // private requireDonationForm() {
  //   return this.donationService.requireDonationForm(this.getDonationModel())
  //     .map(res => {
  //       return res;
  //     })
  //     .subscribe((res) => {
  //       this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(decodeURIComponent(res["_body"]))
  //     });
  // }
}
