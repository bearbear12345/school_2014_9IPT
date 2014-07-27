function loadProduct(productcode) {
	loadPath("products/" + productcode + "/info.txt", loadProduct_cont);
}

function loadProduct_cont() {
		productready = true;
		try {
			productinfo = result.contentWindow.document.body.innerHTML.replace(/(<([^>]+)>)/ig, "").split("\n");
		} catch (e) {
	/* Redundant as the index wrapper blocks chrome (Local file issue only)
    // Cross domain error, most likely
    //
    // Just chrome???
    // - "SecurityError: Blocked a frame with origin "null" from accessing a cross-origin frame."
	*/
			productready = false;
		}
		// productinfo[0] -> Name
		// productinfo[1] -> Price
		// productinfo[2] -> Availability
		// productinfo[3] -> Description
		document.head.removeChild(result);
	}
	/* Kind of stupid, but I don't care - Andrew
	// It would work better if I used a web server, but the assignment is submitted locally. Eh
	// And GitHub doesn't support custom 404 pages.
	// And I can't be bothered putting this on my vps.
	*/

	/*
	function loadproduct(productcode) {
	   // Webserver only
	  var xmlhttp;
	  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	  } else { // code for IE6, IE5
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange = function () {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	      productready = true;
	      productinfo = xmlhttp.responseText.split('\n');
	      // productinfo[0] -> Name
	      // productinfo[1] -> Price
	      // productinfo[2] -> Availability
	      // productinfo[3] -> Description
	    }
	  }
	  xmlhttp.open("GET", "../assets/products/" + productcode + "/info.txt", true);
	  //xmlhttp.open("GET", "products/" + productcode + "/info.txt", true);
	  xmlhttp.send();
	}
	*/