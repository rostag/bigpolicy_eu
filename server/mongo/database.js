var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

// mongoose models
var Leader = require('./models/leader');

//////////////////////////

var DB = {};

try{// for livereloading purposes
  console.error('establishing mongoose connection');
    if(process.env.OPENSHIFT_MONGODB_DB_URL){
        console.error('establishing PSHIT connection: ' + process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME+'?poolSize=5');
        mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME+'?poolSize=5');
    }else{
        // localhost
        console.error('establishing mongoose connection: \nmongodb://localhost:27017/bigpolicy?poolSize=5');
        mongoose.connect('mongodb://localhost:27017/bigpolicy?poolSize=5');
    }
}catch(err){
    console.error('A Mongoose connection failed with error: ', err);
}

DB.getLeader = function(id) {
    return Leader.findById(id);
}

DB.listLeaders = function(id) {
    return Leader.find()
    // .exec();
}

DB.createLeader = function(data) {
  console.log('createLeader: ', data)
    if(!data) data = {};
    const leader = new Leader({
        name: data.name,
        parentName: data.parentName,
        surName: data.surName,
        vision: data.vision,
        mission: data.mission,
        createdAt: new Date()
    });
    return leader.save();
}

DB.updateLeader = function(id,data) {
    if(!data) data = {};
    return Leader.findById(id, function(err, leader) {
        if(err || !leader){
            return;
        }
        if(data.name)leader.name = data.name;
        if(data.parentName)leader.parentName = data.parentName;
        if(data.surName)leader.surName = data.surName;
        if(data.vision)leader.vision = data.vision;
        if(data.mission)leader.mission = data.mission;
        return leader.save();
    });
}

DB.deleteLeader = function(id) {
    return Leader.findById(id).remove();
}

// DANGER FUNCTION. FOR DEV PURPOSES
DB.deleteAllLeaders = function(id) {
    return Leader.find().remove();
}
// END OF DANGER

module.exports = DB;

/*

------------------------------Leader API examples

*** To get all leaders list -

GET localhost:4200/leader-api

*** To get one particular leader -

GET localhost:4200/leader-api/577e8e98a3b64bb01f6fcd62


*** To create new leader -

POST localhost:4200/leader-api

with x-www-form-urlencoded pairs

name - Name of leader
surName - Surname of leader
etc.

*** To update leader info -

PUT localhost:4200/leader-api/577e8e98a3b64bb01f6fcd62

with x-www-form-urlencoded pairs

name - Name of leader
surName - Surname of leader
etc.

*** To delete leader -

DELETE localhost:4200/leader-api/577e8e98a3b64bb01f6fcd62

*** To delete all leaders (DEV PURPOSES!)

DELETE localhost:4200/leader-api/allleaders?secret=19863

*/
