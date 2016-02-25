'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sunKey = process.env.SUNLIGHT;
var openKey = process.env.OPENSECRETS;
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
  res.render('api');
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function populateLegislators() {
  var states = new Array('AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY');
  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    var sunStateurl = 'https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=' + sunKey + '&state=' + state;
    request(sunStateurl, function(error, response, data) {
      if (!error && response.statusCode == 200) {
        console.log(data);
        var senatorObj = JSON.parse(data);
        console.log(senatorObj);
        var results = senatorObj.results;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var legislator = new Legislator({
            bioguide_id: results[i].bioguide_id,
            crp_id: results[i].crp_id,
            first_name: results[i].first_name,
            last_name: results[i].last_name,
            state_name: results[i].state_name,
            state: results[i].state,
            party: results[i].party,
            chamber: results[i].chamber,
            gender: results[i].gender,
            term_start: results[i].term_start,
            term_end: results[i].term_end,
            website: results[i].website,
            in_office: results[i].in_office,
            twitter_id: results[i].twitter_id
          });
          legislator.save(function(err, post) {
            if (err) return console.error(err);
          });
        }
      }
    });
  }
}
router.get('/addAllLegislators', function(req, res, next) {
  populateLegislators();
  res.json('done');
});
// CREATE
// search by state
router.get('/addLegislatorsByState/:state', function(req, res) {
  var state = req.params.state;
  var sunStateurl = 'https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=' + sunKey + '&state=' + state;
  request(sunStateurl, function(error, response, data) {
    if (!error && response.statusCode == 200) {
      var senatorObj = JSON.parse(data);
      var results = senatorObj.results;
      for (var i = 0; i < results.length; i++) {
        var legislator = new Legislator({
          bioguide_id: results[i].bioguide_id,
          crp_id: results[i].crp_id,
          first_name: results[i].first_name,
          last_name: results[i].last_name,
          state_name: results[i].state_name,
          state: results[i].state,
          party: results[i].party,
          chamber: results[i].chamber,
          gender: results[i].gender,
          term_start: results[i].term_start,
          term_end: results[i].term_end,
          website: results[i].website,
          in_office: results[i].in_office,
          twitter_id: results[i].twitter_id
        });
        legislator.save(function(err) {
          if (err) return console.error(err);
        });
      }
      res.redirect('/api/index/');
    }
  });
});
// search sunlight for legislator and json respond - add json to db
router.get('/addLegislator/:last_name', function(req, res, next) {
  var name = toTitleCase(req.params.last_name);
  var sunurl = 'https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=' + sunKey + '&last_name=' + name;
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
      });
      console.log(legislator);
      legislator.save(function(err, post) {
        if (err) {
          return console.error(err);
        }
      });
      // if (results.length === 1) {
      //     Legislator.create(results, function(err, post))
      // }
    }
  });
});
// READ
router.get('/index', function(req, res, next) {
  Legislator.find(function(err, data) {
    if (err) return next(err);
    res.json({
      result: data
    });
  });
});
// single legislator
router.get('/legislators/:id', function(req, res, next) {
  Legislator.findById(req.params.id, function(err, data) {
    if (err) return console.error(err);
    res.json({
      result: data
    });
  });
});
router.get('/legislatorByCrpId/:crp_id', function(req, res, next) {
  Legislator.find({crp_id:req.params.crp_id}, function(err, data) {
    if (err) return console.error(err);
    res.json(data[0]);
  });
});
router.get('/addAllDataByCrpId/:crp_id', function(req, res, next) {
  Legislator.find({crp_id:req.params.crp_id}, function(err, data) {
    if (err) return console.error(err);
    var cids = [req.params.crp_id];
    var promised = new Promise(function(resolve,reject){
      try {
        resolve(addAllData(cids));
      } catch (e) {
        reject(e)
      }
    })
    promised.then(function(data){
      var result = data[0]
      console.log(typeof result, typeof data);
      res.json(result);
    });
  });
});
// api with query paramaters (eg: /legislators?state=OR&chamber=senate&party=D)
router.get('/legislators*', function(req, res, next) {
  var query = req.query;
  var legislators = Legislator.find(query, function(err, data) {
    if (err) return console.error(err);
    res.json({
      results: data
    })
  });
});

