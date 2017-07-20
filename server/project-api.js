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
   * Updates multiple Projects by ID using data provided
   */
  .put('/bulk-update', function(req, res) {
    const r = req.body;
    console.log('project-api.put/bulk-update', r.ids, r.data);
    DB.bulkUpdateProjects(r.ids, r.data)
      .then(function (data) {
        // console.log('DONE project-api.put/bulk-update', data);
        res.json(data);
      })
      .catch(function(err){
  	    res.json(err);
    	});
  })

  /**
   * Deletes multiple Projects by IDs
   */
  .put('/bulk-delete', function(req, res) {
    // console.log('project-api.put/bulk-delete', req.body.ids);

    // TODO Delete associated Project' tasks
    DB.bulkDeleteProjects(req.body.ids)
      .then(function (data) {
        // console.log('DONE project-api.put/bulk-delete', data);
        res.json(data);
      })
      .catch(function(err){
        res.json(err);
      });
  })

  /**
   * Updates Project by ID
   */
  .put('/:id', function(req, res) {
    DB.updateProject(req.params.id, req.body)
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
    console.log(`\n\nproject-api/${req.params.id}`);
    if (req.params.id) {
      DB.getProject(req.params.id)
        .then(function (data) {
          res.json(data || []);
        });
    }
  })

  /**
   * Gets page of projects for the given leader, example:
   * /project-api/leader/leaderId/page/1/1/q/:dbQuery
   */
  .get('/leader/:leaderId/page/:page/:limit/q/:dbQuery', function (req, res) {
    var p = req.params;
    // console.log('project-api/get projects page for leader #', p.leaderId, ', query:', decodeURIComponent(p.dbQuery) );
    DBLeader.getLeader( p.leaderId )
      .then((leader) => {
        DB.getPageOfProjects(leader.projects, p.page, p.limit, decodeURIComponent(p.dbQuery))
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
    var p = req.params;
    // console.log('project-api/get page #', p.page, ', limit =', p.limit, ', query:', decodeURIComponent(p.dbQuery));
    DB.getPageOfProjects(null, p.page, p.limit, decodeURIComponent(p.dbQuery))
      .then( data => res.json(data))
      .catch( err => res.json(err));
  });

  app.use('/project-api', router);
}
