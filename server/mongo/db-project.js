//******************************************************************************
// P R O J E C T
//******************************************************************************

var DBProject = {};
var Project = require('./models/project');
var Leader = require('./models/leader');

/**
 * Creates a Project by provided data
 * @param dataObj Properties object of Project to be created
 */
DBProject.createProject = function(dataObj) {
  var data = dataObj;

  for ( var item in dataObj ) {
    data = JSON.parse(item);
  }

  // console.log('DBProject: CreateProject: ', data)

  if ( !data.title || !data.description ) {
    throw ( 'DBProject: Invalid project cannot be saved. Either title or description is missed.')
  }

  if(!data) data = {};
  const model = new Project(data);
  var saved = model.save(DBProject.addProjectToLeader);
  return model.save(saved);
}

/**
 * Returns single Project by ID
 */
DBProject.getProject = function(id) {
   return Project.findById(id);
}

/**
 * Returns a page of Projects either by given ids (if present), page number and limit, or DB query
 * @param projectIds project ID's to retrieve
 * @param page Page number to get from DB
 * @param limit Items per page to get from DB
 * @param dbQuery DB query to perform for filtering the results, searching etc
 */
DBProject.getPageOfProjects = function (projectIds, page, limit, dbQuery) {
  // console.log('DBProject.getPageOfProjects, projectIds =', projectIds, ', page =', page, 'limit =', limit, 'dbQuery =', dbQuery);

  var query = {};

  // Populate DB query from params
  if (dbQuery) {
    query = JSON.parse(dbQuery.replace(/\'/g, '"'));
  }

  // Add project ID's to DB query
  if (projectIds) {
    query['_id'] = { $in: projectIds };
  }

  // console.log('query =', query);
  // please see documentation for query param here:
  // https://github.com/edwardhotchkiss/mongoose-paginate
  return Project.paginate(query, { page: parseInt(page), limit: parseInt(limit) });
}

DBProject.updateProject = function(id,data) {

  if ( !data.title || !data.description ) {
    throw ( 'DBProject: Invalid project cannot be updated. Either title or description is missed.')
  }

  if(!data) {
    data = {};
  }

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

DBProject.addProjectToLeader = function(error, savedProject) {
  // Add this project to the corresponding leader's array
  // console.log('find this project leader by leaderId: ', savedProject.managerId);

  var leaderByIdQuery = Leader.where({ _id: savedProject.managerId });

  leaderByIdQuery.findOne( function (err, leader) {
    if( leader ) {
      // console.log('project leader found: ', leader.name);
      // console.log('and his projects: ', leader.projects);
      // console.log('new project: ', savedProject._id);
      leader.projects.push(savedProject.id);
      // console.log('and his updated projects: ', leader.projects);

      leader.update({ projects: leader.projects }, function (error, leader){
      //  console.log('added project to leader');
      })
    }
  });
}

// FIXME Need to delete a reference in Leader's projects array also
DBProject.deleteProject = function(id) {
  return Project.findById(id).remove();
}

module.exports = DBProject;

// OBSOLETE

/**
 * OBSOLETE
 * Returns all projects by given leader project ids (if provided), or just all projects
 */
// DBProject.listProjects = function(leaderProjectIds) {
//   return leaderProjectIds
//     ? Project.find({ '_id': { $in: leaderProjectIds } })
//     : Project.find();
// }
