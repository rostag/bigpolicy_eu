import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.scss']
})

export class LeadersComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    // FIXME Implement title change for all components
    this.titleService.setTitle('Лідери — BigPolicy');
  }
}
