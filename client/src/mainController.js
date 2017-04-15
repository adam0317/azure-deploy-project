(function () {
	angular.module('app').controller('mainController', function ($scope, productService, cartService, userService, $location) {
		function getCart() {
			$scope.cart = cartService.getCart();
			
		}
		getCart();
		function getProducts() {
			productService.getProducts().then(function (response) {
				$scope.products = response;

			})
		}
		$scope.removeFromCart = function (item) {
			$scope.currentOrder = $scope.cart;
			cartService.removeFromCart(item);
			getCart();
			$scope.totalPrice = cartService.getTotalPrice();
		}
		$scope.totalPrice = cartService.getTotalPrice();
		$scope.addToCart = function (product) {

			cartService.addToCart(product);
			getCart();
			$scope.totalPrice = cartService.getTotalPrice();

		}
		//$scope.currentOrder={};
		getProducts();
	});
})();