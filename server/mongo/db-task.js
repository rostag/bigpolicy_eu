//******************************************************************************
//
//    T A S K
//
//******************************************************************************

var DBTask = {};

// mongoose models
var Project = require('./models/project');
var Task = require('./models/task');

DBTask.getTask = function(id) {
    return Task.findById(id);
}

DBTask.listTasks = function(taskIds) {
  return taskIds
    ? Task.find({ '_id': { $in: taskIds } })
    : Task.find()
}

DBTask.createTask = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  console.log('DBTask: createTask', data)

  if ( !data.title || !data.description ) {
    throw ( 'DBTask: Invalid task cannot be saved. Either title or description is missed.')
  }

  if(!data) data = {};
    const model = new Task(data);
    var saved = model.save(DBTask.addTaskToProject);
    return model.save(saved);
}

DBTask.addTaskToProject = function(error, savedTask) {
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
DBTask.updateTask = function(id, data) {
  console.info('DBTask: Update task:', id, data);

  if ( !data.title || !data.description ) {
    throw ( 'DBTask: Invalid task cannot be saved. Either title or description is missed.')
  }

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

DBTask.deleteTask = function(id) {
    return Task.findById(id).remove();
}

module.exports = DBTask;
