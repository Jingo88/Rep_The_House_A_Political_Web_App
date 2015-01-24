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

app.listen(3000);