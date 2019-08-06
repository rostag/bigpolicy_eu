import {OnInit, Component} from '@angular/core';
import {LeaderModel} from '../../shared/leader/leader.model';
import {ActivatedRoute} from '@angular/router';
import {DriveService} from '../../shared/drive/drive.service';
import {UserService} from '../../shared/user/user.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ILeader} from '../../common/models';
import {select, Store} from '@ngrx/store';
import {ILeaderState, getSelectedLeader} from '../../state/reducers/leader.reducers';
import {LoadLeader, CreateLeader, DeleteLeader, UpdateLeader, SelectLeader} from '../../state/actions/leader.actions';
import {BaseUnsubscribe} from '../../shared/base-unsubscribe/base.unsubscribe';
import {AuthState, IUserProfile, selectUserProfile} from '../../state/reducers/auth.reducers';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: './leader.edit.component.html',
  styleUrls: ['./leader.edit.component.scss']
})

export class LeaderEditComponent extends BaseUnsubscribe implements OnInit {

  public leaderFormGroup: FormGroup;

  // Must be public, used in template
  public leaderModel: ILeader = new LeaderModel();

  // Must be public, used in template
  public isUpdateMode = false;
  public userProfile: IUserProfile;

  private userProfile$: Observable<IUserProfile> = this.store.pipe(
    takeUntil(this.unsubscribe),
    select(selectUserProfile)
  );

  // FIXME apply validation - shall return either null if the control value is valid or a validation error object
  private static videoUrlValidator(c: FormControl) {
    const youTubeRegexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    const isYouTubeUrl = (c.value && c.value.match(youTubeRegexp)) !== null;
    return isYouTubeUrl ? null : {'forbiddenName': 'Error'};
  }

  constructor(
    private route: ActivatedRoute,
    private leaderStore: Store<ILeaderState>,
    public userService: UserService,
    public driveService: DriveService,
    private location: Location,
    private fb: FormBuilder,
    private store: Store<AuthState>
  ) {
    super();
  }

  /**
   * Initialization Event Handler, used to parse route params
   * like `id` in leader/:id/edit)
   */
  // FIXME Protect with Guard from unauthorized access
  public ngOnInit() {

    this.leaderFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      mission: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(999)]],
      vision: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(999)]],
      videoUrl: ['', LeaderEditComponent.videoUrlValidator],
      location: [''],
    });

    this.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
      this.leaderFormGroup.patchValue({
        name: userProfile ? userProfile.given_name : '',
        surName: userProfile ? userProfile.family_name : ''
      });
    });

    // FIXME TEST_1 2NGRX unauthorised user can't see the page
    this.route.params.subscribe((params) => {
      if (params.id && this.userService.authenticated()) {
        this.leaderStore.dispatch(new LoadLeader(params.id));
        this.isUpdateMode = true;
      } else {
        this.setLeader(null);
        this.leaderStore.dispatch(new SelectLeader(null));
      }
    });

    this.leaderStore.pipe(takeUntil(this.unsubscribe), select(getSelectedLeader)).subscribe(leader => {
      this.setLeader(leader);
    });
  }

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
