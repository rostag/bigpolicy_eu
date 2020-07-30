import {OnInit, Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import * as appVersion from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  version = appVersion['version'];

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(`BigPolicy v.${this.version}`);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
