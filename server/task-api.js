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

  // WIP
  /**
   * Gets all tasks for the given project:
   * /project-api/id/tasks
   */
  .get('/project/:projectId', function (req, res) {
    DB.getProject( req.params.projectId )
      .then( (project) => {
        DB.listTasks(project.tasks)
          .then( data => res.json(data))
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err))
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
