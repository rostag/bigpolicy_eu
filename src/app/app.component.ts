import { OnInit, Component } from '@angular/core';
import { UserModel } from './shared/user/user.model';
// FIXME: Avoid Double-declaration (it's also in Module)
import { UserService } from './shared/user/user.service';
import { ProjectService } from './shared/project/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'BigPolicy';
  user: UserModel;

  constructor(
    public userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    console.log('• BP app init, user service: ', this.userService);
  }

}
