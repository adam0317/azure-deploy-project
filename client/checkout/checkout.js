(function () {
	'use strict';
	angular.module('app').component('checkout', {
		templateUrl: 'checkout/checkout.html',
		controller: Controller,
		controllerAs: 'model',


	});

	function Controller(cartService, $location, checkoutService) {


		var model = this;
		
		model.cart = cartService.getCart();
		model.totalPrice = cartService.getTotalPrice();
		model.removeFromCart = (item) => {
			cartService.removeFromCart(item);
			model.cart = cartService.getCart();
			model.totalPrice = cartService.getTotalPrice();
		}

		model.preFillCardData = () => {
			model.card = {
				cardNumber: '4242424242424242',
				cardHolderName: 'Adam',
				expiryMonth: '06',
				expiryYear: '18',
				cvv: '333'
			};
			
		}
		model.preFillCardData();

		model.placeOrder = (card) => {
			
			
		
			checkoutService.createStripeToken(card).then((response) => {
				console.log('response', response);
			})
			
			
			// cartService.checkOut(model.cart, model.card).then((response) => {
			// 	$location.path('/order');
			// });

		}
	}
})();