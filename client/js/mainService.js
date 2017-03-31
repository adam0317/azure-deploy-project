(function () {
	angular.module('app').service('mainService', function ($http, $q) {
		this.test = function () {
			return "this service is working";
		}

		this.login = function (data) {
			console.log(data);
			var deferred = $q.defer();
			$http.post('http://localhost:8081/api/login', data).then(function (response) {
				deferred.resolve(response);
			})
			return deferred.promise;
		}

		this.getProducts = function () {
			var deferred = $q.defer();
			$http.get('http://localhost:8081/api/product').then(function (response) {
				console.log(response.data);
				deferred.resolve(response.data);
			})
			return deferred.promise;
		}

	

	});



})();