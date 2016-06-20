# bangs-js

this code is javascript adjust height library for browser(contain ie8).

## dependences
- jquery@1.12.0

## install
npm install --save-dev bangs-js

## usage

### browserify

- html
```
<a class="js-bangs" href="#abc">anchor link</a>

<div id="abc">
    <!-- code -->
</div>
```

- javascript
```
var bangs = require("bangs-js");

bangs();

```

#### not browserify

- html
```
<a class="js-bangs" href="#abc">anchor link</a>

<div id="abc">
    <!-- code -->
</div>

...

<script src="bangs.js"></script>
<script src="app.js"></script>
```

- javascript
```
bangs();
```
