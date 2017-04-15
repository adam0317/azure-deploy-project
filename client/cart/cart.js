(function () {
	'use strict';
	angular.module('app').component('cart', {
		templateUrl: 'cart/cart.html',
		controller: Controller,
		controllerAs: 'model',
		bindings: {
			totalPrice: '=',
			removeFromCart: '=',
			cart: '='
		}
	})

	function Controller(cartService) {
		var model = this;
		
	}
})();
