import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardModule } from '@angular/material';
@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.scss']
})

export class LeadersComponent {

  constructor(private titleService: Title) {

  }

  ngOnInit() {
    // FIXME Implement title change for all components
    this.titleService.setTitle('Лідери — BigPolicy');
  }
 }
