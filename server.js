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
var port = process.env.PORT || 8081;


app.use(bodyParser.json());


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/client/index.html');
// });

app.use(express.static(path.resolve(__dirname, 'client')));

app.listen(port, function () {
  console.log('Listening on port ' + port);
})