var express         = require('express');
var path            = require('path');
var jwt             = require('jsonwebtoken');
var massive         = require('massive');
var session         = require('express-sessions');
var config          = require('./config.js');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var massiveInstance = massive.connectSync({
  connectionString:   process.env.connectionString || config.connectionString
});
var app             = express();
var port = process.env.port || 8081;

app.use(bodyParser.json());

app.set('db', massiveInstance);
module.exports      = app;
var apiRoutes       = require('./api/apiRoutes.js');
var dbController    = require('./api/dbController.js');

app.use('/scripts', express.static(__dirname + '/client/node_modules'));
app.use('/styles', express.static(__dirname + '/client/node_modules'));
app.use('/api', apiRoutes);
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/client/index.html');
// });

app.use(express.static(path.resolve(__dirname, 'client')));

app.listen(port, function () {
  console.log('Listening on port ' + port);
})