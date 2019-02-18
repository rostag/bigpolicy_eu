import { OnInit, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './shared/user/user.service';
import * as appVersion from '../../package.json';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'BigPolicy';
  version = appVersion['version'];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    userService.handleAuth();
  }

  ngOnInit() {
    console.log(`BigPolicy v.${this.version}`, environment.K);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
