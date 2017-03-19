//******************************************************************************
// P R O J E C T
//******************************************************************************

var DBProject = {};

// mongoose models
var Project = require('./models/project');
var Leader = require('./models/leader');

/**
 * Returns single Project by given project id
 */
DBProject.getProject = function(id) {
   return Project.findById(id);
}

/**
 * Returns a page of Projects by given leader project ids (if present), page number and limit
 */
DBProject.getPage = function (leaderProjectIds, page, limit) {
  // console.log('DBProject.getPage, leaderProjectIds =', leaderProjectIds, ', page =', page, 'limit =', limit);
  return leaderProjectIds
    ? Project.paginate({ '_id': { $in: leaderProjectIds } }, { page: parseInt(page), limit: parseInt(limit) })
    : Project.paginate({}, { page: parseInt(page), limit: parseInt(limit) });
}

/**
 * Returns all projects by given leader project ids (if provided), or just all projects
 */
DBProject.listProjects = function(leaderProjectIds) {
  return leaderProjectIds
    ? Project.find({ '_id': { $in: leaderProjectIds } })
    : Project.find();
}

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

DBProject.deleteProject = function(id) {
  return Project.findById(id).remove();
}

module.exports = DBProject;
