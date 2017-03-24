module.exports = function(app, DB){

  var express = require('express');
  var router = express.Router();

  // Routes order is important

  /**
   * Creates a Leader
   */
  router.post('/', function (req, res) {
    DB.createLeader(req.body)
    .catch(function (err) {
      res.send(err);
    }).then(function (data) {
      res.json(data);
    });
  })

  /**
   * Gets the Leader by ID, example:
   * leader-api/58cf0b7d4256ee60fd1261a
   */
  // .get('/:id', function (req, res) {
  //   if (req.params.id) {
  //     DB.getLeader(req.params.id)
  //     .then(function (data) {
  //       res.json(data || []);
  //     });
  //   }
  // })

  /**
   * Gets page of Leaders, example:
   * First page, 5 docs:
   * leader-api/page/1/5/q/%7B%7D
   * Leader by email:
   * leader-api/page/1/1/q/%7B%20%22email%22%3A%20%22rostyslav.siryk%40gmail.com%22%20%7D
   */
  .get('/page/:page/:limit/q/:dbQuery', function (req, res) {
    // console.log('leader-api/get page #', req.params.page, ', limit =', req.params.limit, ', dbQuery =', decodeURIComponent(req.params.dbQuery));
    DB.getPageOfLeaders(null, req.params.page, req.params.limit, decodeURIComponent(req.params.dbQuery))
      .then(function (data) {
        res.json(data);
      })
      .catch(function(err){
        res.json(err);
      });
  })

  /**
   * Updates a Leader
   */
  .put('/:id', function(req, res) {
    DB.updateLeader(req.params.id, req.body)
    .then(function (data) {
      res.json(data);
    })
    .catch(function(err){
	    res.json(err);
	});
  })

  /**
   * Deletes a Leader by ID
   */
  .delete('/:id', function (req, res) {
    DB.deleteLeader(req.params.id)
    .then(function (data) {
      res.json(data);
    });
  });

  app.use('/leader-api', router);

  // OBSOLETE CODE
  // TO BE REMOVED AFTER TESTING

  /**
  * RESERVED - For future use
  * Gets page of leaders for the given group, example:
  * /leader-api/group/groupId/page/1/1
  */
  // .get('/group/:groupId/page/:page/:limit', function (req, res) {
  //   DBLeader.getPageOfLeaders( req.params.leaderId )
  //     .then((leader) => {
  //       DB.getPage(group.leaders, req.params.page, req.params.limit)
  //         .then( data => res.json(data))
  //         .catch( err => res.json(err))
  //     })
  //     .catch( err => res.json(err));
  // })

  /**
  * NOT USED - reserved for future
  * Gets page of leaders for the given party, example:
  * /leader-api/party/partyId/page/1/1
  */
  // .get('/party/:partyId/page/:page/:limit', function (req, res) {
  //   DBLeader.getPageOfLeaders( req.params.leaderId )
  //     .then((leader) => {
  //       DB.getPage(party.leaders, req.params.page, req.params.limit)
  //         .then( data => res.json(data))
  //         .catch( err => res.json(err))
  //     })
  //     .catch( err => res.json(err));
  // })

  /**
   * OBSOLETE
   * Gets all leaders, example:
   * /leader-api/
   */
  // .get('*', function (req, res)     {
  //   DB.listLeaders()
  //   .then(function (data) {
  //     res.json(data);
  //   })
  //   .catch(function(err){
  //     res.json(err);
  //   });
  // })

  /**
   * OBSOLETE - by using more generic approach (below)
   * Gets the Leader by email, example:
   * /leader-api/email/foo@bar.com
   */
  // .get('/email/:email', function (req, res) {
  //   if (req.params.email) {
  //     DB.findLeaderByEmail(req.params.email)
  //     .then(function (data) {
  //       res.json(data);
  //     });
  //   }
  // })

  /**
   * OBSOLETE
   * TODO Check it's not needed
   * Gets all projects for leader, example:
   * /leader-api/id/projects
   */
  // .get('/:id/projects', function (req, res)     {
  //   DB.listProjects(req.params.id)
  //   .then(function (data) {
  //     res.json(data);
  //   })
  //   .catch(function(err){
  //     res.json(err);
  //   });
  // });

}
