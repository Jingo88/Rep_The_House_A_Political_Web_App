var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(express.static('public'));


app.get('/', function(req, res){
	
	res.render('index.ejs');
})

app.listen(3000);