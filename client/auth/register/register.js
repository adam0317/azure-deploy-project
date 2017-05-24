(function () {
	'use strict';

	angular.module('app').component('register', {
		templateUrl: 'auth/register/register.html',
		controller: registerController,
		controllerAs: 'model',
	});

	function registerController($state, userService) {
		var model = this;

		model.register = (data) => {
			userService.register(data).then((response) => {
				model.user = response;
				$state.reload();
			})
		}
	}
})();



