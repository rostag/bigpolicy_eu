module.exports = function(app, DB){

  var express = require('express');
  var router = express.Router();

  // Routes order is important

  router.post('/', function (req, res) {
      DB.createProject(req.body)
      .catch(function (err) {
          res.send(err);
      })
      .then(function (data) {
          res.json(data);
      });
  })

  .put('/:id', function(req, res) {
      DB.updateProject(req.params.id,req.body)
      .then(function (data) {
          res.json(data);
      })
      .catch(function(err){
  	    res.json(err);
  	});
  })

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

  // WIP
  /**
   * Gets all projects for the given leader:
   * /project-api/leader/id
   */
  .get('/leader/:leaderId', function (req, res) {
    DB.getLeader( req.params.leaderId )
      .then( (leader) => {
        DB.listProjects(leader.projects)
          .then( data => res.json(data))
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err))
  })

  /**
   * Gets all projects, example:
   * /project-api/
   */
  .get('*', function (req, res)     {
      DB.listProjects()
      .then(function (data) {
          res.json(data);
      })
      .catch(function(err){
          res.json(err);
      });
  });

  app.use('/project-api', router);

  // end of module
}
