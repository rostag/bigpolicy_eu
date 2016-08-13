module.exports = function(app, DB){

  // start module
  var express = require('express');
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // const DB = require('./mongo/database');

  console.log('DBDBDBDBDBDBDB: ', DB);
  

  var router = express.Router();

  //
  // !The order of routes is important!
  //

  // middleware for all requests
  // router.use(function(req, res, next) {
  //     // console.log('API was used');
  //     next(); // go to the next routes
  // });

  router.post('/', function (req, res) {
      DB.createProject(req.body)
      .catch(function (err) {
          res.send(err);
      }).then(function (data) {
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

  // DANGER!!! FOR DEV PURPOSES ONLY
  // *****************

  .delete('/allprojects', function (req, res) {
  	if(req.query.secret != 19863){
  		res.send(404);
  		return;
  	}
      DB.deleteAllProjects()
      .then(function (data) {
          res.json(data);
      });
  })

  // *****************
  // END OF DANGER!!!

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

  console.log('project middleware connected.');
  // end of module
}
