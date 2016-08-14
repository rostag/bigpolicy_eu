var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
  fbId: { type: String },
  twitterId: { type: String },
	image: { type: String },
	video: { type: String },
	logo: { type: String },

	createdAt: { type: Date }
});

module.exports = function(){
    try {
        mongoose.model('User', UserSchema);
    } catch (error) {}
    return mongoose.model('User');
}();
