# A simple infinite page loading function by clicking button

Small, easy for UDF, infinite loading, pagination by item ID

## Charateristics
	* The next item ID will automatically pass to server side for determining the next sql start row, rather than using various pagination params.
	* Convient to dismiss the current loading obj and restart a new one. Just reinitialize it

## Getting Started
Download the [development version][dev].

It can be merged into your own js file as a function or require it as a separate one.

In your web page:

### Dom Structure

```html
<div id="container">
    <div class="infinite-load-block">
    	...
    </div>
    <div class="infinite-load-block">
    	...
    </div>
    ...
</div>

<div class="load-more">
    <a href="?nextFromId={{$next_from_id}}"></a>

    @if(!empty($next_from_id))
        <button id="next" class="btn btn-default btn-block">Load More</button>
    @endif
</div>
```

Note
	* The "{{$next_from_id}}" expression is the variable from server side which determines the next sql start row.
	* Due to the dataType of ajax requestment is "html", the server side should define item ID each time to keep this "a" tag complete.
	* When next item ID comes to 0, means nothing more to load and the trigger button will hide itself.
	* The "#container" should be the direct parent dom to the ".infinite-load-block"

### Call

```javascript
<script src="jquery.js"></script>
<script src="infinite-click.js"></script>
<script>
$(function(){
	load_func({itemSelector: '.infinite-load-block'}, callback);
});
</script>
```

Note
	* Each time the "load_func" been called, a new load obj will be made.

### options
```javascript
{
    container: '#container',
    itemSelector: '',
    nextSelector: '.load-more a',
    trigger: '.load-more button'
};
```

Note
	* Here are default values for dom selector name, you can change it as you like.
	* It proposed that the "itemSelector" is different between each view page, but you can also give it a default value.

## Release History
  * 2016-07-03  v0.0.1  the first version of infinite-click plugin.

[dev]: https://raw.github.com/liveangela/infinite-click/master/dist/infinite-click.js
