//******************************************************************************
// L E A D E R
//******************************************************************************

var mongoose = require('mongoose');
var Leader = require('./models/leader');
var DBLeader = {};

/**
 * Creates a Leader by provided data
 * @param dataObj Properties object of Leader to be created
 */
DBLeader.createLeader = function(dataObj) {
  var data = dataObj;
  // console.log('DBLeader: createLeader: ', data)
  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  if ( !data.name || !data.surName || !data.vision || !data.mission || !data.email ) {
    throw ( 'DBLeader: Invalid Leader cannot be saved. Either name, surname, vision, email or mission is missed.')
  }

  if ( !data ) data = {};
  const model = new Leader(data);
  var saved = model.save();
  var saved2 = model.save(saved);
  console.log('saved2: ', saved2);
  return saved2;
}

/**
 * Returns single Leader by ID
 */
DBLeader.getLeader = function(id) {
  return Leader.findById(id);
}

/**
 * Returns a page of Leaders either by given leader ids (if present), page number and limit, or query to db
 * @param ownerLeaderIds Not used currently, reserved for future use (by party)
 * @param page Page number to get from DB
 * @param limit Items per page to get from DB
 * @param dbQuery DB Query to perform for filtering the results, searching etc
 */
DBLeader.getPageOfLeaders = function (partyLeaderIds, page, limit, dbQuery) {
  // parse query
  // console.log('DBLeader.getPageOfLeaders, partyLeaderIds =', partyLeaderIds, ', page =', page, 'limit =', limit, ', dbQuery =', dbQuery);
  var jsonQuery = JSON.parse(dbQuery.replace(/\'/g, '"'));
  // console.log('JWON =', jsonQuery);

  if (dbQuery) {
    return Leader.paginate(jsonQuery, { page: parseInt(page), limit: parseInt(limit) });
  }

  if (partyLeaderIds) {
    return Leader.paginate({ '_id': { $in: partyLeaderIds } }, { page: parseInt(page), limit: parseInt(limit) });
  }

  return Leader.paginate({}, { page: parseInt(page), limit: parseInt(limit) });
}

/**
 * Creates a Leader by provided ID and data
 * @param id Leader ID to update
 * @param dataObj Properties object of Leader to be created
 */
DBLeader.updateLeader = function(id, data) {
  if ( !data.name || !data.surName || !data.vision || !data.mission || !data.email ) {
    throw ( 'DBLeader: Invalid Leader cannot be saved. Either name, surname, vision, email or mission is missed.')
  }

  if ( !data ) data = {};
  return Leader.findById(id, function(err, model) {
    if(err || !model){
      return;
    }
    for (var field in data) {
      model[field] = data[field]
    }
    return model.save();
  });
}

/**
 * Deletes a Leader by ID
 * @param id Leader ID to delete from DB
 */
DBLeader.deleteLeader = function(id) {
  return Leader.findById(id).remove();
}

module.exports = DBLeader;


/* Leader API usage examples

*** To get all leaders list -

GET localhost:4200/leader-api

*** To get one particular leader -
GET localhost:4200/leader-api/577e8e98a3b64bb01f6fcd62

*** To create new leader -
POST localhost:4200/leader-api
with x-www-form-urlencoded pairs

name - Name of leader
surName - Surname of leader
etc.

*** To update leader info
PUT localhost:4200/leader-api/577e8e98a3b64bb01f6fcd62
with x-www-form-urlencoded pairs

name - Name of leader
surName - Surname of leader
etc.

*** To delete leader -
DELETE localhost:4200/leader-api/577e8e98a3b64bb01f6fcd62

*** To delete all leaders (DEV PURPOSES!)
DELETE localhost:4200/leader-api/allleaders?secret=19863
*/

// OBSOLETE

/**
 * OBSOLETE
 * Returns single Leader by email
 */
// DBLeader.findLeaderByEmail = function(email) {
//   var leader = Leader.findOne({ 'email': email }, function (err, leader) {
//     if (err) {
//       return handleError(err);
//     }
//   });
//   return leader;
// }

/**
 * OBSOLETE
 * Returns all leaders
 */
// DBLeader.listLeaders = function() {
//   return Leader.find();
// }
