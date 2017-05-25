(function () {
	'use strict';

	angular.module('app').component('loginPage', {

		templateUrl: 'auth/login/login-page.html',
		controller: loginController,
		controllerAs: 'model',
		
	});

	function loginController($state, userService, $location) {
		var model = this;

		model.login = user => {
			userService.login(user).then((response) => {
				model.loggedIn = true;
				$state.reload();
			})
		}
		

	}
})();