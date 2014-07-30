function beginLoad_confirm() {
	if (cart.isEmpty() || localStorage.getItem('customerdetails') == null) location.href = 'home.html';
}

function confirm_createTable() {
	products_array = []
	getProductInformation(confirm_populateData);
	for (var i = 0; i < cart.countProducts(); i++)
		document.write("<tr class='tabledata'><td>" + Object.keys(cart.readCart().getOccurences())[i] + "</td><td></td><td>" + cart.readCart().countOccurence(Object.keys(cart.readCart().getOccurences())[i]) + "</td><td></td></tr>");
	document.write("<tr class='noborder' id='shippingcosts'><td></td><td></td><td></td><td></td></tr>")

}

function confirm_populateData() {
	for (var i = 0; i < cart.countProducts(); i++) {
		var product = products_array[i];
		document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[1].innerHTML = product[0].split(';')[0];
		document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[3].innerHTML = "$" + document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[2].innerHTML * ((product[1].split(';').length == 3) ? product[1].split(';')[2] : product[1].split(';')[0]);
		document.getElementById('checkout_totalprice').innerHTML = confirm_getTotalCartPrice();
	}
	var customerdetails = localStorage.getItem('customerdetails').split(';');
	document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML = capitalise_first(customerdetails[0], true);
	document.getElementsByTagName('table')[1].getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML = capitalise_first(customerdetails[1], true).replaceAll('[|]', ', ');
	document.getElementsByTagName('table')[1].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML = customerdetails[2];
	document.getElementsByTagName('table')[1].getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML = customerdetails[3];
	document.getElementsByTagName('table')[1].getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML = customerdetails[4];
	if (customerdetails[5] == 'creditcard') {
		for (var i = 0; i < document.getElementsByClassName('table_creditcard').length; i++) document.getElementsByClassName('table_creditcard')[i].style.display = 'table-row';
		document.getElementsByTagName('table')[1].getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML = "Credit Card";
		document.getElementsByTagName('table')[1].getElementsByTagName('tr')[6].getElementsByTagName('td')[1].innerHTML = (customerdetails[6] == "MASTERCARD") ? "Mastercard" : ((customerdetails[6] == "VISA") ? "Visa" : "American Express");
		document.getElementsByTagName('table')[1].getElementsByTagName('tr')[7].getElementsByTagName('td')[1].innerHTML = customerdetails[7]
		document.getElementsByTagName('table')[1].getElementsByTagName('tr')[8].getElementsByTagName('td')[1].innerHTML = customerdetails[8]
		document.getElementsByTagName('table')[1].getElementsByTagName('tr')[9].getElementsByTagName('td')[1].innerHTML = customerdetails[9]
	} else {
		document.getElementsByTagName('table')[1].getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML = "PayPal";
	}
	document.getElementById('shippingcosts').getElementsByTagName('td')[3].innerHTML = 'Shipping + $' + calculateShipping();
}

function calculateShipping() {
	var customerdetails = localStorage.getItem('customerdetails').split(';');
	return (customerdetails[1].split("|")[customerdetails[1].split("|").length-1]=='Australia') ? 5 : 20;
}
function confirm_getTotalCartPrice() {
	try {
		var price = 0;
		for (var i = 0; i < cart.countProducts(); i++) {
			price += Number(document.getElementsByClassName('tabledata')[i].getElementsByTagName('td')[3].innerHTML.substr(1));
		}
		return price + calculateShipping();;
	} catch (e) {
		console.log(e)
	}
}

function capitalise_first(str, isMultiple) {
	if (typeof isMultiple !== 'undefined' && isMultiple) {
		str = str.split(',');
		result = [];
		for (var i = 0; i < str.length; i++) {
			result[result.length] = String.concat(str[i][0].toUpperCase(), str[i].substr(1));
		}

		return result.join('|');
	} else return String.concat(str[0].toUpperCase(), str.substr(1));

}

function doOrder() {
	cart.emptyCart();
	document.getElementById('confirm_foreground').style.display = 'block';
	document.getElementById('confirm_background_overlay').style.display = 'block';
}