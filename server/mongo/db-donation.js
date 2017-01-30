//******************************************************************************
//
// D O N A T I O N
//
//******************************************************************************

var DBDonation = {};

// mongoose models
var Leader = require('./models/leader');
var Project = require('./models/project');
var Task = require('./models/task');
var Donation = require('./models/donation');

DBDonation.getDonation = function(id) {
    return Donation.findById(id);
}

DBDonation.getDonationTarget = function( targetId, targetType ) {
  // console.log('getDonationTarget:', targetId, targetType)
  if (targetType === 'leader') {
    return Leader.findById(targetId);
  } else if (targetType === 'project') {
     return Project.findById(targetId);
  } else if (targetType === 'task') {
    return Task.findById(targetId);
  }
}

// Will return a list of items with given ids, if ids are provided, or all items
DBDonation.listDonations = function(donationIds) {
  return donationIds
    ? Donation.find({ '_id': { $in: donationIds } })
    : Donation.find()
}

DBDonation.createDonation = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  // console.log('DBDonation: createDonation', data)

  if(!data) data = {};

  var saved;
  var model;

  try {
    model = new Donation(data);
  } catch (error){
    throw ( 'DBDonation: Invalid donation cannot be saved.')
  }

  saved = model.save(DBDonation.addDonationToTarget);

  return model.save(saved);
}

DBDonation.addDonationToTarget = function(error, savedDonation) {
  // Add this donation to the corresponding target's array
  // console.log('find this donation target by target type ', savedDonation.targetType, ' and id: ', savedDonation.targetId);

  var targetByIdQuery;

  if (!savedDonation) {
    return;
  }

  if (savedDonation.targetType === 'leader') {
    targetByIdQuery = Leader.where({ _id: savedDonation.targetId });
    // addDonationToLeader
  } else if (savedDonation.targetType === 'project') {
    // addDonationToProject
    targetByIdQuery = Project.where({ _id: savedDonation.targetId });
  } else if (savedDonation.targetType === 'task'){
    // addDonationToTask
    targetByIdQuery = Task.where({ _id: savedDonation.targetId });
  }

  targetByIdQuery.findOne( function (err, target) {
    if (target) {
      target.donations.push(savedDonation.id);
      // console.log('New donation: ', savedDonation._id, ', target found: ', target._id);
      // console.log('\t\Target updated: ', target.donations);

      // FIXME implement scheduled cash re-calculation
      var totalDonationsReceived = target.totalDonationsReceived || 0;
      target.update({ donations: target.donations, totalDonationsReceived: totalDonationsReceived + savedDonation.amount }, function (error, target){
        // console.log('\tadded donation to target');
      })
    }
  });
}

module.exports = DBDonation;
