import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LeaderService, LeaderModel } from '../../shared/leader/index';
import { UserService } from '../../shared/user/user.service';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.scss']
  })

export class LeaderEditComponent implements OnInit {

  leader: LeaderModel = new LeaderModel();

  private isUpdateMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderService: LeaderService,
    public userService: UserService,
    public snackBar: MdSnackBar
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {
    // FIXME
    const p = this.userService.userProfile;
    const fullname = p ? p['name'] : '';
    this.leader.name = fullname.split(' ')[0];
    this.leader.surName = fullname.split(' ')[1];
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('Leader Editor by ID from route params:', id);

        // TODO Test unauthorised user can't see the page
        if (id && this.userService.authenticated()) {
           this.isUpdateMode = true;
           this.leaderService.getLeader(id)
          .subscribe(
            data => {
              this.setLeader(data);
            },
            err => console.error(err),
            () => {}
          );
        }
      });
  }

  /**
   * Leader loading handler
   * @param {data} Loaded leader data
   */
  setLeader(data) {
    this.leader = new LeaderModel();
    this.leader.parseData(data);
  }

  /**
   * Remove this leader
   * @param {leader} Leader being viewed
   */
  deleteLeader(leader: LeaderModel) {
    // Delete from DB
    this.leaderService.deleteLeader(leader);

    this.router.navigate(['/leaders']);
    return false;
  }

  /**
   * Saves new or edited leader by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Leader processing
  onSaveLeaderClick(): boolean {
    if (this.isUpdateMode) {
      // Update existing leader:
      this.leaderService.updateLeader(this.leader)
      .subscribe(
        data => { this.leaderService.gotoLeaderView(data); },
        err => (er) => console.error('Leader update error: ', er),
        () => {}
      );
    } else {
      // Create new leader

      // FTUX: If user's unauthorised, save him to localStorage, continue after login
      if ( !this.userService.authenticated()) {
        this.saveToLocalStorage(this.leader);
        return false;
      }

      // NO FTUX - user is authorized already
      this.leaderService.createLeader(this.leader, this.userService.getEmail());
    }
    return false;
  }

  /**
   * FTUX - Lazy Leader Registration.
   * Save Leader to LocalStorage to let unauthorised user to start registration
   */
  saveToLocalStorage(leader) {
    console.log('≥≥≥ unauthorised, saving to localStorage');
    localStorage.setItem('BigPolicyLeaderRegistration', leader);
    this.showRegistrationIsNeededWarning();
  }

  showRegistrationIsNeededWarning() {
    // Simple message with an action.
    const snackBarRef = this.snackBar.open([
      'Для завершення реєстрації лідера необхідно увійти в систему. ',
      'Будь ласка, натисніть кнопку "Продовжити"'].join('<br><br>'),
    'Продовжити');

    // In either case, an MdSnackBarRef is returned. This can be used to dismiss
    // the snack-bar or to recieve notification of when the snack-bar is dismissed.
    // For simple messages with an action, the MdSnackBarRef exposes an observable for when the action is triggered.

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Заходимо у систему');
      this.userService.login();
    });

    // Dismissal
    // snackBarRef.dismiss();

    // A snack-bar can also be given a duration via the optional configuration object:

    // snackBarRef.open('Message archived', 'Undo', {
    //   duration: 3000
    // });
  }
}
