var app = require('../server.js');
var db = app.get('db');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(8);


exports.hashPassword = function(password) {
    return bcrypt.hashSync(password, salt, null);
};

exports.validPassword = function(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword);
};