//user login express example in Week 10 of WDI

var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('public'));

var sunKey = fs.readFileSync('sunlightKey.txt', 'utf8');
var openKey = fs.readFileSync('openKey.txt', 'utf8');

app.get('/', function(req, res){
	res.render('index.ejs', {sunKey: sunKey, openKey: openKey});
});

app.get('/donate/:crpID/:year', function(req, res){

	var crp = req.params.crpID;
	var yr = req.params.year;

	var donateurl = "http://www.opensecrets.org/api/?method=candContrib&cid="+ crp + "&cycle=" + yr + "&output=json&apikey=" + openKey
	
	request(donateurl, function(error, response, body){
		if (!error && response.statusCode == 200){
			res.send(body)
		}
	})
});

app.get('/bills/:bioID', function(req, res){

	var bio = req.params.bioID;

	var billsurl = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + sunKey + "&sponsor_id=" + bio;
	
	request(billsurl, function(error, response, body){
		if (!error && response.statusCode == 200){
			res.send(body)
		}
	})
});

app.get('/searchLname/:Lname', function(req, res){

	var name = req.params.Lname;

	var sunurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey="+ sunKey + "&last_name=" + name;
	
	request(sunurl, function(error, response, body){
		if (!error && response.statusCode == 200){
			res.send(body)
		}
	})
});


app.get('/searchState/:stateInitials', function(req, res){

	var state = req.params.stateInitials;

	var sunStateurl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey+ "&state="+ state;
	
	request(sunStateurl, function(error, response, body){
		if (!error && response.statusCode == 200){
			res.send(body)
		}
	})
});

app.listen(80);
console.log("We are connected to port 3000, You have to change this when hosting on DO to port 80!!!");








