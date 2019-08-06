import { Component, OnInit} from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ILeader } from '../common/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

}
