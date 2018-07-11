var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 *  TODO: Define ranges
 *    1) range of each value will be defined
 *    2) documents fields will be adjusted
 */

const projectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	managerName: { type: String },
	managerId: { type: String },
	managerEmail: { type: String },
	cost: { type: String, required: true },
	dateStarted: { type: Date, required: true },
	dateEnded: { type: Date, required: true },
	videoUrl: { type: String },
	imageUrl: { type: String },
	taskIds: { type: [Schema.Types.ObjectId] },
	donations: { type: Array },
	totalDonationsReceived: { type: Number }
});

projectSchema.plugin(mongoosePaginate);

module.exports = function(){
  try {
    mongoose.model('Project', projectSchema);
  } catch (error) {
  }
  return mongoose.model('Project');
}();
