// FIXME To be removed
import { OnInit, Component } from '@angular/core';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-bp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})

export class LandingComponent implements OnInit {

  // FIXME calculate total donations
  app = {
    donors: 0,
    totalDonationsReceived: 0,
    projects: [],
    leaders: []
  };

  constructor(
    public userService: UserService
  ) {}


  ngOnInit() {
    this.getProjects();
  }

  private setLeaders(data) {
    this.app.leaders = data;
    return data;
  }

  getProjects() {
    // this.projectService.get ProjectsPage(null, null, 1, 3)
    //   .subscribe(
    //     data => this.setProjects(['data']),
    //     err => console.error(err),
    //     () => this.app.projects
    //   );
  }

  private setProjects(data) {
    this.app.projects = data;
    return data;
  }

  supportLeader() {
    console.log('support leader');
  }
}
