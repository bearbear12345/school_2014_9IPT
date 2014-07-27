function beginLoad() {}

function populateTable(size) {
	if (!cart.isEmpty()) {
		for (var i = 0; i < cart.readCart().getOccurences().size(); i++) {
			var product_code = Object.keys(cart.readCart().getOccurences())[i];
			var product_quantity = cart.readCart().countOccurence(product_code)
			//loadProduct(product_code)
				/* Alternatives
				//Now let's make this more confusing than it needs to be - jks
				cart.readCart().countOccurence(product_code)
				cart.readCart().getOccurences()[product_code]
				cart.readCart().countOccurence(Object.keys(cart.readCart().getOccurences())[i])
				cart.readCart().getOccurences()[Object.keys(cart.readCart().getOccurences())[i]]
				*/
			document.write("<tr class='tabledata'><td>" + product_code + "</td><td><img src='_products/" + product_code + "/product.jpg'/></td><td></td><td></td><td></td><td></td></tr>");
			// 
		}
	} else {}
}