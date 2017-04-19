(function () {
	'use strict';
	angular.module('app').component('home', {
		templateUrl: 'home/home.html',
		controller: Controller,
		controllerAs: 'model',
		
	});

	function Controller($location, cartService) {
		var model = this;
		model.cart = cartService.getCart();
		model.totalPrice = cartService.getTotalPrice();
		model.removeFromCart = function (item) {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}
		
	}
})();