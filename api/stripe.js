
if (!process.env.node_env) {
	var config = require('../config.js');
	var stripe = require("stripe")(
		config.stripeKey
	);

	exports.charge = function (req, res, next) {
		console.log('charge fired')
		var stripeToken = req.body.id;
		var amount = req.body.price * 100;
		console.log('stripeToken', stripeToken);
		

		// ensure amount === actual product amount to avoid fraud

		stripe.charges.create({
			card: stripeToken,
			currency: 'usd',
			amount: amount
		},
			function (err, charge) {
				if (err) {
					console.log(err);
					res.send('error');
				} else {
					res.send('success');
				}
			});
	};



}


