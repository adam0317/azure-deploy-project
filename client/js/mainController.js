(function () {
	angular.module('app').controller('mainController', function ($scope, mainService, cartService, userService, $location) {


		function getCart() {
			$scope.cart = cartService.getCart();
		}
		getCart();

		$scope.register = function (data) {
			userService.register(data).then(function (response) {
				$scope.user = response;

			})

		}


		$scope.login = function (user) {

			console.log('this fired');
			userService.login(user).then(function (response) {

				$location.path('/account');

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



		$scope.addToCart = function ($index) {
			var item = $scope.products[$index];
			cartService.addToCart(item);
			getCart();
			$scope.totalPrice = cartService.getTotalPrice();

		}

		$scope.placeOrder = function () {
			cartService.checkOut($scope.cart).then(function (response) {
				
				$scope.currentOrder = $scope.cart;
				cartService.removeFromCart();
				getCart();
				$scope.totalPrice = cartService.getTotalPrice();
				$location.path('/order');
				console.log("scope.currentOrder", $scope.currentOrder);

			});

		}



		function testServices() {
			//cartService.cartServiceTest(); // => working
			mainService.test();
		}
		testServices();
		getProducts();



	});



})();