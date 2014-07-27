var cart = {
	//Variables
	getLength: function() {
		var temp = localStorage.getItem('cart');
		if (temp == null) return 0; //No cart exists
		else return temp.split(',').length;
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
					else return document.getElementById('hcart').style.display = 'none';
				} else return document.getElementById('hcart').style.display = 'inherit';
			} else return document.getElementById('hcart').style.display = 'none';
		}
		return document.getElementById('cart_count').innerHTML = cart_count;
	},
	readCart: function() {
		if (this.isEmpty()) return [];
		return localStorage.getItem('cart').split(',');
	},

	//Cart Editing
	emptyCart: function() {
		return localStorage.removeItem('cart');
	},
	addCart: function(productcode, updateCartCount) {
		if (typeof updateCartCount !== 'undefined' && updateCartCount) {
			localStorage.setItem('cart', this.readCart().add(productcode).sort());
			this.updateCartCount();
		} else localStorage.setItem('cart', this.readCart().add(productcode).sort());
	},
	removeCart: function(productcode, updateCartCount) {
		var temp = this.readCart();
		if (temp.length == 0) return false;
		if (typeof updateCartCount !== 'undefined' && updateCartCount) {
			localStorage.setItem('cart', temp.remove(productcode).sort());
			return this.updateCartCount();
		} else localStorage.setItem('cart', temp.remove(productcode).sort());
	},
}