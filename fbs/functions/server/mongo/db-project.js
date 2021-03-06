//******************************************************************************
// P R O J E C T
//******************************************************************************

let DBProject = {};
let Project = require('./models/project');
let Leader = require('./models/leader');
let mongoose = require('mongoose');
const DBTask = require('./db-task');

/**
 * Creates a Project by provided data
 * @param dataObj Properties object of Project to be created
 */
DBProject.createProject = async function (dataObj) {
  let data = dataObj;
  for (let item in dataObj) {
    data = JSON.parse(item);
  }

  if (!data.title || !data.description) {
    console.log('Error saving project data:', data);
    throw (`DBProject: Invalid project cannot be saved. Either title or description is missed. Received dataObj: ${JSON.stringify(dataObj, null, '  ')}`)
  }

  if (!data) data = {};

  const projectModel = await new Project(data).save();
  DBProject.addOrRemoveProjectForLeader([projectModel._id], projectModel.managerId, false);
  return projectModel;
}

/**
 * Returns single Project by ID
 */
DBProject.getProject = function (projectId) {
  //  console.log('DB :: getProject, id:', projectId);

  if (projectId === 'random') {
    return Project.countDocuments().exec()
      .then((cnt) => {
        const rndm = Math.floor(Math.random() * cnt);
        return Project.findOne().skip(rndm).exec()
          .then((randomLeader) => {
            if (randomLeader) {
              console.log(`Random ${rndm} of ${cnt} = ${randomLeader._id}`);
            }
            return randomLeader;
          })
      });
  } else {
    return Project.findById(projectId);
  }
}

/**
 * Returns a page of Projects either by given projectIds (if present), page number and limit, or DB query
 * @param projectIds {Array} project ID's to retrieve
 * @param page {number} Page number to get from DB
 * @param limit {number} Items per page to get from DB
 * @param dbQuery {string} DB query to perform for filtering the results, searching etc
 * Usage in HTML code:
 <app-project-list
 title="Проекти з заходами"
 [leaderId]="profileLeader._id"
 pageSize="3"
 dbQuery='{ "$where": "this.taskIds.length > 0" }'>
 </app-project-list>
 **/
DBProject.getPageOfProjects = function (projectIds, page, limit, dbQuery) {

  var query = {};

  // If passed, populate DB query from params. Documentation: https://github.com/edwardhotchkiss/mongoose-paginate
  if (dbQuery) {
    query = JSON.parse(dbQuery.replace(/\'/g, '"'));
  }

  // If passed, use project IDs in query
  if (projectIds) {
    query['_id'] = {$in: projectIds};
  }

  return Project.paginate(query, {page: parseInt(page), limit: parseInt(limit)});
}

DBProject.updateProject = function (id, data) {

  if (!data.title || !data.description) {
    throw ('DBProject: Invalid project cannot be updated. Either title or description is missed.')
  }

  if (!data) {
    data = {};
  }

  return Project.findById(id, function (err, model) {
    if (err || !model) {
      return;
    }
    for (var field in data) {
      model[field] = data[field]
    }
    return model.save();
  });
}

/**
 * Updates multiple Projects by given ID in one turn using provided {data}
 * @param projectIds Array of Project IDs.
 * @param data Data to set in format { managerId: value }
 * @private
 */
// TODO Check it's better to refactor to make single method of update, merging this method with updateProject (above)
// http://codingmiles.com/nodejs-bulk-update-to-mongodb-using-mongoose/
// https://www.mongodb.com/blog/post/mongodbs-new-bulk-api
// http://stackoverflow.com/questions/28218460/nodejs-mongoose-bulk-update
DBProject.bulkUpdateProjects = function (projectIds, data) {
  console.log('DBProject.bulk UpdateProjects:', projectIds, data);
  var bulk = Project.collection.initializeOrderedBulkOp();
  for (var i = 0; i < projectIds.length; i++) {
    var id = projectIds[i];
    bulk.find({
      '_id': mongoose.Types.ObjectId(id)
    }).updateOne({
      $set: data
    });
  }
  DBProject.addOrRemoveProjectForLeader(projectIds, data.managerId, false);

  return bulk.execute();
}

/**
 * Adds or removes Projects to Leader by given Project and Leader IDs.
 * Used for reassigning project to another leader and on project or leader deletion)
 * @param projectIds: {Array} Project IDs to adding or remove.
 * @param managerId {string} Target Leader ID.
 */
DBProject.addOrRemoveProjectForLeader = function (projectIds, managerId, toRemove) {
  console.log('> DBProject.add Or Remove Project For Leader, managerId:', managerId);

  Leader.findOne({_id: managerId}, function (err, leader) {
    if (leader) {
      console.log(`\tLeader found: ${leader.name}\n\tHis projectIds: ', ${leader.projectIds}\n\tA projectIds to`, toRemove ? 'remove:' : 'add:', projectIds);

      for (var i = 0; i < projectIds.length; i++) {
        const projectId = projectIds[i];
        const projectIndex = leader.projectIds.indexOf(projectId);
        if (toRemove === true) {
          leader.projectIds.splice(projectIndex, 1);
        } else if (projectIndex === -1) {
          leader.projectIds.push(projectId);
        }
      }
      console.log('\tNow projectIds: ', leader.projectIds);

      leader.update({projectIds: leader.projectIds}, (error, leader) => {
        console.log('< Leader projectIds updated');
      });
    }
  });
}

DBProject.deleteProject = function (id) {
  return Project.findById(id).then(project => {
    DBProject.addOrRemoveProjectForLeader([project._id], project.managerId, true);
    return project.remove();
  });
}

DBProject.bulkDeleteProjects = function (projectIds) {
  var bulk = Project.collection.initializeOrderedBulkOp();
  console.log('> DBProject.bulkDeleteProjects:', projectIds.length);

  return DBProject.getPageOfProjects(projectIds, 1, 1000, '{}').then((pagedProjects) => {
    console.log(' - Got paged projectIds:', pagedProjects.total);

    // Delete projects
    for (var i = 0; i < projectIds.length; i++) {
      var id = projectIds[i];
      bulk.find({
        '_id': mongoose.Types.ObjectId(id)
      }).remove();
    }

    // Gather all taskId's to delete together with Project
    let taskIds = [];
    for (var p = 0; p < pagedProjects.docs.length; p++) {
      let project = pagedProjects.docs[p];
      taskIds = taskIds.concat(project.taskIds);
      console.log(' - Project task to delete added:', taskIds);
    }

    var tasksExec;
    if (taskIds.length > 0) {
      tasksExec = DBTask.bulkDeleteTasks(taskIds)
        .then(tasksDeleted => {
          console.log('< Tasks deleted:', tasksDeleted);
        })
        .catch(function (err) {
          console.log('< Error of task deletion:', tasksDeleted);
        });
    }
    return bulk.execute();
  });

}

module.exports = DBProject;
