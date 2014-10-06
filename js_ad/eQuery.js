/**
 * jQuery like library
 * @author Daniel Fernandez
 */

var eQuery = function (param) {
    // If param is a string of type <tag>, create an element of type 'tag'
    // And store it as element property of the dQuery object
    var tag = param.replace(/<|>/g, '');     
    this.el = document.createElement(tag);    
};

// $().html() implementation
eQuery.prototype.html = function (html) {
    this.el.innerHTML += html;
    return this; // Return the dQuery instance to allow chaining
};

// Override eQuery object toString method, to return the element HTML
eQuery.prototype.toString = function () {
    return this.el.outerHTML;
};

// Expose the $ function: $()
var $ = function (param) {
    return new eQuery(param);
};

// Note that the dQuery 'toString' method is being called because the 'html' method return
// the dQuery instance.
document.getElementById('container').innerHTML = $('<p>').html('<b>Hola</b>').html('gg');
//parte final
