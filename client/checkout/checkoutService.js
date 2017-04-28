(function () {
	'use strict';
	angular.module('app').service('checkoutService', function ($http, $q, userService) {

		var model = this;
		var stripe = Stripe('pk_test_gwKaJ0tqSc2RHwauehzBfGar');
		var elements = stripe.elements();

		// this.createStripeToken({
		// 	number: '4242424242424242',
		// 	cvc: '333',
		// 	exp_month: '06',
		// 	exp_year: '18'
		// }, stripeResponseHandler);

		// function stripeResponseHandler(status, response) {
			
		// 	if (response.error) {
		// 		alert(response.error.message);
				
		// 	} else {
		// 		// response contains id and card, which contains additional card details
		// 		var token = response.id;
		// 		// Insert the token into the form so it gets submitted to the server
				
		// 		console.log('token', token);
		// 		return token;
		// 	}
		// }

	});
})();