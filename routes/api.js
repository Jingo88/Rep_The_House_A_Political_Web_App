var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sunKey = process.env["SUNLIGHT"];
var openKey = process.env["OPENSECRETS"];
var request = require('request');
// mongodb connection and log msg to notify us
mongoose.connect('mongodb://localhost/repApp', function(err) {
    if (err) {
        console.log('MongoDB connection error', err);
    } else {
        console.log('MongoDB connection successful');
    }
});
var db = mongoose.connection;
var Legislator = require('../models/legislator.js');
// just hitting the /api route and responding with nothing
router.get('/', function(req, res, next) {
    console.log('hit /api');
    res.json('nothing to see here');
})



// router.get('/addlegislator/:last_name', function(req, res, next) {
//     console.log('hit /api');
//     var name = toTitleCase(req.params.last_name);
//     res.redirect('/addlegislator/'+name)
// })

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
// CREATE
// search sunlight for legislator and json respond - add json to db
router.get('/addlegislator/:last_name', function(req, res, next) {
    console.log('hitting the route?');
    var name = toTitleCase(req.params.last_name);
    var sunurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey + "&last_name=" + name;
    request(sunurl, function(error, response, data) {
    	var senatorObj = JSON.parse(data);
            var results = senatorObj.results;
         if (!error && response.statusCode == 200) {
            var legislator = new Legislator({
            bioguide_id: results[0].bioguide_id,
            crp_id: results[0].crp_id,
            firstName: results[0].first_name,
            lastName: results[0].last_name,
            state_name: results[0].state_name,
            state: results[0].state,
            party: results[0].party,
            chamber: results[0].chamber,
            gender: results[0].gender,
            term_start: results[0].term_start,
            term_end: results[0].term_end,
            website: results[0].website,
            in_office: results[0].in_office,
            twitter: results[0].twitter_id
            
        })
            console.log(legislator);
            res.json(legislator);
            legislator.save(function (err) {
  if (err) return console.log(err);
  // saved!
})
            // if (results.length === 1) {
            //     Legislator.create(results, function(err, post))
            // }
        }
    })
})
// READ
router.get('/index', function(req, res, next) {
    Legislator.find(function(err, legislators) {
        if (err) return next(err);
        res.json(legislators);
    });
});
// UPDATE
// DESTROY
// probably won't have a destroy
module.exports = router;