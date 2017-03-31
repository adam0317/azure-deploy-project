(function () {
	angular.module('app').controller('mainController', function ($scope, mainService, cartService) {
		var data = {};
		$scope.cart = JSON.parse(localStorage.getItem('allEntries'));


		//console.log($scope.cart);
		$scope.login = function () {
			data.username = $scope.username;
			data.password = $scope.password;
			console.log('this fired');
			mainService.login(data).then(function (response) {
				console.log(response);
			})
		}

		function getProducts() {
			mainService.getProducts().then(function (response) {
				$scope.products = response;
			})
		}

		$scope.removeFromCart = function (item) {
			console.log('mainController removeFromCart Fired');
			cartService.removeFromCart(item);
		}

		$scope.checkout = function () {
			$scope.totalPrice = cartService.checkout();
		}
		if ($scope.cart) {
			$scope.checkout();
		}
		//

		$scope.addToCart = function ($index) {
			var item = $scope.products[$index];
			cartService.addToCart(item);
			
		}

		$scope.placeOrder = function () {
			localStorage.removeItem('allEntries');
		}





		function testServices() {
			cartService.cartServiceTest(); // => working
		}
		//testServices();
		getProducts();



	});



})();