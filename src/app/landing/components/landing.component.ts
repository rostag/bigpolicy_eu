// FIXME To be removed
import { OnInit, Component } from '@angular/core';
import { LeaderService } from '../../shared/leader';
import { UserService } from '../../shared/user/user.service';

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
    public userService: UserService,
    private leaderService: LeaderService
  ) {}


  ngOnInit() {
    this.getProjects();
    this.getLeaders();
  }

  getLeaders() {
    // TODO RESTORE WHEN NEEDED
    // this.leaderService.get LeadersPage(null, 1, 3)
    //   .subscribe(
    //     data => this.setLeaders(data['docs']),
    //     err => console.error(err),
    //     () => this.app.leaders
    //   );
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
