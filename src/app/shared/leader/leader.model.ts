import { UserService } from '../user/user.service';

export class LeaderModel {

	_id: String;

	// personal info
	name: String;
	parentName: String;
	surName: String;
	vision: String;
	mission: String;
	photo: String;
	videoUrl: String;
	logo: String;
	email: String;
	projects;

	// political party membership
  // id of party from parties list
	party: Number;
	officialPost: String;

	// other
	socialNetworks: String;
	skills: String;

	// important personal documents
	docActionPlan: String;
	docElectionProgram: String;
	docPropertyDeclaration: String;
	docCriminalRecord: String;
	docCorruptionRecord: String;
	docPassport: String;

	// end of documents
	createdAt: String;

	cash: Number = Math.random() * 1000;

  /**
   * It's necessary to have a string representation for sending it to DB
   * @returns String Serialized Leader
   */
	 toString() {
		 // TODO - ask on SO
		 // FIXME -- Somehow it stops saving if switch to next string instead of bulky code
     // return JSON.stringify( this );
     return JSON.stringify({
       "name": this.name,
       "surName": this.surName,
       "parentName": this.parentName = ' ',
       "vision": this.vision,
       "mission": this.mission,
       "photo": this.photo,
       "videoUrl": this.videoUrl,
       "logo": this.logo,
       "email": this.email,
       "projects": this.projects,
       "party": this.party,
       "officialPost": this.officialPost,
       "socialNetworks": this.socialNetworks,
       "skills": this.skills,
       "docActionPlan": this.docActionPlan,
       "docElectionProgram": this.docElectionProgram,
       "docPropertyDeclaration": this.docPropertyDeclaration,
       "docCriminalRecord": this.docCriminalRecord,
       "docCorruptionRecord": this.docCorruptionRecord,
       "docPassport": this.docPassport,
 			"cash": this.cash
     })
   }

	/**
   * Populate model from a json representation loaded from DB
   */
  parseData(data) {
    for (var item in data) {
      this[item] = data[item]
    }
  }

}
