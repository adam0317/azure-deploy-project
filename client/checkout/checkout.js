(function () {
	'use strict';
	angular.module('app').component('checkout', {
		templateUrl: 'checkout/checkout.html',
		controller: Controller,
		controllerAs: 'model',

	});

	function Controller(cartService, $location) {
		var model = this;
		model.cart = cartService.getCart();
		model.totalPrice = cartService.getTotalPrice();
		model.removeFromCart = (item) => {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}
		model.placeOrder = () => {
			cartService.checkOut(model.cart).then((response) => {
				$location.path('/order');
			});

		}
	}
})();