(function () {
	'use strict';

	angular.module('app').component('productGrid', {

		templateUrl: 'products/product-grid.html',
		controller: productGridController,
		controllerAs: 'model',
		bindings: {
			products: '<'
		}
		
		
	});

	function productGridController(productService, cartService) {
		var model = this;
		model.addToCart =  (product) => {
			cartService.addToCart(product)
		}
	}
})();