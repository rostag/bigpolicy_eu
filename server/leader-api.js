module.exports = function(app, DB){

  var express = require('express');
  var router = express.Router();

  // Routes order is important

  /**
   * Creates a Leader
   */
  router.post('/', function (req, res) {
    let data;

    console.log('leader-api/create: ', req.body);

    try {
      data = JSON.parse(Object.keys(req.body)[0]);
      if ( !data || !data.name || !data.surName || !data.vision || !data.mission || !data.email ) {
        throw ( 'Invalid Leader cannot be saved. Either name, surname, vision, email or mission is missed.')
      }
    } catch (e) {
      console.log('Data parsing error: ', e);
      res.send(e);
      return;
    }

    DB.createLeader(data)
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
  .get('/:id', function (req, res) {
    if (req.params.id) {
      console.log('\n\nleader-api/', req.params.id);
      DB.getLeader(req.params.id)
        .then(function (data) {
          res.json(data || []);
        });
      }
  })

  /**
   * Gets page of Leaders, example:
   * First page, 5 docs:
   * leader-api/page/1/5/q/%7B%7D
   * Leader by email:
   * leader-api/page/1/1/q/%7B%20%22email%22%3A%20%22rostyslav.siryk%40gmail.com%22%20%7D
   */
  .get('/page/:page/:limit/q/:dbQuery', function (req, res) {
    var p = req.params;
    // console.log('leader-api/get page #', p.page, ', limit =', p.limit, ', dbQuery =', decodeURIComponent(p.dbQuery));
    DB.getPageOfLeaders(null, p.page, p.limit, decodeURIComponent(p.dbQuery))
      .then(function (data) {
        res.json(data);
      })
      .catch(function(err){
        res.json(err);
      });
  })

  /**
   * Updates a Leader with given ID using provided data payload
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

  /**
   * RESERVED
   * Gets page of leaders for the given group, example:
   * /leader-api/group/groupId/page/1/1
   */
  // .get('/group/:groupId/page/:page/:limit', function (req, res) {
  //   DBLeader.getPageOfLeaders( p.leaderId )
  //     .then((leader) => {
  //       DB.getPageOfLeaders(group.leaders, p.page, p.limit)
  //         .then( data => res.json(data))
  //         .catch( err => res.json(err))
  //     })
  //     .catch( err => res.json(err));
  // })

}
