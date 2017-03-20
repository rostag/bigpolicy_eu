module.exports = function(app, DB, DBProject){

  var express = require('express');
  var router = express.Router();

  // Routes order is important

  /**
   * Creates new Task
   */
  router.post('/', function (req, res) {
      DB.createTask(req.body)
      .catch(function (err) {
          res.send(err);
      })
      .then(function (data) {
          res.json(data);
      });
  })

  /**
   * Updates Task by ID
   */
  .put('/:id', function(req, res) {
      DB.updateTask(req.params.id,req.body)
      .then(function (data) {
          res.json(data);
      })
      .catch(function(err){
  	    res.json(err);
  	});
  })

  /**
   * Deletes Task by ID
   */
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
   * OBSOLETE
   * Gets all tasks for the given project:
   * /task-api/project/id
   */
  // .get('/project/:projectId', function (req, res) {
  //   DBProject.getProject( req.params.projectId )
  //     .then( (project) => {
  //       DB.listTasks(project.tasks)
  //         .then( data => res.json(data))
  //         .catch( err => res.json(err))
  //     })
  //     .catch( err => res.json(err))
  // })

  /**
   * Gets page of tasks for the given project, example:
   * /task-api/project/projectId/page/1/1
   */
  .get('/project/:projectId/page/:page/:limit', function (req, res) {
    DBProject.getProject( req.params.projectId )
      .then((project) => {
        DB.getPage(project.tasks, req.params.page, req.params.limit)
          .then( data => res.json(data))
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err));
  })

  /**
   * Gets page of tasks, example:
   * /task-api/page/1/1
   */
  .get('/page/:page/:limit', function (req, res) {
    // console.log('task-api/get page #', req.params.page, ', limit =', req.params.limit);
    DB.getPage(null, req.params.page, req.params.limit)
      .then(function (data) {
        res.json(data);
      })
      .catch(function(err){
        res.json(err);
      });
  })

  /**
   * OBSOLETE
   * Gets all tasks, example:
   * /task-api/
   */
  // .get('*', function (req, res)     {
  //     DB.listTasks()
  //     .then(function (data) {
  //         res.json(data);
  //     })
  //     .catch(function(err){
  //         res.json(err);
  //     });
  // });

  app.use('/task-api', router);

}
