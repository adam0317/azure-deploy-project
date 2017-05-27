(function () {
	'use strict';
	angular.module('app').component('navBar', {
		templateUrl: 'navbar/navbar.html',
		controller: Controller,
		controllerAs: 'model'

	})

	function Controller($state, userService, $rootScope) {
		var model = this;
		model.loggedIn = false;
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			isLoggedIn();
		})

		function isLoggedIn() {
			userService.checkToken().then(function (response) {
				console.log('userService.checkToken Fired', response);
				if (response.data.id) {
					model.loggedIn = true;
					console.log('logged in navbar')
					return;
				} else {
					model.loggedIn = false;
					console.log('not logged in');
					return;
				}
			})
		}
		isLoggedIn();

		model.login = function () {
			//model.loggedIn = true;
		}

		model.logOut = function () {
			model.loggedIn = false;
			localStorage.removeItem('token');
			$state.reload();
		}

	}
})();