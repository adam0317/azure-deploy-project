(function () {
	'use strict';

	angular.module('app').component('register', {
		templateUrl: 'auth/register/register.html',
		controller: registerController,
		controllerAs: 'model',
	});

	function registerController($state, userService, $location) {
		var model = this;
		userService.checkToken().then(function (response) {

			if (response.data.id) {
				$location.path('/login');

			} else {
				console.log('not logged in');
			}
		})

		model.register = (data) => {
			userService.register(data).then((response) => {
				return data;
			}).then(function (data) {
				console.log('data', data);		
				userService.login(data).then(function(){
				$state.reload();
			})
			})
		}
	}
})();



