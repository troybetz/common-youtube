/**
 * Module dependencies
 */

var YouTube = require('../');

/**
 * Create new player
 */

var player = new YouTube('youtube-embed');

player.on('ready', function() {
  player.play();
});
