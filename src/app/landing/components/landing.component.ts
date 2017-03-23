import { OnInit, Component } from '@angular/core';
import { ProjectService, ProjectModel } from '../../shared/project';
import { LeaderService, LeaderModel } from '../../shared/leader';
import { UserService } from '../../shared/user';

@Component({
  selector: 'app-bp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./skeleton.css', './landing.component.scss'],
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
    private projectService: ProjectService,
    private leaderService: LeaderService
  ) {}


  ngOnInit() {
    // this.getProjects();
    // this.getLeaders();
  }

  // OBSOLETE
  // getLeaders() {
  //   this.leaderService.get LeadersPage()
  //     .subscribe(
  //       data => this.setLeaders(data),
  //       err => console.error(err),
  //       () => this.app.leaders
  //     );
  // }

  private setLeaders(data) {
    this.app.leaders = data;
    return data;
  }

  // FIXME PG_MIGRATION
  // OBSOLETE
  // getProjects() {
  //   this.projectService.get ProjectsPage()
  //     .subscribe(
  //       data => this.setProjects(data),
  //       err => console.error(err),
  //       () => this.app.projects
  //     );
  // }

  private setProjects(data) {
    this.app.projects = data;
    return data;
  }

  supportLeader() {
    console.log('support leader');
  }
}
