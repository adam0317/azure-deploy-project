(function () {
	angular.module('app').service('productService', function ($http, $q, $location) {
	
		var host = new window.URL($location.absUrl()).origin;
		this.getProducts = function () {
			var deferred = $q.defer();
			$http.get(host + '/api/product').then(function (response) {
				//console.log(response.data);
				deferred.resolve(response.data);
			})
			return deferred.promise;
		}
	});
})();