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
		model.removeFromCart = (item) => {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}
		model.addToCart =  (product) => {
			cartService.addToCart(product)
		}


		var getProducts = () => {

			return productService.getProducts().then((response) => {
				model.products = response;
				model.mainProduct = model.products[Math.floor((Math.random() * model.products.length))];
				
			})


		}
		getProducts();

	}
})();