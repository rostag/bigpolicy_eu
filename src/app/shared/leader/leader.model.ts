import { UserService } from '../user/user.service';
import { FormGroup } from '@angular/forms';
import { ILeader } from '../../common/models';

export class LeaderModel implements ILeader {
  _id: string;
  name: string;
  surName: string;
  parentName: string;
  vision: string;
  mission: string;
  email: string;
  videoUrl: string;
  photo: string;
  donations;
  projectIds;
  leaderFiles;
  totalDonationsReceived = 0;

  party: number;
  officialPost: string;
  socialNetworks: string;
  skills: string;

  // documents
  docActionPlan: string;
  docElectionProgram: string;
  docPropertyDeclaration: string;
  docCriminalRecord: string;
  docCorruptionRecord: string;
  docPassport: string;

  location: string;

  /**
   * It's necessary to have a string representation for sending it to DB
   * @returns String Serialized Leader
   */
  toString() {
    // FIXME TEST_1 -- Somehow it stops saving if switch to next string instead of bulky code
    console.log('leader model.toString', this);
    return JSON.stringify(this);
  }

  /**
   * Populate model from a json representation loaded from DB or local storage
   */
  parseData(data) {
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        this[item] = data[item];
      }
    }
  }

  onPhotoUrlChange(newUrlValue) {
    console.log('Leader photo url:', newUrlValue);
    this.photo = newUrlValue;
  }

  applyFormGroupToModel(f: FormGroup) {
    this.name = f.get('name').value;
    this.surName = f.get('surName').value;
    this.vision = f.get('vision').value;
    this.mission = f.get('mission').value;
    this.videoUrl = f.get('videoUrl').value;
    this.location = f.get('location').value;
  }

  applyModelToFormGroup(formGroup: FormGroup) {
    formGroup.patchValue(this);
  }
}
