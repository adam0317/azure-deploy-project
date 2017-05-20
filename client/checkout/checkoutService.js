(function () {
	'use strict';
	angular.module('app').service('checkoutService', function ($http, $q, userService, $location) {
		var host = new window.URL($location.absUrl()).origin;
	this.chargeCard = function (token, amount) {
		console.log('amoutn', amount);
		token.amount = amount;
		var defer = $q.defer();
		$http.post(host + '/api/chargeCard', token).then(function (result) {
			console.log('api.get fired', result);
			defer.resolve(result);
		})
		return defer.promise;
	}

	});
})();