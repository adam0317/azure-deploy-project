var express = require('express');
var app = require('../server.js');
var apiRoutes = express.Router();
var db = app.get('db');
var jwt = require('jsonwebtoken');
var dbController = require('./dbController.js');
var bcrypt = require('bcrypt');
var passwordService = require('./passwordService');
//Create a new user
apiRoutes.post('/newuser', dbController.newUser);
apiRoutes.post('/createOrder', dbController.createOrder);


//Products

apiRoutes.get('/product', dbController.getProducts);
// apiRoutes.get('product/:id', dbController.getProductbyId);
// apiRoutes.post('product/:id', dbController.postProductbyId);
// apiRoutes.delete('product/:id', dbController.deleteProductbyId);


apiRoutes.post('/login', function (req, res) {
 
  // find the user
  db.users.findOne({
    email: req.body.email
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.status(403).send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!passwordService.validPassword(req.body.password, user.password)) {
        res.status(403).send({ success: false, message: 'Authentication failed. Wrong Password.' });

      }
      else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

apiRoutes.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
       
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

apiRoutes.post('/', function (req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.post('/account', function (req, res) {
  db.users.findOne({ email: req.decoded.email}, function (err, user) {
    var user = {
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id
    }
    res.json(user);
  });
});

apiRoutes.post('/users', function (req, res) {
  db.users.find({}, function (err, users) {
    res.json(users);
  });
});

module.exports = apiRoutes;