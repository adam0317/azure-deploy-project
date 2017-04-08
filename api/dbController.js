var app = require('../server.js');
var db = app.get('db');
var passwordService = require('./passwordService');

exports.newUser = function (req, res) {

  var user = {
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email,
    password: req.body.password

  }


  user.password = passwordService.hashPassword(user.password);


  db.users.save(user, function (err, result) {
    console.log(result);
    res.send(result);
  });

}

exports.getProducts = function (req, res) {

  db.products.find(function (err, products) {
    if (err) {
      console.log('taco' + err);
      res.send(err);
    }
    res.send(products);
  })
}

exports.createOrder = function (req, res) {
  console.log(req.body);
  db.orders.save(req.body, function (err, result) {

    res.send(result);
  });
}
exports.createOrderItem = function (req, res) {

  db.order_items.save(req.body, function (err, result) {
    console.log(result);
    res.send(result);
  });
}


