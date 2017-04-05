(function () {
	angular.module('app').service('mainService', function ($http, $q, $location) {
	
		//var host = $location.$$protocol + '://' + $location.$$host;
		var host = new window.URL($location.absUrl()).origin;

		this.test = function () {
			
			return "this service is working";
		}

		

		this.getProducts = function () {
			var deferred = $q.defer();
			$http.get(host + '/api/product').then(function (response) {
				console.log(response.data);
				deferred.resolve(response.data);
			})
			return deferred.promise;
		}

	

	});



})();