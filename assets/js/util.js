function loadpath(url, callback) {
  result = document.createElement("iframe");
  result.src = url;
  result.style.height = 0;
  result.style.height = 0;
  result.style.display = "none";
  result.onload = function () {
    callback();
  };
  document.head.appendChild(result);
}

//Utility snippets from my previous projects - Andrew Wong
Array.prototype.add=function(item) {
  this[this.length]=item;
  return this;
}
Array.prototype.remove=function(item, selector) {
  array=[];
  if (typeof selector === 'undefined') {
    for (var a=0; a<this.length;a++) {
      if (a==this.indexOf(item)) continue;
      array.add(this[a]);
    }
  } else {
	  var tmparray=[];
      for (var b=0; b<this.length;b++) {
        if (this[b]!=item) continue;
        tmparray.add(b);
      }
	  for (var c=0; c<this.length;c++) {
		if (c==tmparray[selector]) continue;
        array.add(this[c]);
      }
  }
  return array;
}