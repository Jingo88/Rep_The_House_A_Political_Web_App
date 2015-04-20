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
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                state_name: results[0].state_name,
                state: results[0].state,
                party: results[0].party,
                chamber: results[0].chamber,
                gender: results[0].gender,
                term_start: results[0].term_start,
                term_end: results[0].term_end,
                website: results[0].website,
                in_office: results[0].in_office,
                twitter_id: results[0].twitter_id
            })
            console.log(legislator);
            legislator.save(function(err, post) {
                if (err) return console.log(err);
                res.redirect('/api/addbills/' + post._id)
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
// single legislator
router.route('/legislators/:id').get(function(req, res, next) {
    Legislator.findById(req.params.id, function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
}).put(function(req, res, next) {
    Legislator.findById(req.params.id, function(err, legislator) {
        if (err) return next(err);
        console.log(legislator);
        var bio = legislator.bioguide_id;
        console.log(bio);
        var billsurl = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + sunKey + "&sponsor_id=" + bio;
        request(billsurl, function(error, response, data) {
            if (!error && response.statusCode == 200) {
                var billObj = JSON.parse(data);
                var results = billObj.results;
                for (var i = 0; i < results.length; i++) {
                    Legislator.update({
                        _id: legislator.id
                    }, {
                        $push: {
                            "bills": {
                                bill_id: results[i].bill_id,
                                official_title: results[i].official_title,
                                introduced_on: results[i].introduced_on,
                                active: results[i].history.active,
                                enacted: results[i].history.enacted,
                                vetoed: results[i].history.active
                            }
                        }
                    }),
                    function(err) {
                        if (err) return console.log(err);
                        // saved!
                        console.log("successful");
                    }
                }
                res.redirect('/api/index')
                // res.send(data)
            }
        })
    })
})
// UPDATE get bills
router.get('/addbills/:id', function(req, res) {
    Legislator.findById(req.params.id, function(err, legislator) {
        if (err) return next(err);
        console.log(legislator);
        var bio = legislator.bioguide_id;
        console.log(bio);
        var billsurl = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + sunKey + "&sponsor_id=" + bio;
        request(billsurl, function(error, response, data) {
            if (!error && response.statusCode == 200) {
                var billObj = JSON.parse(data);
                var results = billObj.results;
                var bills = [];
                for (var i = 0; i < results.length; i++) {
                    var bill = {
                        bill_id: results[i].bill_id,
                        official_title: results[i].official_title,
                        introduced_on: results[i].introduced_on,
                        active: results[i].history.active,
                        enacted: results[i].history.enacted,
                        vetoed: results[i].history.active
                    }
                    bills.push(bill)
                }
                // console.log(bills);
                Legislator.update({
                    _id: legislator._id
                }, {
                    $set: {
                        "bills": bills
                    }
                }, function(err) {
                    if (err) return res.send("contact addMsg error: " + err);
                    res.redirect('/api/addIndustries/' + legislator.crp_id)
                })
                // res.send(data)
                // res.redirect('/api/index')
            }
        })
    })
});
// UPDATE get donations
router.get('/addIndustries/:crp_id', function(req, res) {
    var cid = req.params.crp_id;
    var year = new Date().getFullYear();
    var industryUrl = "http://www.opensecrets.org/api/?method=candIndustry&cid=" + cid + "&cycle=" + year + "&output=json&apikey=" + openKey
    request(industryUrl, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var industriesObj = JSON.parse(data);
            var results = industriesObj.response.industries.industry;
            // console.log(results);
            var industries = [];
            for (var i = 0; i < results.length; i++) {
                var industry = {
                    industry_name: results[i]['@attributes'].industry_name,
                    industry_code: results[i]['@attributes'].industry_code,
                    money_from_indivs: results[i]['@attributes'].indivs,
                    money_from_pacs: results[i]['@attributes'].pacs
                }
                industries.push(industry)
            }
            Legislator.update({
                crp_id: cid
            }, {
                $set: {
                    "industries": industries
                }
            }, function(err) {
                if (err) return res.send("contact addMsg error: " + err);
                res.redirect('/api/addSectors/' + cid)
            })
        }
    })
});
router.get('/addSectors/:crp_id', function(req, res) {
    var cid = req.params.crp_id;
    var year = new Date().getFullYear();
    var sectorUrl = "http://www.opensecrets.org/api/?method=candSector&cid=" + cid + "&cycle=" + year + "&output=json&apikey=" + openKey
    request(sectorUrl, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var sectorsObj = JSON.parse(data);
            var results = sectorsObj.response.sectors.sector;
            // console.log(results);
            var sectors = [];
            for (var i = 0; i < results.length; i++) {
                var sector = {
                    sector_name: results[i]['@attributes'].sector_name,
                    sector_code: results[i]['@attributes'].sectorid,
                    money_from_indivs: results[i]['@attributes'].indivs,
                    money_from_pacs: results[i]['@attributes'].pacs
                }
                sectors.push(sector)
            }
            Legislator.update({
                crp_id: cid
            }, {
                $set: {
                    "sectors": sectors
                }
            }, function(err) {
                if (err) return res.send("contact addMsg error: " + err);
                res.redirect('/api/addContrib/' + cid)
            })
        }
    })
});
router.get('/addContrib/:crp_id', function(req, res) {
    var cid = req.params.crp_id;
    var year = new Date().getFullYear();
    var contributorUrl = "http://www.opensecrets.org/api/?method=candContrib&cid=" + cid + "&cycle=" + year + "&output=json&apikey=" + openKey
    request(contributorUrl, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var contributorsObj = JSON.parse(data);
            var results = contributorsObj.response.contributors.contributor;
            // console.log(results);
            var contributors = [];
            for (var i = 0; i < results.length; i++) {
                var contributor = {
                    org_name: results[i]['@attributes'].org_name,
                    money_from_indivs: results[i]['@attributes'].indivs,
                    money_from_pacs: results[i]['@attributes'].pacs
                }
                contributors.push(contributor)
            }
            Legislator.update({
                crp_id: cid
            }, {
                $set: {
                    "contributors": contributors
                }
            }, function(err) {
                if (err) return res.send("contact addMsg error: " + err);
                res.redirect('/api/addMonies/' + cid)
            })
        }
    })
});
router.get('/addMonies/:crp_id', function(req, res) {
    var cid = req.params.crp_id;
    var year = new Date().getFullYear();
    var summaryUrl = "http://www.opensecrets.org/api/?method=candSummary&cid=" + cid + "&cycle=" + year + "&output=json&apikey=" + openKey
    request(summaryUrl, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var summaryObj = JSON.parse(data);
            var result = summaryObj.response.summary['@attributes'];
            var monies = {
                total_reciepts: result.total,
                total_spent: result.spent,
                cash_on_hand: result.cash_on_hand,
                debt: result.debt,
                date_last_filed: result.last_updated
            }
            Legislator.update({
                crp_id: cid
            }, {
                $set: {
                    "monies": monies
                }
            }, function(err) {
                if (err) return res.send("contact addMsg error: " + err);
                res.redirect('/api/index/')
            })
        }
    })
});
// DESTROY
router.delete('/legislators/:id', function(req, res, next) {
    Legislator.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
module.exports = router;