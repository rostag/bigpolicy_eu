module.exports = function(app, DB, DBLeader){

  var express = require('express');
  var router = express.Router();

  // Routes order is important

  /**
   * Creates new Project
   */
  router.post('/', function (req, res) {
    DB.createProject(req.body)
    .catch(function (err) {
      res.send(err);
    })
    .then(function (data) {
      res.json(data);
    });
  })

  /**
   * Updates Project by ID
   */
  .put('/:id', function(req, res) {
    DB.updateProject(req.params.id,req.body)
    .then(function (data) {
      res.json(data);
    })
    .catch(function(err){
	    res.json(err);
  	});
  })

  /**
   * Deletes Project by ID
   */
  .delete('/:id', function (req, res) {
    DB.deleteProject(req.params.id)
    .then(function (data) {
      res.json(data);
    });
  })

  /**
   * Gets the Project by ID, example:
   * /project-api/57a64e2b3a5bfb3b48e6fd1b
   */
  .get('/:id', function (req, res) {
    if (req.params.id) {
      DB.getProject(req.params.id)
      .then(function (data) {
        res.json(data || []);
      });
    }
  })

  /**
   * OBSOLETE
   * Gets all projects for the given leader:
   * /project-api/leader/id
   */
  // .get('/leader/:leaderId', function (req, res) {
  //   DBLeader.getLeader( req.params.leaderId )
  //     .then( (leader) => {
  //       DB.listProjects(leader.projects)
  //         .then( data => res.json(data))
  //         .catch( err => res.json(err))
  //     })
  //     .catch( err => res.json(err));
  // })

  /**
   * Gets page of projects for the given leader, example:
   * /project-api/leader/leaderId/page/1/1/q/:dbQuery
   */
  .get('/leader/:leaderId/page/:page/:limit/q/:dbQuery', function (req, res) {
    // console.log('project-api/get projects page for leader #', req.params.leaderId);
    DBLeader.getLeader( req.params.leaderId )
      .then((leader) => {
        DB.getPageOfProjects(leader.projects, req.params.page, req.params.limit, decodeURIComponent(req.params.dbQuery))
          .then( data => res.json(data))
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err));
  })

  /**
   * Gets page of projects, example:
   * /project-api/page/1/1/q/:dbQuery
   */
  .get('/page/:page/:limit/q/:dbQuery', function (req, res) {
    // console.log('project-api/get page #', req.params.page, ', limit =', req.params.limit);
    DB.getPageOfProjects(null, req.params.page, req.params.limit, decodeURIComponent(req.params.dbQuery))
      .then( data => res.json(data))
      .catch( err => res.json(err));
  });

  /**
   * OBSOLETE
   * Gets all projects
   * /project-api/
   */
  // .get('*', function (req, res) {
  //     DB.listProjects()
  //     .then(function (data) {
  //         res.json(data);
  //     })
  //     .catch(function(err){
  //         res.json(err);
  //     });
  // });

  app.use('/project-api', router);
}
