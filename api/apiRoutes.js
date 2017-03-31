var express = require('express');
var app = require('../server.js');
var apiRoutes = express.Router();
var db = app.get('db');
var jwt    = require('jsonwebtoken');
var dbController = require('./dbController.js');

//Create a new user
apiRoutes.post('/newuser', dbController.newUser);

//Products

apiRoutes.get('/product', dbController.getProducts);
// apiRoutes.get('product/:id', dbController.getProductbyId);
// apiRoutes.post('product/:id', dbController.postProductbyId);
// apiRoutes.delete('product/:id', dbController.deleteProductbyId);


apiRoutes.post('/login', function(req, res) {
	console.log(req.body.username);
  // find the user
  db.users.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password || !req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

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

apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
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

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
  db.users.find({}, function(err, users) {
    res.json(users);
  });
}); 

module.exports = apiRoutes;