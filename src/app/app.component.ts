import { OnInit, Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
import { AuthService } from './auth/auth.service';
import { ProjectService } from './shared/project/project.service';
import { Router, NavigationEnd } from '@angular/router';

import * as appVersion from './app-version.json';

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
    private auth: AuthService,
    private projectService: ProjectService,
    private router: Router
  ) {
    auth.handleAuth();    
  }

  ngOnInit() {
    console.log('• BP app v. ' + this.version + '. Auth service: ', this.auth);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
}
