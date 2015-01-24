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

})

app.get('/donate/:crpID/:year', function(req, res){

	var crp = req.params.crpID;
	var yr = req.params.year;

	var donateurl = "http://www.opensecrets.org/api/?method=candContrib&cid="+ crp + "&cycle=" + yr + "&output=json&apikey=" + openKey

	console.log('this is your donateurl ' + donateurl)
	
	request(donateurl, function(error, response, body){
		if (!error && response.statusCode == 200){
			res.send(body)
		}
	})

});

app.listen(3000);
