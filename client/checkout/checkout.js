(function () {
	'use strict';
	angular.module('app').component('checkout', {
		templateUrl: 'checkout/checkout.html',
		controller: Controller,
		controllerAs: 'model',


	});

	function Controller(cartService, $location, userService, checkoutService) {


		var model = this;
		model.loggedIn = false;

		userService.checkToken().then(function (response) {
			console.log('userService.checkToken Fired', response);
			if (response.data.id) {
				model.loggedIn = true;
				console.log('logged in')
			} else {
				console.log('not logged in');
			}
		})

		model.showStripeButton = false;
		model.cart = cartService.getCart();
		var cart = model.cart;
		if (model.cart.length > 0) {
			model.showStripeButton = true;
		}
		model.totalPrice = cartService.getTotalPrice();

		model.placeOrder = () => {

			var amount = model.totalPrice * 100;
			var handler = StripeCheckout.configure({
				key: 'pk_test_MuxO5FCjjPatdlIXWxkm3lW2',
				image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
				locale: 'auto',
				token: function (token) {

					checkoutService.chargeCard(token, amount).then(function (response) {
						$location.path('/order');

					})
				}
			});
			handler.open({
				name: 'Super Cameras',
				description: model.cart.length + ' Items',
				amount: amount


			});
		}
	}
})();