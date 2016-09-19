module.exports = function(app, DB){

  // start module
  var express = require('express');
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // const DB = require('./mongo/database');

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
      DB.createTask(req.body)
      .catch(function (err) {
          res.send(err);
      }).then(function (data) {
          res.json(data);
      });
  })

  .put('/:id', function(req, res) {
      DB.updateTask(req.params.id,req.body)
      .then(function (data) {
          res.json(data);
      })
      .catch(function(err){
  	    res.json(err);
  	});
  })

  // DANGER!!! FOR DEV PURPOSES ONLY
  // *****************

  .delete('/alltasks', function (req, res) {
  	if(req.query.secret != 19863){
  		res.send(404);
  		return;
  	}
      DB.deleteAllTasks()
      .then(function (data) {
          res.json(data);
      });
  })

  // *****************
  // END OF DANGER!!!

  .delete('/:id', function (req, res) {
      DB.deleteTask(req.params.id)
      .then(function (data) {
          res.json(data);
      });
  })

  /**
   * Gets the Task by ID, example:
   * /task-api/57a64e2b3a5bfb3b48e6fd1b
   */
  .get('/:id', function (req, res) {
      if (req.params.id) {
          DB.getTask(req.params.id)
          .then(function (data) {
              res.json(data || []);
          });
      }
  })

  /**
   * Gets all tasks, example:
   * /task-api/
   */
  .get('*', function (req, res)     {
      DB.listTasks()
      .then(function (data) {
          res.json(data);
      })
      .catch(function(err){
          res.json(err);
      });
  });

  app.use('/task-api', router);

  console.log('task middleware connected.');
  // end of module
}
