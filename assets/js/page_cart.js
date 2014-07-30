function beginLoad() {
	$(document.head).append('<iframe id="productload_iframe" content="text/html;charset=UTF-8" height=0 width=0 style="display: none"></iframe>');
}

function createTable() {
	if (!cart.isEmpty()) {
		document.getElementById('nocart').style.display = 'none';
		products_array = []
		getProductInformation();
		for (var i = 0; i < cart.countProducts(); i++)
			document.write("<tr class='tabledata'><td>" + Object.keys(cart.readCart().getOccurences())[i] + "</td><td><img height='75px' width='75px' src='products/" + Object.keys(cart.readCart().getOccurences())[i] + "/product.jpg'/></td><td></td><td></td><td><a href='#' onclick='changeAndUpdate(\"add\"," + i + ")'><img src='../assets/images/arrow_up.png'/></a><p class='nomargin'>" + cart.readCart().countOccurence(Object.keys(cart.readCart().getOccurences())[i]) + "</p><a href='#' onclick='changeAndUpdate(\"remove\"," + i + ")'><img src='../assets/images/arrow_down.png'/></a></td><td></td><td></td></tr>");

	} else {
		document.getElementById('ccontent').style.display = 'none';
		document.getElementById('nocart').style.display = 'inherit';
	}
}

function changeAndUpdate(add_or_remove, rownumber) {
	if (add_or_remove == 'add') {
		cart.addToCart(document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[0].innerHTML);
		document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[4].getElementsByTagName('p')[0].innerHTML = cart.readCart().countOccurence(Object.keys(cart.readCart().getOccurences())[rownumber]);
		document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[6].innerHTML = "$" + document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[4].getElementsByTagName('p')[0].innerHTML * document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[5].innerHTML.substr(1);

	} else {
		cart.removeFromCart(document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[0].innerHTML);
		if (document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[4].getElementsByTagName('p')[0].innerHTML == 1) document.getElementsByClassName('tabledata')[rownumber].outerHTML = '';
		else {
			document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[4].getElementsByTagName('p')[0].innerHTML = cart.readCart().countOccurence(Object.keys(cart.readCart().getOccurences())[rownumber]);
			document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[6].innerHTML = "$" + document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[4].getElementsByTagName('p')[0].innerHTML * document.getElementsByClassName('tabledata')[rownumber].getElementsByTagName('td')[5].innerHTML.substr(1);
		}
	}
	if (cart.isEmpty()) {
		document.getElementById('ccontent').style.display = 'none';
		document.getElementById('nocart').style.display = 'inherit';
	} else document.getElementById('totalprice').innerHTML = "Total: $" + getTotalCartPrice();
}

function getProductInformation(callback) {
	if (typeof products === 'undefined') {
		temp = cart.readCart();
	}
	products = Object.keys(temp.getOccurences());
	if (typeof firstproduct === 'undefined') {
		if (typeof callback !== 'undefined') z_callback = callback;
		else z_callback = populateData;
		$('iframe#productload_iframe').load(function() {
			getProductInformation_cont(this, products);
		});
		firstproduct = false;
	}
	if (products.length == 0) {
		delete temp;
		delete products;
		$(document.head).find('iframe').remove();
		z_callback();
		delete z_callback;
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

function populateData() {
	for (var i = 0; i < cart.countProducts(); i++) {
		product = products_array[i];
		document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[2].innerHTML = product[0].split(';')[0];
		document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[3].innerHTML = (product[3].split(' ').length > 36) ? ((product[3].split(' ').slice(0, 36).join(' ').slice(-1) == ",") ? product[3].split(' ').slice(0, 36).join(' ').slice(0, -1) : product[3].split(' ').slice(0, 36).join(' ')) + "..." : product[3];
		document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[5].innerHTML = "$" + ((product[1].split(';').length == 3) ? product[1].split(';')[2] : product[1].split(';')[0]);
		document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[6].innerHTML = "$" + document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[4].getElementsByTagName('p')[0].innerHTML * ((product[1].split(';').length == 3) ? product[1].split(';')[2] : product[1].split(';')[0]);
	}
	document.getElementById('totalprice').innerHTML = "Total: $" + getTotalCartPrice();
}

function getTotalCartPrice() {
	try {
		var price = 0;
		for (var i = 0; i < cart.countProducts(); i++) {
			price += Number(document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[6].innerHTML.substr(1));
		}
		return price;
	} catch (e) {
		console.log(e)
	}
}