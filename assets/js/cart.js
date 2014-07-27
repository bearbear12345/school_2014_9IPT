var cart = {
	//Variables
	getLength: function() {
		var temp = localStorage.getItem('cart');
		if (temp == null) return 0; //No cart exists
		else return temp.split(',').length;
	},
	countProducts: function() {
		var size = 0;
		for (key in this.readCart().getOccurences())
			if (this.readCart().getOccurences().hasOwnProperty(key)) size++;
		return size;
	},
	//Booleans
	isEmpty: function() {
		return this.getLength() == 0;
	},
	//Methods
	updateCartCount: function(showCart, force) {
		var cart_count = this.getLength();
		if (typeof showCart !== 'undefined') {
			if (showCart) {
				if (cart_count == 0) {
					if (typeof force !== 'undefined' && force) document.getElementById('hcart').style.display = 'inherit';
					else document.getElementById('hcart').style.display = 'none';
				} else document.getElementById('hcart').style.display = 'inherit';
			} else document.getElementById('hcart').style.display = 'none';
		}
		document.getElementById('cart_count').innerHTML = cart_count;
	},
	readCart: function() {
		if (this.isEmpty()) return [];
		return localStorage.getItem('cart').split(',');
	},
	forEach: function(func) {
		for (var i = 0; i < this.countProducts(); i++) {
			func(Object.keys(cart.readCart().getOccurences())[i]);
		}
	},
	//Cart Editing
	emptyCart: function() {
		return localStorage.removeItem('cart');
	},
	addToCart: function(productcode, updateCartCount) {
		productcode = productcode.toString();
		if (typeof updateCartCount !== 'undefined' && updateCartCount) {
			localStorage.setItem('cart', this.readCart().add(productcode).sort());
			this.updateCartCount();
		} else localStorage.setItem('cart', this.readCart().add(productcode).sort());
	},
	removeFromCart: function(productcode, updateCartCount) {
		productcode = productcode.toString();
		var temp = this.readCart();
		if (temp.length == 0) return false;
		if (typeof updateCartCount !== 'undefined' && updateCartCount) {
			localStorage.setItem('cart', temp.remove(productcode).sort());
			return this.updateCartCount();
		} else localStorage.setItem('cart', temp.remove(productcode).sort());
	},
	removeAllFromCart: function(productcode, updateCartCount) {
		productcode = productcode.toString();
		 temp = this.readCart();
		if (temp.length == 0) return false;
		for (var i = 0; i < cart.readCart().countOccurence(productcode); i++) {
			temp = temp.remove(productcode).sort();
		}
		if (typeof updateCartCount !== 'undefined' && updateCartCount) {
			localStorage.setItem('cart', temp);
			return this.updateCartCount();
		} else localStorage.setItem('cart', temp);
	},
}