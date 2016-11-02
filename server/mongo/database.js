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

////////////////////////////////////////////////////
//
// L E A D E R S H I P
//
////////////////////////////////////////////////////

DB.getLeader = function(id) {
  var leader = Leader.findById(id, function (error, leader) {
    if(leader){
      console.log('DB: got leader:', leader.email);
      leader.projects = DB.getLeaderProjects(leader.projects);
    }
  });
  return leader;
}

DB.getLeaderProjects = function (projects) {
  if (projects) {
    console.log('DB: get leader projects:', projects);

    // WIP
    projects.forEach (function (project) {
      console.log('DB: project found:', project);
    });
  }

  return projects;
}

DB.listLeaders = function(id) {
    return Leader.find()
    // .exec();
}

DB.createLeader = function(dataObj) {
  var data = dataObj;
  console.log('createLeader: ', data)
  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }
    if(!data) data = {};
    const model = new Leader(data);
    var saved = model.save();
    var saved2 = model.save(saved);
    console.log('saved2: ', saved2);
    return saved2;
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

DB.listProjects = function() {
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

  var saved = model.save(DB.addProjectToLeader);

  return model.save(saved);
}

DB.addProjectToLeader = function(error, savedProject) {
  // Add this project to the corresponding leader's array
  console.log('find this project leader by email: ', savedProject.managerId);

  var leaderByEmailQuery  = Leader.where({ email: savedProject.managerId });

  leaderByEmailQuery.findOne( function (err, leader) {
    if( leader ) {
      console.log('project leader found: ', leader.name);
      console.log('and his projects: ', leader.projects);
      console.log('new project: ', savedProject._id);

      leader.projects.push(savedProject.id);

      console.log('and his updated projects: ', leader.projects);

      leader.update({ projects: leader.projects }, function (error, leader){
         console.log('added project to leader');
      })
    }
  });
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

DB.listTasks = function(taskIds) {
  return taskIds
    ? Task.find({ '_id': { $in: taskIds } })
    : Task.find()
}

DB.createTask = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  console.log('DB: createTask', data)

  if(!data) data = {};
    const model = new Task(data);
    var saved = model.save(DB.addTaskToProject);
    return model.save(saved);
}

DB.addTaskToProject = function(error, savedTask) {
  // Add this task to the corresponding project's array
  // console.log('find this task project by id: ', savedTask.projectId);

  var projectByIdQuery  = Project.where({ _id: savedTask.projectId });

  projectByIdQuery.findOne( function (err, project) {
    if (project) {
      // console.log('new task: ', savedTask._id);
      // console.log('\ttask\'s project found: ', project.title);
      // console.log('\t\tand his tasks: ', project.tasks);
      project.tasks.push(savedTask.id);
      // console.log('\t\t+plus updated: ', project.tasks);

      project.update({ tasks: project.tasks }, function (error, project){
        // console.log('\tadded task to project');
      })
    }
  });
}

// WIP
DB.updateTask = function(id, data) {
  console.info('update task:', id, data);
  if(!data) {
    data = {}
  };
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
