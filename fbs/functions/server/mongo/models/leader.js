var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 *  TODO: Define ranges
 *    1) range of each value will be defined
 *    2) documents fields will be adjusted
 */

const leaderSchema = new Schema({
	// personal info
	name: { type: String, required: true },
	parentName: { type: String },
	surName: { type: String, required: true },
	vision: { type: String, required: true },
	mission: { type: String, required: true },
	photo: { type: String },
	videoUrl: { type: String },
	email: { type: String, required: true },
	projectIds: { type: [Schema.Types.ObjectId] },
  // An array of cached Leader's files, which are stored in GDrive
	leaderFiles: { type: Array },
	donations: { type: Array },
	totalDonationsReceived: { type: Number },
	location: { type: String },

	// group membership
	// leader's party id
	party: { type: Number },
	officialPost: { type: String },

	// other
	socialNetworks	: { type: String },// json
	skills: { type: String },

	// important personal documents
	docActionPlan: { type: String },
	docElectionProgram: { type: String },
	docPropertyDeclaration: { type: String },
	docCriminalRecord: { type: String },
	docCorruptionRecord: { type: String },
	docPassport: { type: String },
});

leaderSchema.plugin(mongoosePaginate);

module.exports = function(){
  try {
    mongoose.model('Leader', leaderSchema);
  } catch (error) {
		console.log('Error during creation:', error)
	}
  return mongoose.model('Leader');
}();
