function loadPath(url, callback) {
  /* Load a url and if loaded, call callback() */
  result = document.createElement("iframe"); // Create an iframe element
  result.src = url; // Set the iframe element's source path
  result.style.height = 0; // Set the iframe element's height to 0
  result.style.width = 0; // Set the iframe element's width to 0
  result.style.display = "none"; // Hide the iframe element
  result.onload = function() {callback();} // When the iframe loads, call callback()
  document.head.appendChild(result); // Attach the iframe element to the document head. (iframe will only load when it is attached)
}

function showDocument() {
	/* Show the page */
    document.getElementById('container').style.display = 'inherit';
  }

Array.prototype.add = function(item) {
  /* Adds _item_ into an array */
  this[this.length] = item;
  return this;
}
Array.prototype.remove = function(item, selector) {
	/* Removes _item_ from an array, and if multiple existences of _item_ exists, removes the (n)th one (selector) */
    var array = [];
    if (typeof selector === 'undefined') {
      for (var a = 0; a < this.length; a++) {
        if (a == this.indexOf(item)) continue;
        array.add(this[a]);
      }
    } else {
      var tmparray = [];
      for (var b = 0; b < this.length; b++) {
        if (this[b] != item) continue;
        tmparray.add(b);
      }
      for (var c = 0; c < this.length; c++) {
        if (c == tmparray[selector]) continue;
        array.add(this[c]);
      }
    }
    if (array[0] == "") return [];
    return array;
  }

Array.prototype.getOccurences = function() {
  /* Return an object of array items and their repeated occurences */
  var result = {};
  for (var i = 0; i < this.length; i++) {
    if (result[this[i]]) result[this[i]] += 1;
    else result[this[i]] = 1;
  }
  return result;
}
Array.prototype.countOccurence = function(item) {
  /* Returns a count of the occurences a value is found in an array */
  return this.getOccurences()[item];
}
String.prototype.replaceAll = function(find, replace) {
  /* Replace all existences of _find_ with _replace_ */
  return this.replace(new RegExp(find, 'g'), replace);
}

function fixFooter() {
  /* Fix the issue of the footer not being anchored at the bottom of long pages
     aka I didn't have time to find the actual problem - Andrew */
  document.getElementById('footer_wrapper').className += ' footer_fix';
}