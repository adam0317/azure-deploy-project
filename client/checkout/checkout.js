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
		



		model.placeOrder = () => {
			var handler = StripeCheckout.configure({
			key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
			image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
			locale: 'auto',
			token: function (token) {
				console.log('this fired', token);
				checkoutService.chargeCard(token).then(function (response) {
					console.log('response', response);
					
				})
				// Use the token to create the charge with a server-side script.
				// You can access the token ID with `token.id`
			}
		});
			handler.open({
				name: 'Super Cameras',
				description: model.cart.length + ' Items',
				amount: model.totalPrice * 100
			});
		}
	}
})();