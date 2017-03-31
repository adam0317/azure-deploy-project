(function () {
	angular.module('app').service('cartService', function ($http, $q) {


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
			for (var i = existingEntries.length-1; i >= 0; i--) {
				if (item.id == existingEntries[i].id) {
					console.log('match');
					existingEntries.splice(i, 1);
					localStorage.setItem("allEntries", JSON.stringify(existingEntries));
					
				}	
			}
			
		}

		this.checkout = function (items) {
			var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
			var totalPrice = 0;
			existingEntries.forEach(function (e) {
				console.log(e.sell_price);
				totalPrice += e.sell_price
			})
			console.log(totalPrice);
			return totalPrice;
		}
			


		this.getCart = function () {
			if (JSON.parse(localStorage.getItem('item'))) {
				var arr = JSON.parse(localStorage.getItem('item'));
				return arr;
			}
			else {
				return ['empty array'];
			}
		}

		this.cartServiceTest = function () {
			console.log('working');
		}
	})
})();