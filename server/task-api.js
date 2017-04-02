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
   * Updates multiple Tasks by ID using data provided
   */
  .put('/bulk-update', function(req, res) {
    const r = req.body;
    console.log('> task-api.put/bulk-update', r.ids, r.data);
    DB.bulkUpdateTasks(r.ids, r.data)
      .then(function (data) {
        console.log('< task-api.put/bulk-update', data);
        res.json(data);
      })
      .catch(function(err){
  	    res.json(err);
    	});
  })

  /**
   * Deletes multiple Tasks by IDs
   */
  .put('/bulk-delete', function(req, res) {
    console.log('task-api.put/bulk-delete', req.body.ids);
    DB.bulkDeleteTasks(req.body.ids)
      .then(function (data) {
        console.log('DONE task-api.put/bulk-delete', data);
        res.json(data);
      })
      .catch(function(err){
        res.json(err);
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
  //   DBProject.getProject( p.projectId )
  //     .then( (project) => {
  //       DB.listTasks(project.tasks)
  //         .then( data => res.json(data))
  //         .catch( err => res.json(err))
  //     })
  //     .catch( err => res.json(err))
  // })

  /**
   * Gets page of tasks for the given project, example:
   * /task-api/project/projectId/page/1/1/q/:dbQuery
   */
  .get('/project/:projectId/page/:page/:limit/q/:dbQuery', function (req, res) {
    var p = req.params;
    DBProject.getProject( p.projectId )
      .then((project) => {
        DB.getPageOfTasks(project.tasks, p.page, p.limit, decodeURIComponent(p.dbQuery))
          .then( data => res.json(data))
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err));
  })

  /**
   * Gets page of tasks, example:
   * /task-api/page/1/1/q/:dbQuery
   */
  .get('/page/:page/:limit/q/:dbQuery', function (req, res) {
    var p = req.params;
    // console.log('task-api/get page #', p.page, ', limit =', p.limit);
    DB.getPageOfTasks(null, p.page, p.limit, decodeURIComponent(p.dbQuery))
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
