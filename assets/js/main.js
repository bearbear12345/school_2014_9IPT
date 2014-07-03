    var hasargs;
    var parameters = window.location.toString();
    if (parameters.indexOf("?") + 1 != 0) { //If there are parameters
      hasargs = true;
      parameters = parameters.substring(parameters.indexOf("?") + 1).split("&");
      var img = new Image();
      img.onload = function () {}
      img.onerror = function () {
        console.log('Page not found! Redirecting...');
        document.location.href = '404.html';
      }
      img.src = '../assets/products/' + parameters[0] + '/product.png';

      var xmlhttp;
      var productinfo;
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          productinfo = xmlhttp.responseText.split('\n');
          // productinfo[0] -> Name
          // productinfo[1] -> Price
          // productinfo[2] -> Stock
          // productinfo[3] -> Description
        }
      }
      xmlhttp.open("GET", "../assets/products/" + parameters[0] + "/info.txt", true);
      xmlhttp.send();
    } else {
      // Show product listing maybe?
      hasargs = false;
    }

//    function finishload() {
      if (hasargs) {
        document.getElementById('pcontent').style.display = "inherit";
        document.getElementById('product_location').innerHTML = "<a href='site.html'>Home</a> > <a href='products'>Products</a> > " + productinfo[0].substring(productinfo[0].indexOf(';') + 1) + " > <u><b>" + productinfo[0].substring(0, productinfo[0].indexOf(';')) + "</b></u>";
        document.getElementById('productname').innerHTML = productinfo[0].substring(0, productinfo[0].indexOf(';'));
        if (productinfo[1].contains(';')) {
          //Discount
          priceinfo = productinfo[1].split(';');
          document.getElementById('productdatabaseinfo_price').innerHTML = "<strike>$" + priceinfo[0] + "</strike> $" + priceinfo[2] + "<br>" + priceinfo[1] + "% discount";
        } else {
          //No discount
          document.getElementById('productdatabaseinfo_price').innerHTML = productinfo[1];
        }
        document.getElementById('productdatabaseinfo_stock').innerHTML = productinfo[2];
        document.getElementById('productdescription').innerHTML = productinfo[3];
      }
      //Set product category
      document.getElementById("product_category_" + productinfo[0].substring(productinfo[0].indexOf(';') + 1).toLowerCase()).className += ' active';
      document.getElementById('productimage').src = "../assets/products/" + parameters[0] + "/product.png";
//    }