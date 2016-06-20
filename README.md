# bangs-js

this code is javascript adjust height library for browser(contain ie8).

## dependencies
- jquery@1.12.0

## install
npm install --save-dev bangs-js

## usage

### browserify

- html
```
<div class="js-bangs">
    <div class="js-bangs__item">text</div>
    <div class="js-bangs__item">text</div>
    <div class="js-bangs__item">text</div>
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
<div class="js-bangs">
    <div class="js-bangs__item">text</div>
    <div class="js-bangs__item">text</div>
    <div class="js-bangs__item">text</div>
</div>

...

<script src="bangs.js"></script>
<script src="app.js"></script>
```

- javascript
```
bangs();
```
