var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const donationSchema = new Schema({

  virtual: { type: Boolean, default: true },
	donorId: { type: String, required: true },
	targetId: { type: String, required: true },
	// transaction id in external payment system, like order_id in liqpay
	externalId: { type: String },
	// Leader, Project, or Task
	targetType: { type: String, required: true },
	amount: { type: Number, required: true },
	dateStarted: { type: Date, required: true },
	dateCompleted: { type: String },
	description: { type: String, required: true },
	status: { type: String }
});

donationSchema.plugin(mongoosePaginate);

module.exports = function(){
  try {
      mongoose.model('Donation', donationSchema);
  } catch (error) {

  }
  return mongoose.model('Donation');
}();
