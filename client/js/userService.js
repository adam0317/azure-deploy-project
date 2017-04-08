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
				console.log(response);
				if (response.status != 200) {
					
					deferred.resolve(response.data.status);
				}else{
				localStorage.setItem('token', JSON.stringify(response.data.token));
				console.log(response.data.token);
				
				deferred.resolve(response);
				}
			})
			return deferred.promise;
		}

		this.checkToken = function () {
			var defer = $q.defer();
			
			var token = {
				
				"token": JSON.parse(localStorage.getItem('token'))
			}
			//console.log(token);
			$http.post(host + '/api/account', token).then(function (response) {
				if (response.status != 200) {
					console.log(response.status);
					defer.resolve(response);
				}
				else {
					
					
					defer.resolve(response);
				}
			})
			return defer.promise;
		}

		

	});

})();