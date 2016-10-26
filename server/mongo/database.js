var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

// mongoose models
var Leader = require('./models/leader');
var Project = require('./models/project');
var Task = require('./models/task');
var app = require('./models/app');

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
        options.pass = app.qa;
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
  }
  console.log('createLeader: ', data)
    if(!data) data = {};
    const model = new Leader(data);
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
        for (var field in data) {
          model[field] = data[field]
        }
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
  console.log('database.js: createProject: ', data)
  if(!data) data = {};

  const model = new Project(data);

  var saved = model.save();
  // console.log('saved: ', saved);

  return model.save(saved);
}

DB.updateProject = function(id,data) {
    if(!data) data = {};
    return Project.findById(id, function(err, model) {
        if(err || !model){
            return;
        }
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


// END OF P R O J E C T


//******************************************************************************
//
//    T A S K
//
//******************************************************************************


DB.getTask = function(id) {
    return Task.findById(id);
}

DB.listTasks = function(id) {
    return Task.find()
    // .exec();
}

DB.createTask = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  // var data = JSON.parse(dataStr);
  console.log('database.js: createTask: ', data)
    if(!data) data = {};
    const model = new Task(data);
    var saved = model.save();
    console.log('saved: ', saved);
    return model.save(saved);
}

DB.updateTask = function(id,data) {
    if(!data) data = {};
    return Task.findById(id, function(err, model) {
        if(err || !model){
            return;
        }
        for (var field in data) {
          model[field] = data[field]
        }
        return model.save();
    });
}

DB.deleteTask = function(id) {
    return Task.findById(id).remove();
}

// DANGER FUNCTION. FOR DEV PURPOSES
DB.deleteAllTasks = function(id) {
    return Task.find().remove();
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
