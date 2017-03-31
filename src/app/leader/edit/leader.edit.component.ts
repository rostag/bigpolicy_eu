import { OnInit, Component } from '@angular/core';
import { LeaderService, LeaderModel } from '../../shared/leader';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveService } from '../../shared/drive';
import { DialogService } from '../../shared/dialog/dialog.service';
import { UserService } from '../../shared/user';
import { Location } from '@angular/common';

@Component({
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.scss']
  })

export class LeaderEditComponent implements OnInit {

  leader: LeaderModel = new LeaderModel();

  isUpdateMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderService: LeaderService,
    public userService: UserService,
    public driveService: DriveService,
    private dialogService: DialogService,
    private location: Location
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
        // console.log('Leader Editor by ID from route params:', id);

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
    this.driveService.checkConnection();
  }

  /**
   * Remove this leader
   * @param {leader} Leader being viewed
   */
  deleteLeader(leader: LeaderModel) {
    // Delete Leader from DB
    this.leaderService.deleteLeader(leader);
    this.router.navigate(['/leaders']);
    return false;
  }

  /**
   * Prepares Leader's file list, received by event from file list editor, for saving.
   */
  onFileListUpdate(fileList: Array<any>) {
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push({
        link: fileList[i].webViewLink,
        name: fileList[i].name
      });
    }
    this.leader.leaderFiles = files;
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
    this.dialogService
       .confirm('Потрібна авторизація', 'Для завершення реєстрації треба увійти в систему. Будь ласка, натиcни "Продовжити"')
       .subscribe(res => {
         console.log('Заходимо у систему');
         this.userService.login();
       });
   }

   cancelEditing() {
     this.location.back();
   }

}
