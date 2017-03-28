import { Component, Output, OnInit, OnChange } from '@angular/core';

@Component({
  selector: 'app-leader-brief',
  templateUrl: './leader.brief.component.html',
  styleUrls: ['./leader.brief.component.css']
})
export class LeaderBriefComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnChange(changes) {
    if (changes.leaderId) {
      if (changes.leaderId.currentValue = 'random') {
        console.log('get random leader');
      }
    }
  }

}
