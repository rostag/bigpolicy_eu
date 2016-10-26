var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/*
	// TODO
	Define ranges:
		1) range of each value will be defined after coordination (with front-end)
		2) documents fields will be adjusted after coordination (with host place)
*/

const LeaderSchema = new Schema({
	// personal info
	name: { type: String, required: true  },
	parentName: { type: String, required: true  },
	surName: { type: String, required: true  },
	vision: { type: String, required: true  },
	mission: { type: String, required: true  },
	photo: { type: String },
	videoUrl: { type: String },
	logo: { type: String },// ???
	email: { type: String },

	// political party membership
	// id of party from parties lst
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

	// end of documents
	createdAt: { type: Date }
});

module.exports = function(){
    try {
        mongoose.model('Leader', LeaderSchema);
    } catch (error) {}

    return mongoose.model('Leader');
}();
