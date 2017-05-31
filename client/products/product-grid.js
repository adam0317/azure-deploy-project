(function () {
	'use strict';

	angular.module('app').component('productGrid', {

		templateUrl: 'products/product-grid.html',
		controller: productGridController,
		controllerAs: 'model'


	});

	function productGridController(productService, cartService, $timeout) {
		var model = this;

		model.addToCart = (product) => {
			cartService.addToCart(product)
			product.clicked = !product.clicked;
			$timeout(function () {
				product.clicked = !product.clicked;
			}, 2000)

		}
		function getProducts() {
			productService.getProducts().then(function (response) {
				model.products = response;
				model.products.forEach(function (element) {
					element.clicked = false;
				});
				
				

			})
		}
		getProducts();
	
	}
})();