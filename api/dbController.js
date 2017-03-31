var app = require('./index.js');
var db = app.get('db');

exports.newUser = function (req, res) {
var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    password: req.body.password
  }

  db.users.save(user, function (err, result) {
    console.log(result);
    res.send(result);
  });

}

exports.getProducts = function (req, res) {
  db.products.find(function (err, products) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send(products);
  })
}


