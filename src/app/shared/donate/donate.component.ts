import { Component, OnChanges, Input, AfterViewChecked, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { ProjectModel } from '../../shared/project/index';
import { DonationModel, DonationService } from './index';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'bp-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  providers: [DonationService]
})

  export class DonateComponent implements OnChanges {

  // FIXME Implement DonationTarget interface
  @Input() target: any;
  @Input() amount: number;
  @Input() targetType: string = 'leader';
  @Input() label: string = 'Підтримати:';

  private donationFormHtml: SafeHtml = '';
  private readyToDonate: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private donationService: DonationService
  ){}

  /**
   * Populate target properties when it's ready from parent component
   */
  ngOnChanges(changes){
    if(changes.target) {
      this.getDonationForm();
    }
  }

  private onDonateTarget() {
    console.log('onDonateTarget:', this.target, this.amount);
    this.target.totalDonationsReceived += this.amount;
    // FIXME implement order status check
    this.donationService.donateTarget(this.getDonationModel());
    // TODO if not virtual transaction
    this.readyToDonate = true;
    return false;
  }

  private getDonationModel() {
    var d = new DonationModel();

    // FIXME
    d.targetType = this.targetType;
    d.targetId = this.target._id;
    // FIXME Use real donor
    d.donorId = 'Анонімний донор';
    d.amount = this.amount;
    d.dateStarted = new Date();

    if (this.targetType === 'leader') {
      d.description = 'Переказати ' + d.amount + ' UAH. Отримувач: ' + this.target.name + ' ' + this.target.surName + ' (' + this.targetType +'). Донор: ' + d.donorId + '. \nДякуємо!';
    } else if (this.targetType === 'project') {
      d.description = 'Переказати ' + d.amount + ' UAH. Призначення: проект "' + this.target.title + '". Донор: ' + d.donorId + '. Дякуємо!';
    } else if (this.targetType === 'task') {
      d.description = 'Переказати ' + d.amount + ' UAH. Призначення: захід "' + this.target.title + '". Донор: ' + d.donorId + '. Дякуємо!';
    }

    // order_id
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
