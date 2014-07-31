function beginLoad() {
  /* Check if the supplied parameters are a valid product */
  parameters = window.location.toString();
  if (parameters.indexOf("?") + 1 != 0) { //If there are parameters
    hasargs = true;
    parameters = parameters.substring(parameters.indexOf("?") + 1).split("&");
    var img = new Image();
    img.onerror = function() {
      console.log('Page not found! Redirecting...');
      loadfourohfour();
    }
    img.src = 'products/' + parameters[0] + '/product.jpg';
  } else hasargs = false;
  if (hasargs) loadProduct(parameters[0]); // If the boolean _hasargs_ is _true_ (Product code entered as first parameter), call the loadProduct() function (found in the page_products.js file) passing the product code as a parameter.
}

/* Kind of stupid, but I don't care - Andrew
  // It would work better if I used a web server, but the assignment is submitted locally. Eh
  // And GitHub doesn't support custom 404 pages.
  // And I can't be bothered putting this on my vps.
*/
function loadfourohfour() {
  /* Load the 404 page 
     Yes, this was unecessary, but assignments are meant to be somewhat interesting are they not? 
  */
  loadPath("404.html", loadfourohfour_cont);
}

function loadfourohfour_cont() {
	/* 404 loading callback */
    document.body.innerHTML = result.contentWindow.document.body.innerHTML;
    document.head.removeChild(result);
  }

/* 
  //Old version of the 404 page, probably works better than the most recent version, however does NOT work locally. And since it's a hand-in local file assignment, this won't suffice.
  //It'd work better if I could submit the website on an actual website. ie http://bearbear12345.github.io/school_ipt_as3
function loadfourohfour() {
  // Webserver only
  var xmlhttp;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      return document.getElementsByTagName('html')[0].innerHTML = xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", "404.html", false);
  xmlhttp.send();
}
*/

function loadProduct(productcode) {
  /* Load the product _productcode_ */
  loadPath("products/" + productcode + "/info.txt", loadProduct_cont);
}

function loadProduct_cont() {
  /* Product loading callback */
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
  

/*
  //Old version of the 404 page, probably works better than the most recent version, however does NOT work locally. And since it's a hand-in local file assignment, this won't suffice.
  //It'd work better if I could submit the website on an actual website. ie http://bearbear12345.github.io/school_ipt_as3
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

function finishLoad() {
  /* Populate divs in the html page with the product information + cleanup */
  if (typeof productready !== 'undefined' && productready) {
    fixFooter(); // Call fixFooter() function in util.js
    productcategory = productinfo[0].substring(productinfo[0].indexOf(';') + 1).toLowerCase().trim(); // Seems to be a zero-width character somewhere, although trimming fixes the issue | Or it was the debug webserver.
    var productname = productinfo[0].substring(0, productinfo[0].indexOf(';')); // Set the product name
	document.getElementById('product_location').innerHTML = (productcategory == 'scuba/snorkeling gear') ? "<a href='home.html'><img style='margin-right: 2px; padding-bottom: 4px; vertical-align: middle;' src='../assets/images/home.png' alt='Home logo'/>Home</a> > <a href='products.html'>Products</a> > <a href='category_scubasnorkelinggear.html'>" + productinfo[0].substring(productinfo[0].indexOf(';') + 1) + "</a> > <b>" + productname + "</b>" : "<a href='home.html'><img style='margin-right: 2px; padding-bottom: 4px; vertical-align: middle;' src='../assets/images/home.png' alt='Home logo'/>Home</a> > <a href='products.html'>Products</a> > <a href='category_" + productcategory + ".html'>" + productinfo[0].substring(productinfo[0].indexOf(';') + 1) + "</a> > <b>" + productname + "</b>"; // Set the _product_location_ content
    document.getElementById('productname').innerHTML = productname; // Set the product name in the HTML page
    document.getElementById('productcode').innerHTML = "Product Code: " + parameters[0]; // Set product code
    if (productinfo[1].indexOf(";") > -1) { // Check if the product is on discount
      priceinfo = productinfo[1].split(';');
      document.getElementById('productdatabaseinfo_price').innerHTML = "Price: <strike>$" + priceinfo[0] + "</strike> $" + priceinfo[2] + "<br>" + priceinfo[1] + "% discount"; // Set the discount text and price
    } else document.getElementById('productdatabaseinfo_price').innerHTML = "Price: $" + productinfo[1]; // No discount
	document.getElementById('productdatabaseinfo_availability').innerHTML = (productinfo[2] != 0) ? "Availability: <span style='color: green';>Product In Stock</span>" : "Availability: <span style='color: red';>Product Out Of Stock</span>"; // Set product availability
    if (productinfo[2] == 0) document.getElementById('productaddtocart').style.display = 'none'; // Hide Add To Cart button if the the product is out of stock
    document.getElementById('productdescription').innerHTML = productinfo[3]; // Set the product description
    if (productcategory == 'scuba/snorkeling gear') document.getElementById('product_category_scubasnorkeling_gear').className += ' active'; // Set product category
    else document.getElementById('product_category_' + productcategory).className += ' active'; // Set product category
    document.getElementById('productimage').src = "products/" + parameters[0] + "/product.jpg"; // Set product image
    $("#productbarcode").barcode(parameters[0], "code128"); // Set product barcode
    document.getElementById('product_found').style.display = "inherit"; // Show product information
    delete hasargs; // Cleanup
    delete productinfo; // Cleanup
    delete productready; // Cleanup
  } else {
    document.getElementById('product_not_found').style.display = 'inherit'; // Show product listings
  }
  document.getElementById('ccontent').style.display = "inherit"; // Show page
  showDocument(); // Actually show page
}