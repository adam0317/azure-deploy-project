(function () {
	'use strict';

	angular.module('app').component('loginPage', {

		templateUrl: 'login/login-page.html',
		controller: loginController,
		controllerAs: 'model',
		
	});

	function loginController(userService, $location) {
		var model = this;

		model.login = function(user) {
			userService.login(user).then(function (response) {
				$location.path('/account');
			})
		}

	}
})();