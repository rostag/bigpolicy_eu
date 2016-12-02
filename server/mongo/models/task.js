var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/*
	// TODO
	Define ranges:
		1) range of each value will be defined after coordination (with front-end)
		2) documents fields will be adjusted after coordination (with host place)
*/

const TaskSchema = new Schema({
	title: { type: String, required: true  },
	description: { type: String, required: true  },
	projectId: { type: String, required: true },
	cost: { type: String, required: true  },
	dateStarted: { type: Date, required: true  },
	dateEnded: { type: Date, required: true  },
	image: { type: String },
	videoUrl: { type: String },
	logo: { type: String },

	createdAt: { type: Date }
});

module.exports = function(){
    try {
        mongoose.model('Task', TaskSchema);
    } catch (error) {}

    return mongoose.model('Task');
}();
