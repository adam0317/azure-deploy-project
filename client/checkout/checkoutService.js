(function () {
	'use strict';
	angular.module('app').service('checkoutService', function ($http, $q, userService, $location) {
		var host = new window.URL($location.absUrl()).origin;
	
		this.chargeCard = function (token, amount) {
			console.log('amount', amount);
			token.amount = amount;
				var defer = $q.defer();
				$http.post(host + '/api/chargeCard', token).then(function (result) {
					console.log('api.get fired', result);
					defer.resolve(result);
				})
				return defer.promise;
			}

			// var defer = $q.defer();

		// 	userService.checkToken().then((response) => {
		// 		if (response.status != 200) {
		// 			defer.reject(response);
		// 		} else {
		// 			var products = cart.map((e) => {
		// 				return e.id;
		// 			})
		// 			var user = {
		// 				cust_id: response.data.id,
		// 				products: products
		// 			};
		// 			console.log('user', user);
					
		// 			return user;
		// 		}
		// 	}).then((user) => {
		// 		$http.post(host + '/api/chargeCard', token).then(function (result) {
		// 			console.log('api.get fired', result);
		// 			return user;
		// 		})

		// 	})
		// 		.then((user) => {
		// 			$http.post('/api/createOrder', JSON.stringify(user)).then((response) => {

		// 				defer.resolve(response);
		// 			})

		// 		})
		// 	return defer.promise;
		// }

	});
})();