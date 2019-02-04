import {OnInit, Component} from '@angular/core';
import {LeaderModel} from '../../shared/leader';
import {ActivatedRoute} from '@angular/router';
import {DriveService} from '../../shared/drive';
import {UserService} from '../../shared/user/user.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ILeader} from '../../common/models';
import {Store} from '@ngrx/store';
import {ILeaderState, getSelectedLeader} from '../../state/reducers/leader.reducers';
import {LoadLeader, CreateLeader, DeleteLeader, UpdateLeader, SelectLeader} from '../../state/actions/leader.actions';

@Component({
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.scss']
})

export class LeaderEditComponent implements OnInit {

  public leaderFormGroup: FormGroup;

  // Must be public, used in template
  public leaderModel: ILeader = new LeaderModel();

  // Must be public, used in template
  public isUpdateMode = false;

  constructor(
    private route: ActivatedRoute,
    private leaderStore: Store<ILeaderState>,
    public userService: UserService,
    public driveService: DriveService,
    private location: Location,
    private fb: FormBuilder
  ) {
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  // FIXME Protect with Guard from unauthorized access
  public ngOnInit() {
    // FIXME
    const profile = this.userService.userProfile;
    // FIXME
    const fullname = profile ? profile['name'] : '';

    const name = new FormControl({
      disabled: true,
      value: fullname.split(' ')[0] + '^',
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]
    });

    const surName = new FormControl({
      disabled: true,
      name: fullname.split(' ')[1],
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]
    });

    // FIXME Code duplication
    // name: [fullname.split(' ')[0], [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    // surName: [fullname.split(' ')[1], [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    this.leaderFormGroup = this.fb.group({
      name,
      surName,
      mission: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(999)]],
      vision: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(999)]],
      videoUrl: ['', this.videoUrlValidator],
      location: [''],
    });

    // FIXME_SEC TEST_1 unauthorised user can't see the page
    // 2NGRX
    this.route.params.subscribe((params) => {
      if (params.id && this.userService.authenticated()) {
        this.leaderStore.dispatch(new LoadLeader(params.id));
        this.isUpdateMode = true;
      } else {
        this.setLeader(null);
        this.leaderStore.dispatch(new SelectLeader(null));
      }
    });

    this.leaderStore.select(getSelectedLeader).subscribe(leader => {
      this.setLeader(leader);
    });
  }

  // FIXME apply validation - shall return either null if the control value is valid or a validation error object
  private videoUrlValidator(c: FormControl) {
    const youTubeRegexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const isYouTubeUrl = (c.value && c.value.match(youTubeRegexp)) !== null;
    return isYouTubeUrl ? null : {'forbiddenName': 'Erriis'};
  }

  /**
   * Leader loading handler
   * @param {data} Loaded Leader data
   */
  public setLeader(leader: ILeader) {
    // if (!leader) { return; }
    console.log('Set leader:', leader);

    this.leaderModel = new LeaderModel();
    this.leaderModel.parseData(leader);
    this.driveService.checkConnection();
    this.leaderModel.applyModelToFormGroup(this.leaderFormGroup);
  }

  /**
   * Saves new or edited Leader by asking one of two service methods for DB.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  // FIXME: Complete Leader processing
  public onSubmit() {
    // Update leader from the Lader edit form
    this.leaderModel.applyFormGroupToModel(this.leaderFormGroup);

    if (this.isUpdateMode) {
      // Update existing Leader:
      this.leaderStore.dispatch(new UpdateLeader(this.leaderModel));
    } else {
      // FTUX: Create new Leader. If user's unauthorised, use service to save him to local storage, continue after login
      if (this.userService.needToLoginFirst(this.leaderModel)) {
        return false;
      }
      // NO FTUX: User is authorized already
      this.leaderModel.email = this.userService.getEmail();
      this.leaderStore.dispatch(new CreateLeader(this.leaderModel));
    }
  }

  /**
   * Removes the Leader from DB
   * @param {Leader} Leader to delete
   */
  public deleteLeader(leader: ILeader) {
    this.leaderStore.dispatch(new DeleteLeader(leader));
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

  public cancelEditing() {
    this.location.back();
  }

  public setLocation(location) {
    this.leaderFormGroup.controls.location.setValue(location);
  }
}
