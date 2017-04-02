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

  const taskModel = new Task(data);
  var addedToProject = taskModel.save( (err, savedTask) => {
    if (err) { console.log('Task saving error: ', err); }
    DBTask.addOrRemoveTaskForProject([savedTask._id], savedTask.projectId, false);
  });
  return taskModel.save(addedToProject);
}

// DBTask.addTaskToProject = function(error, savedTask) {
//   // Add this task to the corresponding project's array
//   // console.log('find this task project by id: ', savedTask.projectId);
//
//   var projectByIdQuery  = Project.where({ _id: savedTask.projectId });
//
//   projectByIdQuery.findOne( function (err, project) {
//     if (project) {
//       // console.log('new task: ', savedTask._id);
//       // console.log('\ttask\'s project found: ', project.title);
//       // console.log('\t\tand his tasks: ', project.tasks);
//       project.tasks.push(savedTask.id);
//       // console.log('\t\t+plus updated: ', project.tasks);
//
//       project.update({ tasks: project.tasks }, function (error, project){
//         // console.log('\tadded task to project');
//       })
//     }
//   });
// }

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

/**
 * Updates multiple Tasks by given ID in one turn using provided {data}
 * @param taskIds Array of Task IDs.
 * @param data Data to set in format { projectId: value }
 */
 // TODO Check it better to refactor to make single method of update, merging this method with updateTask (above)
 // http://codingmiles.com/nodejs-bulk-update-to-mongodb-using-mongoose/
 // https://www.mongodb.com/blog/post/mongodbs-new-bulk-api
 // http://stackoverflow.com/questions/28218460/nodejs-mongoose-bulk-update
DBTask.bulkUpdateTasks = function(taskIds, data) {
  console.log('DBTask.bulkUpdateTasks:', taskIds, data);
  var bulk = Task.collection.initializeOrderedBulkOp();
  for (var i = 0; i < taskIds.length; i++) {
      var id = taskIds[i];
      bulk.find({
          '_id': mongoose.Types.ObjectId(id)
      }).updateOne({
          $set: data
      });
  }
  DBTask.addOrRemoveTaskForProject(taskIds, data.projectId, false);

  return bulk.execute();
}

/**
 * Adds or removes Tasks to Project by given Project and Project IDs.
 * Used for reassigning project to another project and on project or project deletion)
 * @param taskIds: {Array} Task IDs to adding or remove.
 * @param projectId {string} Target Project ID.
 * @private
 */
DBTask.addOrRemoveTaskForProject = function(taskIds, projectId, toRemove) {
  console.log('> DBTask.add Or Remove Task For Project, projectId:', projectId);

  Project.findOne( { _id: projectId }, function (err, project) {
    if( project ) {
      console.log(`\tProject found: ${project.title}\n\tIts Tasks: ', ${project.tasks}\n\tA tasks to`, toRemove ? 'remove:' : 'add:', taskIds);

      for (var i = 0; i < taskIds.length; i++) {
        const taskId = taskIds[i];
        const taskIndex = project.tasks.indexOf(taskId);
        if (toRemove === true) {
          project.tasks.splice(taskIndex, 1);
        } else if ( taskIndex === -1 ) {
          project.tasks.push(taskId);
        }
      }
      console.log('\tNow tasks: ', project.tasks);

      project.update({ tasks: project.tasks }, (error, project) => { console.log('< Project tasks updated'); })
    }
  });
}

DBTask.deleteTask = function(id) {
  return Task.findById(id).then(task => {
    DBTask.addOrRemoveTaskForProject([task._id], task.projectId, true);
    return task.remove();
  });
}

DBTask.bulkDeleteTasks = function(ids) {
  var bulk = Task.collection.initializeOrderedBulkOp();
  // console.log('DBTask.bulkDeleteTasks:', ids);
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    // console.log('DBTask.bulkDeleteTasks: ID=', id);
    bulk.find({
      '_id': mongoose.Types.ObjectId(id)
    }).remove();
  }
  return bulk.execute();
}

module.exports = DBTask;
