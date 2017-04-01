//******************************************************************************
// T A S K
//******************************************************************************

var DBTask = {};

// mongoose models
var Project = require('./models/project');
var Task = require('./models/task');
var mongoose = require('mongoose');

/**
 * Returns single Task by given task id
 */
DBTask.getTask = function(id) {
    return Task.findById(id);
}

/**
* Returns a page of Tasks either by given ids (if present), page number and limit, or DB query
* @param taskIds Task ID's to retrieve
* @param page Page number to get from DB
* @param limit Items per page to get from DB
* @param dbQuery DB query to perform for filtering the results, searching etc
 */
DBTask.getPageOfTasks = function (taskIds, page, limit, dbQuery) {
  // console.log('DBTask.getPage of Tasks, taskIds =', taskIds, ', page =', page, 'limit =', limit, 'dbQuery =', dbQuery);
  var query = {};

  // If passed, populate DB query from params. Documentation: https://github.com/edwardhotchkiss/mongoose-paginate
  if (dbQuery) {
    query = JSON.parse(dbQuery.replace(/\'/g, '"'));
  }

  // If passed, use project IDs in query
  if (taskIds) {
    query['_id'] = { $in: taskIds };
  }

  // console.log('query =', query);
  return Task.paginate(query, { page: parseInt(page), limit: parseInt(limit) });
}

/**
 * OBSOLETE
 * Returns all tasks by given project task ids (if provided), or just all tasks
 */
// DBTask.listTasks = function(taskIds) {
//   return taskIds
//     ? Task.find({ '_id': { $in: taskIds } })
//     : Task.find()
// }

DBTask.createTask = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  // console.log('DBTask: createTask', data)

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

DBTask.updateTask = function(id, data) {

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

DBTask.bulkDeleteTasks = function(ids) {
  var bulk = Task.collection.initializeOrderedBulkOp();
  console.log('DBTask.bulkDeleteTasks:', ids);
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    console.log('DBTask.bulkDeleteTasks: ID=', id);
    bulk.find({
      '_id': mongoose.Types.ObjectId(id)
    }).remove();
  }
  return bulk.execute();
}

module.exports = DBTask;
