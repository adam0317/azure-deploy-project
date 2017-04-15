(function () {
	'use strict';
	angular.module('app').component('checkout', {
		templateUrl: 'checkout/checkout.html',
		controller: Controller,
		controllerAs: 'model',
		bindings: {
			cart: '=',
			totalPrice: '=',
			removeFromCart: '='			
		}
	});

	function Controller(cartService, $location) {
		var model = this;
		model.placeOrder = function () {
			cartService.checkOut(model.cart).then(function (response) {			
				model.removeFromCart();
				$location.path('/order');
			});

		}
	}
})();