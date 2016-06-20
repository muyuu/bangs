# smoove

this code is javascript smoothscroll library for browser(contain ie8).

## dependences
- jquery@1.12.0

## install
npm install --save-dev smoove

## usage

### browserify

- html
```
<a class="js-smoove" href="#abc">anchor link</a>

<div id="abc">
    <!-- code -->
</div>
```

- javascript
```
var smoove = require("smoove");

smoove();

```

#### not browserify

- html
```
<a class="js-smoove" href="#abc">anchor link</a>

<div id="abc">
    <!-- code -->
</div>

...

<script src="bangs.js"></script>
<script src="app.js"></script>
```

- javascript
```
smoove();
```
