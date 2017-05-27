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
				console.log('logged in')
			} else {
				console.log('not logged in');
			}
		})

		model.login = user => {
			userService.login(user).then((response) => {
				$state.reload();
			})
		}


	}
})();