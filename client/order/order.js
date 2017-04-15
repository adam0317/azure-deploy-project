(function () {
	'use strict';
	angular.module('app').component('order', {
		templateUrl: 'order/order.html',
		controller: orderController,
		controllerAs: 'model',
		bindings: {	
			
			currentOrder: '='
		}
	})
	function orderController(cartService) {
		var model = this;
		
		
	}
})();