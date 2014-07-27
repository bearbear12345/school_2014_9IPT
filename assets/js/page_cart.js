function beginLoad() {
	$(document.head).append('<iframe id="productload_iframe" content="text/html;charset=UTF-8" height=0 width=0 style="display: none"></iframe>');
}

function createTable() {
	if (!cart.isEmpty()) {
		products_array = []
		getProductInformation();
		for (var i = 0; i < cart.countProducts(); i++) {
			var product_code = Object.keys(cart.readCart().getOccurences())[i];
			var product_quantity = cart.readCart().countOccurence(product_code);
			/* Alternatives
				//Now let's make this more confusing than it needs to be - jks
				cart.readCart().countOccurence(product_code)
				cart.readCart().getOccurences()[product_code]
				cart.readCart().countOccurence(Object.keys(cart.readCart().getOccurences())[i])
				cart.readCart().getOccurences()[Object.keys(cart.readCart().getOccurences())[i]]
				*/
			var product_name = products_array[i][0].split(';')[0];
			//var product_description =
			var product_price = (products_array[i][1].split(';').length == 3) ? products_array[i][1].split(';')[2] : products_array[i][1].split(';')[0];
			document.write("<tr class='tabledata'><td>" + product_code + "</td><td><img height='75px' width='75px' src='products/" + product_code + "/product.jpg'/></td><td></td><td></td><td>" + product_quantity + "</td><td></td></tr>");
		}
	} else {}
}

function getProductInformation() {
	if (typeof products === 'undefined') {
		temp = cart.readCart();
	}
	products = Object.keys(temp.getOccurences());
	if (typeof firstproduct === 'undefined') {
		$('iframe#productload_iframe').load(function() {
			getProductInformation_cont(this, products);
		});
		firstproduct = false;
	}
	if (products.length == 0) {
		delete temp;
		delete products;
		$(document.head).find('iframe').remove();
		return;
	}
	$('iframe#productload_iframe').attr('src', "products/" + products[0] + "/info.txt");
}

function getProductInformation_cont(result, products) {
	products_array.add(result.contentWindow.document.body.innerHTML.replace(/(<([^>]+)>)/ig, "").split("\n"));
	var z = temp.countOccurence(products[0]);
	for (var i = 0; i < z; i++) {
		temp = temp.remove(products[0]);
	}
	getProductInformation();
}