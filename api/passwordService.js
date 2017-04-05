var app = require('../server.js');
var db = app.get('db');
var bcrypt = require('bcrypt');

exports.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};