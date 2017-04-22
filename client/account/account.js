(function(){
'use strict';
angular.module('app').component('account', {

	templateUrl: 'account/account.html',
	controller: Controller,
	controllerAs: 'model'
})

function Controller(userService) {
	var model = this;
	
	var checkToken = () =>  {
		userService.checkToken().then((response) => {
		model.account = response.data;
	})
}
checkToken();
}
})();