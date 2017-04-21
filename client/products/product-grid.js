(function () {
	'use strict';

	angular.module('app').component('productGrid', {

		templateUrl: 'products/product-grid.html',
		controller: productGridController,
		controllerAs: 'model',
		
		
	});

	function productGridController(productService, cartService) {
		var model = this;
		model.addToCart = function (product) {
			cartService.addToCart(product)
		}
		function getProducts() {
			productService.getProducts().then(function (response) {
				model.products = response;

			})
		}
		getProducts();
	}
})();