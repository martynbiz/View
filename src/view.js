// JavaScript Document

var utils = utils || {
  
  extend: function(options) {
    for(var i=1; i<arguments.length; i++) {
	    for(var name in arguments[i]) { options[name] = arguments[i][name] }
    }
    return options;
  }
  
};

// View constructor
// Construtor class for our data retrievers (market and prices)
var View = function(options) {
	
	// default options
	options = utils.extend({
		url: "",
		container: "",
		render: function() { },
		refresh: false,
		refreshInterval: 0
	}, options);
	
	// user defined properties
	this.url = options.url; // url for the data
	this.container = options.container; // html container to render html to
	this.render = options.render; // how to render the data
	
	// data properties
	this.data = []; // container for our data
	this.dataReady = false; // flag whether or not data has been retrieved
};
// fetch property method
// Will fetch the data from the server, set flag to true/false, call render
// - ajax_options: don't confuse obj_options with ajax_options
View.prototype.fetch = function(data, options) {
	
	// default options
	options = utils.extend({
		url: this.url,
		method: "GET",
		dataType: "json"
	}, options);
	
	// set dataReady to false to indicate to any other process concerned with this data
	this.dataReady = false;
	
	// because this this is not this inside the ajax method
	var _this = this;
	
	// fetch data from the server
	ajax.fetch({
		url: options.url,
		data: data,
		dataType: options.dataType,
		method: options.method,
		success: function(data) {
			_this.data = data;
			_this.dataReady = true;
			_this.render(data);
		},
	});
	
};
