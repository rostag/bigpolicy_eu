import { OnInit, Component } from '@angular/core';
import { ProjectService, ProjectModel } from '../../shared/project/index';
import { LeaderService, LeaderModel } from '../../shared/leader/index';

@Component({
  selector: 'app-bp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./skeleton.css', './landing.component.scss'],
  providers: [ProjectService, LeaderService]
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
    private projectService: ProjectService,
    private leaderService: LeaderService
  ) {}

  ngOnInit() {
    this.getProjects();
    this.getLeaders();
  }

  getLeaders() {
    this.leaderService.getLeaders()
      .subscribe(
        data => this.setLeaders(data),
        err => console.error(err),
        () => this.app.leaders
      );
  }

  private setLeaders(data) {
    this.app.leaders = data;
    return data;
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        data => this.setProjects(data),
        err => console.error(err),
        () => this.app.projects
      );
  }

  private setProjects(data) {
    this.app.projects = data;
    return data;
  }

  supportLeader() {
    console.log('support leader');
  }
}
