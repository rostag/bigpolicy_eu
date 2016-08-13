var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

// mongoose models
var Leader = require('./models/leader');
var Project = require('./models/project');
var acc = require('./models/acc');

//////////////////////////

var DB = {};

// FIXME
var options = {
  server: { poolSize: 5 }
}

// for livereloading purposes
try{
  console.error('Establishing mongoose connection:');
    if(process.env.OPENSHIFT_MONGODB_DB_URL){
        console.error('On Openshift: ' + process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME);
        options.user = 'admin';
        options.pass = acc.name;
        mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME, options);
    }else{
        // localhost
        console.error('Locally: mongodb://localhost:27017/bigpolicy');
        mongoose.connect('mongodb://localhost:27017/bigpolicy', options);
    }
}catch(err){
    console.error('A Mongoose connection failed with error: ', err);
}

DB.getLeader = function(id) {
    return Leader.findById(id);
}

DB.listLeaders = function(id) {
    return Leader.find()
    // .exec();
}

DB.createLeader = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
    // console.log( item, data[item]);
  }

  // var data = JSON.parse(dataStr);
  console.log('createLeader: ', data)
    if(!data) data = {};
    const model = new Leader({
        name: data.name,
        parentName: data.parentName,
        surName: data.surName,
        vision: data.vision,
        mission: data.mission,
        createdAt: new Date()
    });
    var saved = model.save();
    console.log('saved: ', saved);
    return model.save(saved);
}

DB.updateLeader = function(id,data) {
    if(!data) data = {};
    return Leader.findById(id, function(err, model) {
        if(err || !model){
            return;
        }
        if(data.name)model.name = data.name;
        if(data.parentName)model.parentName = data.parentName;
        if(data.surName)model.surName = data.surName;
        if(data.vision)model.vision = data.vision;
        if(data.mission)model.mission = data.mission;
        return model.save();
    });
}

DB.deleteLeader = function(id) {
    return Leader.findById(id).remove();
}

// DANGER FUNCTION. FOR DEV PURPOSES
DB.deleteAllLeaders = function(id) {
    return Leader.find().remove();
}
// END OF DANGER






//******************************************************************************
//
//    P R O J E C T
//
//******************************************************************************


DB.getProject = function(id) {
    return Project.findById(id);
}

DB.listProjects = function(id) {
    return Project.find()
    // .exec();
}

DB.createProject = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  // var data = JSON.parse(dataStr);
  console.log('database.js: createProject: ', data)
    if(!data) data = {};
    const model = new Project({
      title: data.title,
      description: data.description,
      cost: data.cost,
      managerName: data.managerName,
      managerId: data.managerId,
      dateStarted: data.dateStarted,
      dateEnded: data.dateEnded,
      iconURL: data.iconURL
    });
    var saved = model.save();
    console.log('saved: ', saved);
    return model.save(saved);
}

DB.updateProject = function(id,data) {
    if(!data) data = {};
    return Project.findById(id, function(err, model) {
        if(err || !model){
            return;
        }

        // TODO Tell Olexii the optimization
        for (var field in data) {
          model[field] = data[field]
        }

        return model.save();
    });
}

DB.deleteProject = function(id) {
    return Project.findById(id).remove();
}

// DANGER FUNCTION. FOR DEV PURPOSES
DB.deleteAllProjects = function(id) {
    return Project.find().remove();
}
// END OF DANGER



module.exports = DB;

/*

------------------------------Leader API examples

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



*** To update leader info -

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
