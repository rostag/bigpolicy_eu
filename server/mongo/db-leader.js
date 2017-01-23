//******************************************************************************
//
// L E A D E R
//
//******************************************************************************

var DBLeader = {};

// mongoose models
var Leader = require('./models/leader');


DBLeader.getLeader = function(id) {
  var leader = Leader.findById(id, function (error, leader) {
    if(leader){
      console.log('DBLeader: got leader:', leader.email, ', id:', leader.id);
      leader.projects = DBLeader.getLeaderProjects(leader.projects);
    }
  });
  return leader;
}

DBLeader.getLeaderProjects = function (projects) {
  if (projects) {
    // console.log('DBLeader: get leader projects:', projects);

    // WIP
    projects.forEach (function (project) {
      // console.log('DBLeader: project found:', project);
    });
  }

  return projects;
}

DBLeader.listLeaders = function(id) {
    return Leader.find()
    // .exec();
}

DBLeader.createLeader = function(dataObj) {
  var data = dataObj;
  console.log('DBLeader: createLeader: ', data)
  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  if ( !data.name || !data.surName || !data.vision || !data.mission || !data.email ) {
    throw ( 'DBLeader: Invalid Leader cannot be saved. Either name, surname, vision, email or mission is missed.')
  }

  if(!data) data = {};
  const model = new Leader(data);
  var saved = model.save();
  var saved2 = model.save(saved);
  console.log('saved2: ', saved2);
  return saved2;
}

DBLeader.updateLeader = function(id,data) {
  if ( !data.name || !data.surName || !data.vision || !data.mission || !data.email ) {
    throw ( 'DBLeader: Invalid Leader cannot be saved. Either name, surname, vision, email or mission is missed.')
  }

  if(!data) data = {};
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

DBLeader.deleteLeader = function(id) {
    return Leader.findById(id).remove();
}

/* Leader API examples

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

module.exports = DBLeader;
