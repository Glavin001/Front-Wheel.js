Front-Wheel.js
=============

> Front-end templating with [Handlebars](https://github.com/wycats/handlebars.js/).

-----

## Usage

```html
<script type="text/x-handlebars-template"
  data-tag="div" data-model-type="json" 
  data-model="{'message':'Hello World!'}">
Message: {{message}}
</script>
```

## Options

### `data-tag`

Replaces the `script` tag with this tag. Default is `div`.

### `data-model-type`

The type of the `model`, for knowing how to retrieve it. See below for more details.

### `data-model`

The `model` is the Handlebars' `context`.

### `data-update-interval`

Reload the `model` at an interval.

## Model Types

### `json` (Default)

```javascript
var context = JSON.parse($el.attr('data-model'));
```

### `ajax`

Coming soon.

