//Utility snippets from my previous projects - Andrew Wong
function addToCart(productcode) {
}
function removeFromCart(productcode) {
}
function updateCart() {
document.getElementById('cart_count').innerHTML = localStorage.getItem('cart').split(',').length;
}