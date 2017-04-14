(function () {
	'use strict';

	angular.module('app').component('productGrid', {

		templateUrl: 'products/product-grid.html',
		controller: productGridController,
		controllerAs: 'model',
		bindings: {
			addToCart: '<',
			products: '<'
		}
	});

	function productGridController(productService) {
		var model = this;
		
	}
})();