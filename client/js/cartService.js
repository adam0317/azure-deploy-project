(function () {
	angular.module('app').service('cartService', function ($http, $q, userService) {


		this.addToCart = function (item) {
			// Parse any JSON previously stored in allEntries
			var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
			if (existingEntries == null) existingEntries = [];

			localStorage.setItem("item", JSON.stringify(item));
			// Save allEntries back to local storage
			existingEntries.push(item);
			localStorage.setItem("allEntries", JSON.stringify(existingEntries));
			console.log(existingEntries);
			return existingEntries;
		};

		this.removeFromCart = function (item) {
			//console.log('removeFromCart Fired');
			var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
			if (existingEntries == null) {
				return;
			}
			for (var i = existingEntries.length - 1; i >= 0; i--) {
				if (item.id == existingEntries[i].id) {
					console.log('match');
					existingEntries.splice(i, 1);
					localStorage.setItem("allEntries", JSON.stringify(existingEntries));

				}
			}

		}

		this.getTotalPrice = function (items) {
			var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
			if (!existingEntries) {
				console.log("Nothing In Cart");
				return 0;
			}
			var totalPrice = 0;
			existingEntries.forEach(function (e) {
				console.log(e.sell_price);
				totalPrice += e.sell_price
			})
			console.log(totalPrice);
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

		this.checkOut = function () {
			var defer = $q.defer();
			var finalOrder = [];
			userService.checkToken().then(function (response) {
				if (response.status != 200) {
					defer.reject(response);
				} else {

					var user = {};
					user.cust_id = response.data.id;

					return user;
				}


			}).then(function (user) {
				$http.post('/api/createOrder', JSON.stringify(user)).then(function (response) {
					//console.log(response);
					var orderId = {};
					orderId.orders_id = response.data.id;
					orderId.products_arr = [2, 3, 4, 2];
					console.log(orderId);
					return orderId;
				}).then(function (orderId) {
					orderId.products_arr.forEach(function (item) {
						var order = {
							orders_id: orderId.orders_id,
							products_id: item
						}

						$http.post('/api/createOrderItem', order).then(function (response) {
							return response;
						}).then(function (response) {
							finalOrder.push(response);
						})
					})

				
				})
				defer.resolve(finalOrder);

			})
			return defer.promise;
		}

		this.cartServiceTest = function () {
			console.log('working');
		}


	})
})();