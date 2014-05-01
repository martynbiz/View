# View

A light weight library (under 2kb uncompressed) for making AJAX calls and storing the data locally for rendering.

## Allows:

- AJAX calls to be made using ajax library (#fetch).
- Data to then be stored locally to be used again and again (render/ re-render).
- Define #render function to handle data after AJAX call (#fetch).
- Recalling of #render function without reload of data (#fetch).
- That's all .. basically it's just a simple JavaScript object so add in your own app-specific funcionality too.

## Instalation:

Download the view.js file and add within your website <head> tag (also depends on AJAX library - see my other repositories):

```html
<script src="ajax.js"></script>
<script src="view.js"></script>
```

## Setting up:

Define your instance. One instance per remote API:

```javascript
var prices = new View({
	url: "data/prices.json", // url of remote API
	container: "prices_div", // the div to render to (optional -- this can be ommited if no html rending occurs)
	render: function(data) { // the function to call once data is retreived and data is stored
		.
		.
		.
		$("#".this.container).html(...)
	}
});
```

Create another instance for a different API (should it be required):

```javascript
var products = new View({
	url: "data/products.json", // url of remote API
	container: "prices_div", // the div to render to (optional -- this can be ommited if no html rending occurs)
	render: function(data) { // the function to call once data is retreived and data is stored
		.
		.
		.
		$("#".this.container).html(...)
	}
});
```

Will store the data in the object and provides a nice wrapper object for each API call.

## Making a call:

```javascript
prices.fetch();
```

The above alone will make the AJAX call, store the data in the object and automatically call the #render function. This function can be called as is many times without having to redefine the options set during instantiation.

## What next?

### Add some object-specific methods (optional):

```
// 
prices.getTopPrices = function(max_to_return) {
  $.each(this.data, function(value) {...
  .
  .
  .
}
```

### Multiple simultaneous loads, single render (optional):

```
var prices = new View({
	url: "data/prices.json", // url of remote API
	container: null, // another instance will render for this instance
	render: function(data) { // the function to call once data is retreived and data is stored
		products.render(); // call another instance's #render
	}
});

var products = new View({
	url: "data/products.json", // url of remote API
	container: "products_div", // the div to render to (optional -- this can be ommited if no html rending occurs)
	render: function(data) { // designed to handle two data sources
		if(!products.dataReady || !this.dataReady) return false; // check for both data flags
		// ..proceed to render using this.data and products.data
		.
		.
		.
		$("#".this.container).html(...)
	}
});

prices.fetch();
products.fetch();
```

### Render (without reloading data):

```javascript
prices.render(); // render using previously loaded data on default/current settings
```

### Render with options:

You defined the render function so you can render with any params you want. Just remember though the first param will be data if params are used (otherwise data will just be taken from the objects .data property). By calling the #render function in this way, custom data can also be passed.

```javascript
var prices = new View({
	url: "data/prices.json", // url of remote API
	container: null, // another instance will render for this instance
	render: function(data, options) { // you'll need to define options param too
		// ...function can now expect options to be passed in
		if(options && options.showTitle) $("#title").show();
	}
});

prices.render(null, { // 
  showTitle: true
});
```

That's basically it. Very basic but allows you to do the basic functionality you need for calls without relying on a more packed library (e.g. backbone) with many features you may not require.
