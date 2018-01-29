import { OnInit, Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
import { UserService } from './shared/user/user.service';
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
    public userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('• BP app v. ' + this.version + '. User service: ', this.userService);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
}
