var cart = {
  /* Cart functions */
  //Variables
  getLength: function() {
	// Get length of the shopping cart
    var temp = localStorage.getItem('cart');
    if (temp == null) return 0; //No cart exists
    else return temp.split(',').length;
  },
  countProducts: function() {
	// Count how many unique products there are present in the shopping cart
    var size = 0;
    for (key in this.readCart().getOccurences())
      if (this.readCart().getOccurences().hasOwnProperty(key)) size++;
    return size;
  },
  //Booleans
  isEmpty: function() {
	// Returns true if the shopping cart is empty
    if (localStorage.getItem('cart') == '' || this.getLength() == 0) return true;
    return false;
  },
  //Methods
  updateCartCount: function(showCart, force) {
	// Updates id _cart_count_ with the cart count.
	// If the showCart boolean is true, attempt to update the id _hcart_ with the count.
	//   If the shopping cart is empty and showCart is true, hide the cart, unless force is set as true
    var cart_count = (this.isEmpty()) ? 0 : this.getLength();
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
	// Get contents of the cart
    if (this.isEmpty()) return [];
    return localStorage.getItem('cart').split(',');
  },
  //Cart Editing
  emptyCart: function() {
	/* Deletes the cart */
    return localStorage.removeItem('cart');
  },
  addToCart: function(productcode, updateCartCount) {
	/* Add product to cart */
    productcode = productcode.toString();
    if (typeof updateCartCount !== 'undefined' && updateCartCount) {
      localStorage.setItem('cart', this.readCart().add(productcode).sort());
      this.updateCartCount(true);
    } else localStorage.setItem('cart', this.readCart().add(productcode).sort());
  },
  removeFromCart: function(productcode, updateCartCount) {
	/* Remove product from cart */
    productcode = productcode.toString();
    var temp = this.readCart();
    if (temp.length == 0) return false;
    localStorage.setItem('cart', temp.remove(productcode).sort());
    if (typeof updateCartCount !== 'undefined' && updateCartCount) this.updateCartCount(true);
  },
  removeAllFromCart: function(productcode, updateCartCount) {
	/* Remove all occurences of _productcode_ from the cart */
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