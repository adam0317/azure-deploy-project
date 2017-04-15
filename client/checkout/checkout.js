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
		model.removeFromCart = function (item) {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}
		model.placeOrder = function () {
			cartService.checkOut(model.cart).then(function (response) {						
				$location.path('/order');
			});

		}
	}
})();