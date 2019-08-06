//******************************************************************************
// D O N A T I O N
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

DBDonation.getDonationTarget = function( targetType, targetId ) {
  if (targetType === 'leader') {
    return Leader.findById(targetId);
  } else if (targetType === 'project') {
     return Project.findById(targetId);
  } else if (targetType === 'task') {
    return Task.findById(targetId);
  }
}

/**
 * Returns a page of Donations either by given ids (if present), page number and limit, or DB query
 * @param donationIds Donation ID's to retrieve
 * @param page Page number to get from DB
 * @param limit Items per page to get from DB
 * @param dbQuery DB query to perform for filtering the results, searching etc like (in HTML code):
 *        dbQuery='{ "$where": "this.taskIds.length > 0" }'
 */
DBDonation.getPageOfDonations = function (donationIds, page, limit, dbQuery) {

  var query = {};

  // If passed, populate DB query from params. Documentation: https://github.com/edwardhotchkiss/mongoose-paginate
  if (dbQuery) {
    query = JSON.parse(dbQuery.replace(/\'/g, '"'));
  }

  // If passed, use donation IDs in query
  if (donationIds) {
    query['_id'] = { $in: donationIds };
  }

  return Donation.paginate(query, { page: parseInt(page), limit: parseInt(limit) });
}

DBDonation.createDonation = function(data) {
  for ( var item in data ) {
    data = JSON.parse(item);
  }

  if(!data) data = {};

  try {
    var model = new Donation(data);
  } catch (error){
    throw ( 'DBDonation: Invalid donation cannot be saved.')
  }

  model.save();

  // if (model.virtual) {
  DBDonation.addDonationToTarget(null, model);
  // }

  // console.log('Donation is virtual:', model.virtual);

  return model._id;
}

DBDonation.updateDonationStatus = function(id, data) {
  console.log('DBDonation: updateDonationStatus', id, data)

  return Donation.findById(id, function(err, model) {
    if (err || !model || !data) {
      return;
    }
    for (var field in data) {
      console.log(' -> field:', field, data[field])
      model[field] = data[field]
    }
    model.save();
  });
}

DBDonation.addDonationToTarget = function(error, savedDonation) {
  // Add this donation to the corresponding target's array

  var targetByIdQuery;

  if (!savedDonation) {
    return;
  }

  if (savedDonation.targetType === 'leader') {
    // addDonationToLeader
    targetByIdQuery = Leader.where({ _id: savedDonation.targetId });
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

      // FIXME implement scheduled cash re-calculation
      var totalDonationsReceived = target.totalDonationsReceived || 0;
      target.update({ donations: target.donations, totalDonationsReceived: totalDonationsReceived + savedDonation.amount }, function (error, target){
      })
    }
  });
}

module.exports = DBDonation;
