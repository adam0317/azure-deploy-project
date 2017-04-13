(function () {

	var env = {};

	if (window) {
		Object.assign(env, window.__env);
	}
	var app = angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
		
		$stateProvider.state('home', {
			url: "/",
			templateUrl: "views/home.html"
		})
		.state('cart', {
			url: "/cart",
			templateUrl: "views/cart.html"
		})
		.state('account', {
			url: "/account",
			templateUrl: "views/account.html",
			controller: 'accountCtrl'
			
		})
		.state('checkout', {
			url: "/checkout",
			templateUrl: "views/checkout.html"
		})
		.state('product', {
			url: "/product",
			templateUrl: "views/product.html"
		})
		.state('login', {
			url: "/login",
			templateUrl: "views/login.html"
		})
		.state('register', {
			url: "/register",
			templateUrl: "views/register.html"
		})
		.state('order', {
			url: "/order",
			templateUrl: "views/order.html"
		}); 
		
		
		
		
		
		$urlRouterProvider.otherwise("/");


	})

	app.constant('__env', env);

})();