(function () {
	'use strict';
	angular.module('app').service('userService', function ($http, $q, $location) {

		var host = new window.URL($location.absUrl()).origin;
		this.register = (user) => {
			var defer = $q.defer();
			$http.post(host + '/api/newuser', user).then((response) => {
				defer.resolve(response.data);
			})
			return defer.promise;
		}

		this.login = (data) => {
			console.log(data);

			var deferred = $q.defer();
			$http.post(host + '/api/login', data).then((response) => {
				if (response.status != 200) {
					deferred.resolve(response.data.status);
				} else {
					localStorage.setItem('token', JSON.stringify(response.data.token));
					deferred.resolve(response);
				}
			})
			return deferred.promise;
		}

		this.checkToken = () => {
			var defer = $q.defer();
			var token = {
				"token": JSON.parse(localStorage.getItem('token'))
			}
			//console.log(token);
			$http.post(host + '/api/account', token).then((response) => {
				if (response.status != 200) {
					console.log(response.status);
					defer.reject(response);
				}
				else {
					defer.resolve(response);
				}
			})
			return defer.promise;
		}
	});
})();