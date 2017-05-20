(function () {
	'use strict';
	angular.module('app').component('checkout', {
		templateUrl: 'checkout/checkout.html',
		controller: Controller,
		controllerAs: 'model',


	});

	function Controller(cartService, $location, checkoutService) {


		var model = this;

		model.cart = cartService.getCart();
		model.totalPrice = cartService.getTotalPrice();
		model.removeFromCart = (item) => {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}

		model.placeOrder = () => {
			var amount = model.totalPrice * 100;
			var email = 'adam@adam.com'
			var handler = StripeCheckout.configure({
			key: 'pk_test_MuxO5FCjjPatdlIXWxkm3lW2',
			image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
			locale: 'auto',
			token: function (token) {
				
				checkoutService.chargeCard(token, amount).then(function (response) {
					console.log('response', response);
					
				})
			}
		});
			handler.open({
				name: 'Super Cameras',
				description: model.cart.length + ' Items',
				amount: amount,
				email: email,

			});
		}
	}
})();