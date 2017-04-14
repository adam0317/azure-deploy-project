(function(){
'use strict';
angular.module('app').component('account', {

	templateUrl: 'account/account.html',
	controller: Controller,
	controllerAs: 'model'
})

function Controller(userService) {
	var model = this;
	function checkToken() {
	userService.checkToken().then(function (response) {
		console.log(response);
		model.account = response.data;
		
	})
}
checkToken();
}
})();