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
DBLeader.getLeader = function(leaderId) {
  console.log('DB :: getLeader, id:', leaderId);

  if (leaderId === 'random') {
    // FIXME after MongoDB update to 3.2: Get one random document from the mycoll collection.
    // db.mycoll.aggregate( { $sample: { size: 1 } } );
    // See also for Mongoose: https://larry-price.com/blog/2014/09/15/fetching-random-mongoose-objects-the-simple-way
    return Leader.count().exec()
      .then((cnt, err) => {
        const rndm = Math.floor(Math.random() * cnt);
        return Leader.findOne().skip(rndm).exec()
          .then((randomLeader, err) => {
            // console.log(`Random ${rndm} of ${cnt} = ${randomLeader._id}`);
            return randomLeader;
          })
      });
  } else {
    return Leader.findById(leaderId);
  }
}

/**
 * Returns a page of Leaders either by given leader ids (if present), page number and limit, or query to db
 * @param ownerLeaderIds Not used currently, reserved for future use (by group)
 * @param page Page number to get from DB
 * @param limit Items per page to get from DB
 * @param dbQuery DB Query to perform for filtering the results, searching etc
 */
DBLeader.getPageOfLeaders = function (leaderIds, page, limit, dbQuery) {
  // parse query
  // console.log('DBLeader.getPageOfLeaders, leaderIds =', leaderIds, ', page =', page, 'limit =', limit, ', dbQuery =', dbQuery);
  var query = {};

  // If passed, populate DB query from params. Documentation: https://github.com/edwardhotchkiss/mongoose-paginate
  if (dbQuery) {
    query = JSON.parse(dbQuery.replace(/\'/g, '"'))
  }

  // If passed, use project IDs in query
  if (leaderIds) {
    query['_id'] = { $in: projectIds };
  }

  // console.log('query:', query);
  return Leader.paginate(query, { page: parseInt(page), limit: parseInt(limit) });
}

/**
 * Updates a Leader by provided ID and data
 * @param id {string} Leader ID to update
 * @param dataObj {Object} Properties object of Leader to be created
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
