import { OnInit, Component } from '@angular/core';
import { LeaderService, LeaderModel, ILeader } from '../../shared/leader';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from '../../shared/drive';
import { UserService } from '../../shared/user';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.scss']
})

export class LeaderEditComponent implements OnInit {

  public leaderFormGroup: FormGroup;

  // Must be public, used in template
  public leaderModel: LeaderModel = new LeaderModel();

  // Must be public, used in template
  public isUpdateMode = false;

  constructor(
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    public userService: UserService,
    public driveService: DriveService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  ngOnInit() {

    console.log('Init Leader Editor, route params:', this.route.params);

    // FIXME
    const profile = this.userService.userProfile;
    // FIXME
    const fullname = profile ? profile['name'] : '';

    // FIXME Code duplication
    this.leaderFormGroup = this.fb.group({
      name:     [fullname.split(' ')[0], [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surName:  [fullname.split(' ')[1], [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      mission:  ['', [Validators.required, Validators.minLength(100), Validators.maxLength(999)]],
      vision:   ['', [Validators.required, Validators.minLength(100), Validators.maxLength(999)]],
      videoUrl: ['', this.videoUrlValidator]
    });

    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        console.log('Leader Editor by ID from route params:', id);

        // FIXME_SEC TEST_1 unauthorised user can't see the page
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

  // FIXME apply validation
  // returns either null if the control value is valid or a validation error object
  videoUrlValidator(c: FormControl) {
    const youTubeRegexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    // console.log('yourube validity: ', c.value, c.value.match(youTubeRegexp) );
    const isYouTubeUrl = (c.value && c.value.match(youTubeRegexp)) !== null;
    return isYouTubeUrl ? null : {'forbiddenName': 'Erriis'};
  }

  /**
   * Leader loading handler
   * @param {data} Loaded Leader data
   */
  setLeader(data) {
    this.leaderModel = new LeaderModel();
    this.leaderModel.parseData(data);
    this.driveService.checkConnection();

    this.leaderModel.applyModelToFormGroup(this.leaderFormGroup);

    console.log('Leader Form Group: ', this.leaderFormGroup);
  }

  /**
  * Saves new or edited Leader by asking one of two service methods for DB.
  * @returns return false to prevent default form submit behavior to refresh the page.
  */
  // FIXME: Complete Leader processing
  onSubmit() {
    console.log( this.leaderFormGroup.value, this.leaderFormGroup.valid );

    // Update leader from form
    this.leaderModel.applyFormGroupToModel(this.leaderFormGroup);

    if (this.isUpdateMode) {
      // Update existing Leader:
      this.leaderService.updateLeader(this.leaderModel)
      .subscribe(
        data => { this.leaderService.gotoLeaderView(data); },
        err => (er) => console.error('Leader update error: ', er),
        () => {}
      );
    } else {
      // Create new Leader:
      // FTUX: If user's unauthorised, use service to save him to local storage, continue after login
      if (this.userService.needToLoginFirst(this.leaderModel)) {
        return false;
      }
      // NO FTUX - user is authorized already
      this.leaderService.createLeader(this.leaderModel, this.userService.getEmail());
    }
  }

  /**
   * Removes the Leader from DB
   * @param {Leader} Leader to delete
   */
  deleteLeader(leaderModel: LeaderModel) {
    this.leaderService.deleteLeader(leaderModel);
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
    this.leaderModel.leaderFiles = files;
  }

  cancelEditing() {
    this.location.back();
  }
}
