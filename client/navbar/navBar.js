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
				if (response.data.id) {
					model.loggedIn = true;				
					return;
				} else {
					model.loggedIn = false;
					return;
				}
			})
		}
		isLoggedIn();

		model.logOut = function () {
			model.loggedIn = false;
			localStorage.removeItem('token');
			$state.reload();
		}

	}
})();