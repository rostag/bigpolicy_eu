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
  ) {}

  ngOnChanges(changes){
    if(changes.target) {
      // console.log('doing crazy stuff here', this.target, changes.target);
      this.getDonationForm();
    }
  }

  private getDonationForm() {
    console.log('getDonationForm:', this.target, this.amount);

    var donation = this.prepareDonation();

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
          '<button md-raised-button color="accent">Переказати '+ this.amount +' UAH</button>'
          + '</form>';
        // console.log('Got donation form:', decodeURIComponent(res["_body"]))
        proxySub.unsubscribe();
        // this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(decodeURIComponent(res["_body"]))
        this.donationFormHtml = this.sanitizer.bypassSecurityTrustHtml(formStr)
      });

    return proxySub;
  }

  private prepareDonation() {

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
    d.externalId = 'bp_donation_' + d.amount + '__from_' + d.donorId + '__to_' + d.targetId + '__type_' + d.targetType;

    return d;
  }

  private donateLeader() {
    console.log('donateLeader:', this.target, this.amount);

    this.target.totalDonationsReceived += this.amount;

    var d = this.prepareDonation();

    this.donationService.donateLeader(d);

    // if not virtual transaction
    this.readyToDonate = true;

    return false;
  }

}
