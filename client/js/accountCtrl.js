(function () {
angular.module('app').controller('accountCtrl', function ($scope, mainService, cartService, userService, $location) {

function checkToken() {
	userService.checkToken().then(function (response) {
		console.log(response);
		$scope.account = response;
	})
}

checkToken();

});
	
})();