function addBills(bioIds) {
  console.log('inside getbills w ' + bioIds.length);
  var addBillData;
  for (var i = 0; i < bioIds.length; i++) {
    var bio_id = bioIds[i];
    addBillData = function(bio_id) {
      // 'https://congress.api.sunlightfoundation.com/bills?&sponsor_id='+bio_id+'&apikey='+sunKey
      var billsurl = 'https://congress.api.sunlightfoundation.com/bills/search/?sponsor_id=' + bio_id + '&fields=official_title,introduced_on,history.active,history.enacted,history.vetoed,keywords,bill_id&apikey=' + sunKey
      console.log(billsurl + '\n for id ' + bio_id);
      request.get({
        url: billsurl,
        json: true
      }, function(error, response, json) {
        if (error) {
          return console.error(error);
        }
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
          var billObj = json;
          var results = billObj.results;
          // console.log(results);
          var bills = [];
          for (var j = 0; j < results.length; j++) {
            var bill = {
              bill_id: results[j].bill_id,
              official_title: results[j].official_title,
              introduced_on: results[j].introduced_on,
              active: results[j].history.active,
              enacted: results[j].history.enacted,
              vetoed: results[j].history.vetoed,
              keywords: results[j].keywords
            };
            bills.push(bill);
          }
          console.log('about to update ' + bio_id);
          Legislator.update({
            bioguide_id: bio_id
          }, {
            $set: {
              'bills': bills
            }
          }, function(err) {
            if (err) {
              return console.error(err);
            }
            console.log('updated: ' + bio_id);
          })
        }
      })
    };
    addBillData(bio_id);

  }
  console.log('bills done');
};
// function to return all data
function addAllData(cids) {
  console.log('inside the function ' + cids.length);
  var addIndustries; // set vars
  var addSectors;
  var addContribs;
  var addFinances;
  var year = new Date().getFullYear();
  for (var i = 0; i < cids.length; i++) { // loop through and request each legislator's donation data
    var cid = cids[i]
    console.log('inside the loop for ' + cid);
    addIndustries = function(cid, year) { // change var to function
      var industryUrl = 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey
      request.get({
        url: industryUrl,
        json: true
      }, function(error, response, json) {
        if (error) {
          console.log('there was an error');
          return console.error(error);
        }
        console.log(response.statusCode);
        console.log(json);
        if (!error && response.statusCode == 200) {
          var industriesObj = json;
          var results = industriesObj.response.industries.industry;
          var industries = [];
          for (var j = 0; j < results.length; j++) {
            var industry = {
              industry_name: results[j]['@attributes'].industry_name,
              industry_code: results[j]['@attributes'].industry_code,
              money_from_indivs: results[j]['@attributes'].indivs,
              money_from_pacs: results[j]['@attributes'].pacs
            };
            industries.push(industry);
          }
          Legislator.update({
            crp_id: cid
          }, {
            $set: {
              'industries': industries
            }
          }, function(err) {
            if (err) {
              return console.error(err);
            };
            console.log('industry done for: ' + cid);
          });
        }
      })
    };
    addSectors = function(cid, year) {
      console.log('inside sectors fx with ' + cid);
      var sectorUrl = 'http://www.opensecrets.org/api/?method=candSector&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
      request.get({
        url: sectorUrl,
        json: true
      }, function(error, response, json) {
        if (error) {
          console.log('there was an error');
          return console.error(error);
        }
        console.log(response.statusCode);
        console.log(json);
        if (!error && response.statusCode == 200) {
          var sectorsObj = json;
          var results = sectorsObj.response.sectors.sector;
          console.log(results);
          var sectors = [];
          for (var k = 0; k < results.length; k++) {
            var sector = {
              sector_name: results[k]['@attributes'].sector_name,
              sector_code: results[k]['@attributes'].sectorid,
              money_from_indivs: results[k]['@attributes'].indivs,
              money_from_pacs: results[k]['@attributes'].pacs
            };
            sectors.push(sector);
          }
          Legislator.update({
            crp_id: cid
          }, {
            $set: {
              'sectors': sectors
            }
          }, function(err) {
            if (err) {
              return console.error(err);
            };
            console.log('sectors done for ' + cid);
          });
        }
      });
    };
    // contributor request
    addContribs = function(cid, year) {
      var contributorUrl = 'http://www.opensecrets.org/api/?method=candContrib&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey
      request.get({
        url: contributorUrl,
        json: true
      }, function(error, response, json) {
        if (error) {
          console.log('there was an error');
          return console.error(error);
        }
        console.log(response.statusCode);
        console.log(json);
        if (!error && response.statusCode == 200) {
          var contributorsObj = json;
          var results = contributorsObj.response.contributors.contributor;
          // console.log(results);
          var contributors = [];
          for (var l = 0; l < results.length; l++) {
            var contributor = {
              org_name: results[l]['@attributes'].org_name,
              money_from_indivs: results[l]['@attributes'].indivs,
              money_from_pacs: results[l]['@attributes'].pacs
            };
            contributors.push(contributor);
          }
          Legislator.update({
            crp_id: cid
          }, {
            $set: {
              'contributors': contributors
            }
          }, function(err) {
            if (err) {
              return console.error(err);
            };
            console.log('contributors done for ' + cid);
          });
        }
      });
    };
    // summary request
    addFinances = function(cid, year) {
      var summaryUrl = 'http://www.opensecrets.org/api/?method=candSummary&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
      console.log('getting data for ' + cid);
      request.get({
        url: summaryUrl,
        json: true
      }, function(error, response, json) {
        if (error) {
          console.log('there was an error');
          return console.error(error);
        }
        console.log(response.statusCode);
        console.log(json);
        if (!error && response.statusCode == 200) {
          var summaryObj = json;
          var result = summaryObj.response.summary['@attributes'];
          console.log(result.total);
          console.log(result.cash_on_hand);
          console.log(result.debt);
          var monies = {
            total_reciepts: result.total,
            total_spent: result.spent,
            cash_on_hand: result.cash_on_hand,
            debt: result.debt,
            date_last_filed: result.last_updated
          };
          Legislator.update({
            crp_id: cid
          }, {
            $set: {
              'monies': monies
            }
          }, function(err) {
            if (err) {
              return console.error(err);
            };
            console.log(monies + '\n added for ' + cid);
          });
        }
      });
      console.log('finances done');
    };
    addIndustries(cids[i], year); // limit of 200 calls per day
    addSectors(cids[i], year); //call functions
    addContribs(cids[i], year); //call functions
    addFinances(cids[i], year); //call functions
  }
};
// add data route
router.get('/addAllData/:party/:chamber/:state', function(req, res, next) {
  Legislator.where('party').equals(req.params.party).where('chamber').equals(req.params.chamber).where('state').equals(req.params.state).exec(function(err, data) {
    var bioguide_ids = [];
    var cids = [];
    if (err) {
      return console.error(err);
    };
    var legislators = data;
    for (var i = 0; i < legislators.length; i++) {
      console.log(legislators[i].last_name);
      cids.push(legislators[i].crp_id);
      bioguide_ids.push(legislators[i].bioguide_id);
    }
    addBills(bioguide_ids);
    addAllData(cids);
  });
  res.redirect('/api/index/');
});
router.get('/senatorDataByState/:state', function(req, res, next) {
  Legislator.where('chamber').equals('senate').where('state').equals(req.params.state).exec(function(err, data) {
    var bioguide_ids = [];
    var cids = [];
    if (err) {
      return console.error(err);
    };
    var legislators = data;
    for (var i = 0; i < legislators.length; i++) {
      console.log(legislators[i].last_name);
      cids.push(legislators[i].crp_id);
      bioguide_ids.push(legislators[i].bioguide_id);
    }
    addBills(bioguide_ids);
    addAllData(cids);
    res.json(data);
  });
});
router.get('/addAllLegislators/:state', function(req, res, next) {
  Legislator.where('state').equals(req.params.state).exec(function(err, data) {
    var bioguide_ids = [];
    var cids = [];
    if (err) {
      return console.error(err);
    };
    var legislators = data;
    for (var i = 0; i < legislators.length; i++) {
      console.log(legislators[i].last_name);
      cids.push(legislators[i].crp_id);
      bioguide_ids.push(legislators[i].bioguide_id);
    }
    addBills(bioguide_ids);
    addAllData(cids);
    res.json(data);
  });
});
router.get('/allLegislators/:state', function(req, res, next) {
  Legislator.where('state').equals(req.params.state).exec(function(err, data) {
    var bioguide_ids = [];
    var cids = [];
    if (err) {
      return console.error(err);
    };
    var legislators = data;
    for (var i = 0; i < legislators.length; i++) {
      console.log(legislators[i].last_name);
      cids.push(legislators[i].crp_id);
      bioguide_ids.push(legislators[i].bioguide_id);
    }
    addBills(bioguide_ids);
    addAllData(cids);
    res.json(data);
  });
});
// UPDATE get bills
router.get('/billDataByState/:state', function(req, res, next) {
  Legislator.where('state').equals(req.params.state).exec(function(err, data) {
    var bioguide_ids = [];
    if (err) {
      return console.error(err);
    };
    var legislators = data;
    for (var i = 0; i < legislators.length; i++) {
      bioguide_ids.push(legislators[i].bioguide_id);
    }
    console.log(bioguide_ids);
    addBills(bioguide_ids);
    res.json(data)
  });
});
// by party
router.get('/billDataByChamber/:chamber', function(req, res, next) {
  Legislator.where('chamber').equals(req.params.chamber).exec(function(err, data) {
    var bioguide_ids = [];
    if (err) {
      return console.error(err);
    };
    var legislators = data;
    for (var i = 0; i < legislators.length; i++) {
      bioguide_ids.push(legislators[i].bioguide_id);
    }
    console.log(bioguide_ids);
    addBills(bioguide_ids);
    res.json(data)
  });
});
router.get('/addbills/:id', function(req, res) {
  Legislator.findById(req.params.id, function(err, legislator) {
    if (err) return next(err);
    var bio = legislator.bioguide_id;
    var billsurl = 'https://congress.api.sunlightfoundation.com/bills?&apikey=' + sunKey; + '&sponsor_id=' + bio
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
          };
          bills.push(bill);
        }
        // console.log(bills);
        Legislator.update({
          _id: legislator._id
        }, {
          $set: {
            'bills': bills
          }
        }, function(err) {
          if (err) return console.log('contact addMsg error: ' + err);
          res.redirect('/api/addIndustries/' + legislator.crp_id);
        });
        // res.send(data)
        // res.redirect('/api/index')
      }
    });
  });
});
// UPDATE get donations
router.get('/addIndustries/:crp_id', function(req, res) {
  var cid = req.params.crp_id;
  var year = new Date().getFullYear();
  var industryUrl = 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
  request(industryUrl, function(error, response, data) {
    if (error) res.send(error);
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
        };
        industries.push(industry);
      }
      Legislator.update({
        crp_id: cid
      }, {
        $set: {
          'industries': industries
        }
      }, function(err) {
        if (err) return console.log('contact addMsg error: ' + err);
        res.redirect('/api/addSectors/' + cid);
      });
    }
  });
});
router.get('/addSectors/:crp_id', function(req, res) {
  var cid = req.params.crp_id;
  var year = new Date().getFullYear();
  var sectorUrl = 'http://www.opensecrets.org/api/?method=candSector&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
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
        };
        sectors.push(sector);
      }
      Legislator.update({
        crp_id: cid
      }, {
        $set: {
          'sectors': sectors
        }
      }, function(err) {
        if (err) return console.log('contact addMsg error: ' + err);
        res.redirect('/api/addContrib/' + cid);
      });
    }
  });
});
router.get('/addContrib/:crp_id', function(req, res) {
  var cid = req.params.crp_id;
  var year = new Date().getFullYear();
  var contributorUrl = 'http://www.opensecrets.org/api/?method=candContrib&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
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
        };
        contributors.push(contributor);
      }
      Legislator.update({
        crp_id: cid
      }, {
        $set: {
          'contributors': contributors
        }
      }, function(err) {
        if (err) return console.log('contact addMsg error: ' + err);
        res.redirect('/api/addMonies/' + cid);
      });
    }
  });
});
router.get('/addMonies/:crp_id', function(req, res) {
  var cid = req.params.crp_id;
  var year = new Date().getFullYear();
  var summaryUrl = 'http://www.opensecrets.org/api/?method=candSummary&cid=' + cid + '&cycle=' + year + '&output=json&apikey=' + openKey;
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
      };
      Legislator.update({
        crp_id: cid
      }, {
        $set: {
          'monies': monies
        }
      }, function(err) {
        if (err) return console.log('contact addMsg error: ' + err);
        res.redirect('/api/index/');
      });
    }
  });
});

// router.get('/indexAll', function(req, res) {
//   db.collection.createIndex({
//     crp_id: 1,
//     bioguide_id: 1
//   }, {
//     unique: true,
//     sparse: true
//   })
//   res.json()
// });
//   Legislator.ensureIndex( { crp_id: 1, bioguide_id: 1 }, { unique: true, dropDups: true } );
// });
// DESTROY
// router.get('/cleanAll', function(req, res) {
//
//   Legislator.find(function(err, data) {
//     data.forEach(
//       function(obj) {
//         var cur = Legislator.findById({
//           crp_id: obj._id
//         }, {
//           _id: 1
//         });
//         var first = true;
//         while (cur.hasNext()) {
//           var second = cur.next();
//           console.log(cur)
//           if (first) {
//             first = false;
//             continue;
//           }
//           // db.legislators.remove({ _id: second._id });
//           Legislator.findById(second._id, function(err, data) {
//             if (err) return console.error(err);
//             res.json({
//               result: data
//             });
//           });
//         }
//       })
//   });
// })

router.delete('/legislators/:id', function(req, res, next) {
  Legislator.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;