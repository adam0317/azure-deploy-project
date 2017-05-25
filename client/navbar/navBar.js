(function () {
	'use strict';
	angular.module('app').component('navBar', {
		templateUrl: 'navbar/navbar.html',
		controller: Controller,
		controllerAs: 'model'
		
	})

	function Controller($state, userService) {
		var model = this;
		model.loggedIn = false;
		userService.checkToken().then(function (response) {
			console.log('userService.checkToken Fired', response);
			if (response.data.id) {
				model.loggedIn = true;
				console.log('logged in navbar')
			} else {
				console.log('not logged in');
			}
		})
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