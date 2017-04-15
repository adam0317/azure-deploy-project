(function () {
	'use strict';
	angular.module('app').component('order', {
		templateUrl: 'order/order.html',
		controller: orderController,
		controllerAs: 'model',

	})
	function orderController(cartService) {
		var model = this;
		model.currentOrder = JSON.parse(localStorage.getItem("allEntries"));

		cartService.removeFromCart();


	}
})();