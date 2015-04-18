var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sunKey = process.env["SUNLIGHT"];
var openKey = process.env["OPENSECRETS"];

var request = require('request');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

router.get('/api', function (req, res, next){
	console.log('hit /api');
	res.json('nothing to see here');
})

router.get('/api/legislator/:last_name', function(req, res, next){
	console.log('hitting the route?');
	var queryName = req.params.last_name;
	// var sunurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey + "&last_name=" + name;
	// request(sunurl, function(error, response, data) {
		// if (!error && response.statusCode == 200) {
			var senator = {
				last_name: queryName
			}

			res.json("senator");
})
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('opened connection to mongodb');
});


// router.get('/searchLname/:Lname', function(req, res) {
//     var name = req.params.Lname;
//     var sunurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey + "&last_name=" + name;
//     request(sunurl, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             res.send(body)
//         }
//     })
// });
module.exports = router;

