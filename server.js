var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('public'));

var apikey = fs.readFileSync('api_key.txt', 'utf8');




app.get('/', function(req, res){
	
	res.render('index.ejs', {apikey: apikey});

})

app.listen(3000);