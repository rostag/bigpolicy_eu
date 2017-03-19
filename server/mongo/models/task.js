var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 *  TODO
 *  Define ranges:
 *    1) range of each value will be defined
 *    2) documents fields will be adjusted
 */

const taskSchema = new Schema({
	title: { type: String, required: true  },
	description: { type: String, required: true  },
	projectId: { type: String, required: true },
	cost: { type: String, required: true  },
	dateStarted: { type: Date, required: true  },
	dateEnded: { type: Date, required: true  },
	image: { type: String },
	videoUrl: { type: String },
	logo: { type: String },
	donations: { type: Array },
	totalDonationsReceived: { type: Number },
});

taskSchema.plugin(mongoosePaginate);

module.exports = function(){
  try {
    mongoose.model('Task', taskSchema);
  } catch (error) {
  }
  return mongoose.model('Task');
}();
