(function () {
	'use strict';

	angular.module('app').component('loginPage', {

		templateUrl: 'auth/login/login-page.html',
		controller: loginController,
		controllerAs: 'model',

	});

	function loginController($state, userService, $location) {
		var model = this;
		model.loggedIn = false;

		userService.checkToken().then(function (response) {

			if (response.data.id) {
				model.user = response.data;
				model.loggedIn = true;

			} else {
				console.log('not logged in');
			}
		})

		model.login = user => {
			userService.login(user).then((response) => {
				if (response.status != 200) {
					model.loginError = true;
					console.log('error', model.loginError);
					//$state.reload();
				}
				else {
				$state.reload();					
				}
			})
		}


	}
})();