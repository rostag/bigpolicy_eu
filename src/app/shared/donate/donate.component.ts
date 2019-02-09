import { Component, OnChanges, Input } from '@angular/core';
import { DonationModel } from './donation.model';
import { DonationService } from './donation.service';
import { UserService } from '../../shared/user/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bp-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  providers: [DonationService]
})

export class DonateComponent implements OnChanges {

  // FIXME Implement DonationTarget interface
  @Input() target: any;
  @Input() amount: number;
  @Input() targetType = 'leader';
  @Input() label = 'Підтримати:';

  donationFormHtml: SafeHtml = '';
  readyToDonate = false;
  donationsListVisible = false;

  constructor(
    private sanitizer: DomSanitizer,
    private donationService: DonationService,
    private userService: UserService
  ) {
  }

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
        const id = b && b.substring(1, b.length - 1);
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

    d.targetType = this.targetType;
    d.targetId = this.target._id;
    d.donorId = this.userService.getEmail() || 'Anonymous';
    d.amount = this.amount;
    d.dateStarted = new Date();
    const wl = window.location;
    d.server_url = `${wl.protocol}//${wl.host}`;
    d.result_url = wl.href;

    if (this.targetType === 'leader') {
      d.description = `Переказ ${d.amount} UAH. Отримувач: S{this.target.name} ${this.target.surName}. Донор: ${donorName}. Дякуємо!`;
    } else if (this.targetType === 'project') {
      d.description = `Переказ ${d.amount} UAH. Призначення: проект "${this.target.title}". Донор: ${donorName}. Дякуємо!`;
    } else if (this.targetType === 'task') {
      d.description = `Переказ ${d.amount} UAH. Призначення: захід "${this.target.title}". Донор: ${donorName}. Дякуємо!`;
    }
    return d;
  }

  // FIXME Button Display
  private getDonationForm(_id) {
    const model = this.getDonationModel();
    model._id = _id;
    return this.donationService.requireSign(model).pipe(map(res => res))
      .subscribe((res) => {
        const sgndta = res['_body'].split('-BGPLCXX-');
        const formStr =
          `<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8">
            <input type="hidden" name="data" value="${sgndta[0]}" />
            <input type="hidden" name="signature" value="${sgndta[1]}" />
            <button mat-raised-button style="font-size:1.1em;font-weight:bold;padding:0.8em;cursor:pointer;" color="accent">
            Переказати ${this.amount} UAH</button>
          </form>`;
        // FIXME - Update button visual style, broken after ng update
        this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(formStr);
      });
  }

  onToggleDonationsList() {
    this.donationsListVisible = !this.donationsListVisible;
  }
}
