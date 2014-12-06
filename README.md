# common-youtube

simple wrapper over the YouTube iframe API


## Installation

```
$ npm install common-youtube
```

## Usage


```js
var YouTube = require('common-youtube');
var player = YouTube('id-of-iframe');

player.on('ready', function() {
  player.play();
});

```

# License

  MIT