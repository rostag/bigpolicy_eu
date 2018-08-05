import { OnInit, Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
import { Router, NavigationEnd } from '@angular/router';

import * as appVersion from '../../package.json';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'BigPolicy';
  user: UserModel;
  version = appVersion['version'];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    userService.handleAuth();
  }

  ngOnInit() {
    console.log('BigPolicy v. ' + this.version);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
