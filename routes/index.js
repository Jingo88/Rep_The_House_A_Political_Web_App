var express = require('express');
var router = express.Router();
var request = require('request');
var sunKey = process.env["SUNLIGHT"];
var openKey = process.env["OPENSECRETS"];
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        sunKey: sunKey,
        openKey: openKey
    });
});
router.get('/donate/:crpID/:year', function(req, res) {
    var crp = req.params.crpID;
    var yr = req.params.year;
    var donateurl = "http://www.opensecrets.org/api/?method=candContrib&cid=" + crp + "&cycle=" + yr + "&output=json&apikey=" + openKey
    request(donateurl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("no error");
            res.send(body)
        }
        if (error) {
            console.log("error");
        }
    })
});
router.get('/bills/:bioID', function(req, res) {
    var bio = req.params.bioID;
    var billsurl = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + sunKey + "&sponsor_id=" + bio;
    request(billsurl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })
});
router.get('/searchLname/:Lname', function(req, res) {
    var name = req.params.Lname;
    var sunurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey + "&last_name=" + name;
    request(sunurl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })
});
router.get('/searchState/:stateInitials', function(req, res) {
    var state = req.params.stateInitials;
    var sunStateurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey + "&state=" + state;
    request(sunStateurl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })
});
module.exports = router;