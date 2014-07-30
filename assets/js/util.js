function loadPath(url, callback) {
	result = document.createElement("iframe");
	result.src = url;
	result.style.height = 0;
	result.style.height = 0;
	result.style.display = "none";
	result.onload = function() {
		callback();
	};
	document.head.appendChild(result);
}

function showDocument() {
		document.getElementById('container').style.display = 'inherit';
	}

//Utility snippets from my previous projects - Andrew Wong
Array.prototype.add = function(item) {
	this[this.length] = item;
	return this;
}
Array.prototype.remove = function(item, selector) {
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

//And I made this stuff up (27/07/2014)
Array.prototype.getOccurences = function() {
	var result = {};
	for (var i = 0; i < this.length; i++) {
		if (result[this[i]]) result[this[i]] += 1;
		else result[this[i]] = 1;
	}
	return result;
}
Array.prototype.countOccurence = function(item) {
	return this.getOccurences()[item];
}
String.prototype.replaceAll = function(find, replace) {
	 return this.replace(new RegExp(find, 'g'), replace);
}
