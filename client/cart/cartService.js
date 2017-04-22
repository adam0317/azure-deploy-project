(function () {
	'use strict';
	angular.module('app').service('cartService', function ($http, $q, userService) {

		var model = this;

		this.addToCart = (item) => {
			// Parse any JSON previously stored in allEntries
			var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
			if (existingEntries == null) existingEntries = [];
			localStorage.setItem("item", JSON.stringify(item));

			// Save allEntries back to local storage
			existingEntries.push(item);
			localStorage.setItem("allEntries", JSON.stringify(existingEntries));
			return existingEntries;
		};

		this.removeFromCart = (item) => {
				
			if (!item) {
				localStorage.removeItem("allEntries");
				return;
			} else {
				var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
				if (existingEntries == null) {
					return;
				}
				for (var i = existingEntries.length - 1; i >= 0; i--) {
					if (item.id == existingEntries[i].id) {

						existingEntries.splice(i, 1);
						localStorage.setItem("allEntries", JSON.stringify(existingEntries));
						return existingEntries;
					}
				}
			}

		}

		this.getTotalPrice = (items) => {
			var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
			if (!existingEntries) {

				return 0;
			}
			var totalPrice = 0;
			existingEntries.forEach((e) => {

				totalPrice += e.sell_price
			})

			return totalPrice;
		}



		this.getCart = function () {
			if (JSON.parse(localStorage.getItem('allEntries'))) {
				var arr = JSON.parse(localStorage.getItem('allEntries'));
				return arr;
			}
			else {
				return [];
			}
		}

		this.checkOut = function (cart) {
			var defer = $q.defer();

			userService.checkToken().then((response) => {
				if (response.status != 200) {
					defer.reject(response);
				} else {
					var products = cart.map((e) => {
						return e.id;
					})
					var user = {
						cust_id: response.data.id,
						products: products
					};
					return user;
				}
			}).then((user) => {
				$http.post('/api/createOrder', JSON.stringify(user)).then((response) => {

					defer.resolve(response);
				})

			})
			return defer.promise;
		}
	})
})();