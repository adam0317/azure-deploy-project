(function () {
	'use strict';
	angular.module('app').component('checkout', {
		templateUrl: 'checkout/checkout.html',
		controller: Controller,
		controllerAs: 'model',
		bindings: {
			totalPrice: '=',
			removeFromCart: '=',
			cart: '='
		}
	});

	function Controller(cartService, $location) {
		var model = this;
		model.placeOrder = function () {
			cartService.checkOut(model.cart).then(function (response) {

				model.currentOrder = model.cart;
				cartService.removeFromCart();
				cartService.getCart();
				model.totalPrice = cartService.getTotalPrice();
				$location.path('/order');
				console.log("model.currentOrder", model.currentOrder);

			});

		}
	}
})();