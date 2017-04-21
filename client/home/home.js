(function () {
	'use strict';
	angular.module('app').component('home', {
		templateUrl: 'home/home.html',
		controller: Controller,
		controllerAs: 'model'


	});

	function Controller($location, cartService, productService) {
		var model = this;
		model.cart = cartService.getCart();
		model.totalPrice = cartService.getTotalPrice();
		model.removeFromCart = function (item) {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}
		model.addToCart = function (product) {
			cartService.addToCart(product)
		}


		var getMainProduct = () => {

			return productService.getProducts().then(function (response) {
				model.products = response;
				model.mainProduct = model.products[Math.floor((Math.random() * model.products.length))];
				console.log(model.mainProduct);
			})


		}
		getMainProduct();

	}
})();