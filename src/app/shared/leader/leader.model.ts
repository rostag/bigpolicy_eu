import { UserService } from '../user/user.service';

export class LeaderModel {

  _id: string;

	// personal info
  name: string;
  parentName: string;
  surName: string;
  vision: string;
  mission: string;
  photo: string;
  videoUrl: string;
  email: string;
  projects;
  donations;
  // FIXME Check for Null prevention
  leaderFiles;
  totalDonationsReceived: Number = 0;

  // id of party from parties list
  party: Number;
  officialPost: string;

  // other
  socialNetworks: string;
  skills: string;

  // important personal documents
  docActionPlan: string;
  docElectionProgram: string;
  docPropertyDeclaration: string;
  docCriminalRecord: string;
  docCorruptionRecord: string;
  docPassport: string;

  /**
   * It's necessary to have a string representation for sending it to DB
   * @returns String Serialized Leader
   */
  toString() {
      // FIXME TEST_1 -- Somehow it stops saving if switch to next string instead of bulky code
      return JSON.stringify( this );
  }

	/**
   * Populate model from a json representation loaded from DB or localStorage
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
}
