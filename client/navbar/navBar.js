(function () {
	'use strict';
	angular.module('app').component('navBar', {
		templateUrl: 'navbar/navbar.html',
		controller: Controller,
		controllerAs: 'model'
		
	})

	function Controller($state) {
		var model = this;

		model.logOut = function () {
			localStorage.removeItem('token');
			$state.reload();
		}
		
	}
})();