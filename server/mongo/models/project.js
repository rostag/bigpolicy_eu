var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/*
	// TODO
	Define ranges:
		1) range of each value will be defined after coordination (with front-end)
		2) documents fields will be adjusted after coordination (with host place)
*/

/**
 * managerId is actually a manager email
 */

const ProjectSchema = new Schema({
	title: { type: String, required: true  },
	description: { type: String, required: true  },
	managerName: { type: String },
	managerId: { type: String },
	cost: { type: String, required: true  },
	dateStarted: { type: Date, required: true  },
	dateEnded: { type: Date, required: true  },
	image: { type: String },
	videoUrl: { type: String },
	logo: { type: String },
	tasks: { type: Array },

	createdAt: { type: Date }
});

module.exports = function(){
    try {
        mongoose.model('Project', ProjectSchema);
    } catch (error) {}

    return mongoose.model('Project');
}();
