module.exports = function(app){
// start module
var express = require('express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB = require('./mongo/database');

var router = express.Router();
// order of routes is important!

// middleware for all requests
// router.use(function(req, res, next) {
//     // console.log('API was used');
//     next(); // go to the next routes
// });

router.post('/', function (req, res) {
    DB.createLeader(req.body)
    .catch(function (err) {
        res.send(err);
    }).then(function (data) {
        res.json(data);
    });
})

.put('/:id', function(req, res) {
    DB.updateLeader(req.params.id,req.body)
    .then(function (data) {
        res.json(data);
    })
    .catch(function(err){
	    res.json(err);
	});
})

// DANGER!!! FOR DEV PURPOSES ONLY
// *****************

.delete('/allleaders', function (req, res) {
	if(req.query.secret != 19863){
		res.send(404);
		return;
	}
    DB.deleteAllLeaders()
    .then(function (data) {
        res.json(data);
    });
})

// *****************
// END OF DANGER!!!

.delete('/:id', function (req, res) {
    DB.deleteLeader(req.params.id)
    .then(function (data) {
        res.json(data);
    });
})

.get('/:id', function (req, res) {
    if (req.params.id) {
        DB.getLeader(req.params.id)
        .then(function (data) {
            res.json(data || []);
        });
    }
})

.get('*', function (req, res)     {
    DB.listLeaders()
    .then(function (data) {
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.use('/leader-api', router);

console.log('backend connected');
// end of module
}
