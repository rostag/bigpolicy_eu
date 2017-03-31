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
      // TODO - ask on SO
      // FIXME -- Somehow it stops saving if switch to next string instead of bulky code
      // return JSON.stringify( this );
      return JSON.stringify({
      name: this.name,
      surName: this.surName,
      parentName: this.parentName = ' ',
      vision: this.vision,
      mission: this.mission,
      photo: this.photo,
      videoUrl: this.videoUrl,
      email: this.email,
      party: this.party,
      officialPost: this.officialPost,
      socialNetworks: this.socialNetworks,
      skills: this.skills,
      docActionPlan: this.docActionPlan,
      docElectionProgram: this.docElectionProgram,
      docPropertyDeclaration: this.docPropertyDeclaration,
      docCriminalRecord: this.docCriminalRecord,
      docCorruptionRecord: this.docCorruptionRecord,
      docPassport: this.docPassport,
      totalDonationsReceived: this.totalDonationsReceived,
      projects: this.projects,
      donations: this.donations,
      leaderFiles: this.leaderFiles
    });
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
