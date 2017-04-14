(function () {

	var env = {};

	if (window) {
		Object.assign(env, window.__env);
	}
	var app = angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: "/",
			template: '<product-grid products="products" add-to-cart="addToCart"></product-grid>'
		})
			.state('cart', {
				url: "/cart",
				template: '<cart remove-from-cart="removeFromCart" total-price="totalPrice" cart="cart"></cart>'
			})
			.state('account', {
				url: "/account",
				template: '<account></account>'

			})
			.state('checkout', {
				url: "/checkout",
				template: '<checkout remove-from-cart="removeFromCart" total-price="totalPrice" cart="cart"></checkout>'
			})
			.state('login', {
				url: "/login",
				template: '<login-page></login-page>'
			})
			.state('register', {
				url: "/register",
				template: '<register></register>'
			})
			.state('order', {
				url: "/order",
				template: '<order current-order="currentOrder"></order>'
			});





		$urlRouterProvider.otherwise("/");


	})

	app.constant('__env', env);

})();