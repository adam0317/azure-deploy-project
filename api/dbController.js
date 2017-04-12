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
  var newArr = [];

  db.orders.save({ cust_id: req.body.cust_id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      req.body.products.map(function (e) {
        var newObj = {
          orders_id: result.id,
          products_id: e
        }
        newArr.push(newObj);
        return e;
      })
    }
   
    db.order_items.insert(newArr, function (err, result) {
      if (err) {
        res.send(err);
      }else{

      res.send(result);

      }
    });
    
  });

}



