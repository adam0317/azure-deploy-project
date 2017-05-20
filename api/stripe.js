


exports.charge = function (req, res, next) {
if (!process.env.node_env) {
		var config = require('../config.js');
		var stripe = require("stripe")(
			config.stripeKey
		);
	} 
	if (process.env.node_env) {
		// Add to Azure Config File
		const keySecret = process.env.SECRET_KEY;
		const stripe = require("stripe")(keySecret);
			}
	

	// var config = require('../config.js');
	// var stripe = require("stripe")(
	// 	config.stripeKey
	// 	);
	// console.log('charge fired', req.body)
	var amount = req.body.amount;

	stripe.customers.create({
		email: req.body.email,
		source: req.body.id
	})
		.then(customer =>
			stripe.charges.create({
				amount,
				description: "Sample Charge",
				currency: "usd",
				customer: customer.id
			})).then(function (response) {
				res.send(response);
			})

};






