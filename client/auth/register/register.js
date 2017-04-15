(function () {
	'use strict';

	angular.module('app').component('register', {
		templateUrl: 'auth/register/register.html',
		controller: registerController,
		controllerAs: 'model',
	});

	function registerController(userService) {
		var model = this;

		model.register = function (data) {
			userService.register(data).then(function (response) {
				model.user = response;
			})
		}
	}
})();



