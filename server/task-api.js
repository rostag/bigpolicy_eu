module.exports = function(app, DB){

  var express = require('express');
  var router = express.Router();

  // Routes order is important

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

  // end of module
}
