var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

const PointerSchema = new Schema({
	pointerType: { type: String, required: true},
	leader: { type: String, required: true },
	projects: { type: Array },
	tasks: { type: Array }
});

module.exports = function(){
    try {
        mongoose.model('Pointer', PointerSchema);
    } catch (error) {
			console.log('error during creation:', error)
		}

    return mongoose.model('Pointer');
}();
