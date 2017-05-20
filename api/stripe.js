

if (!process.env.node_env) {
	var config = require('../config.js');
	var stripe = require("stripe")(
		config.stripeKey
	);
}
if (process.env.node_env) {
	// Add to Azure Config File
	var keySecret = process.env.SECRET_KEY;
	var stripe = require("stripe")(keySecret);
}



exports.charge = function (req, res, next) {

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






