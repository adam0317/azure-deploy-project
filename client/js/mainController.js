(function () {
	angular.module('app').controller('mainController', function ($scope, mainService, cartService) {
		
		
		function getCart() {
			$scope.cart = cartService.getCart();
		}
		getCart();

	
		$scope.login = function () {
			var data = {};
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
			getCart();
			$scope.totalPrice = cartService.getTotalPrice();
		}

		
			$scope.totalPrice = cartService.getTotalPrice();
			
		// if ($scope.cart) {
		// 	$scope.checkout();
			
		// }
		//

		$scope.addToCart = function ($index) {
			var item = $scope.products[$index];
			cartService.addToCart(item);
			getCart();
			$scope.totalPrice = cartService.getTotalPrice();
			
		}

		$scope.placeOrder = function () {
			localStorage.removeItem('allEntries');
			getCart();
			$scope.totalPrice = cartService.getTotalPrice();
		}



		function testServices() {
			//cartService.cartServiceTest(); // => working
			mainService.test();
		}
		//testServices();
		getProducts();



	});



})();