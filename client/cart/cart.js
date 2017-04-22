(function () {
	'use strict';
	angular.module('app').component('cart', {
		templateUrl: 'cart/cart.html',
		controller: Controller,
		controllerAs: 'model',
		
	})

	function Controller(cartService) {
		var model = this;
		model.cart = cartService.getCart();
		model.totalPrice = cartService.getTotalPrice();
		
		model.removeFromCart = (item) => {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}
	}
})();
