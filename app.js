var express = require('express');
var app = express();
var config = require('./config/config.js');
config(app, express);
// require('./routes/index.js')(app);
// require('./routes/users.js')(app);
// require('./routes/api.js')(app);

app.listen(3000);
console.log( "server listening on port: 3000" );

// var routes = require('./routes/index');
// var users = require('./routes/users');
// var api = require('./routes/api');