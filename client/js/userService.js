(function () {
	angular.module('app').service('userService', function ($http, $q, $location ) {

	var host = new window.URL($location.absUrl()).origin;

		this.register = function (user) {
			
			var defer = $q.defer();
			$http.post(host + '/api/newuser', user).then(function (response) {
				
				defer.resolve(response.data);
			})
			return defer.promise;			
		}

		this.login = function (data) {
			console.log(data);
			var deferred = $q.defer();
			$http.post(host + '/api/login', data).then(function (response) {
				deferred.resolve(response);
			})
			return deferred.promise;
		}

	});

})();