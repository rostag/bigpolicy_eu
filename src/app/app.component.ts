import { OnInit, Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
import { Router, NavigationEnd } from '@angular/router';

import * as appVersion from './app-version.json';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'BigPolicy';
  user: UserModel;
  version = appVersion['app-version'];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    userService.handleAuth();
  }

  ngOnInit() {
    console.log('• BP app v. ' + this.version + '. User Auth service: ', this.userService);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
