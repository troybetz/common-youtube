/**
 * Module dependencies
 */

var loadAPI = require('./lib/load-api');
var prepareEmbed = require('./lib/prepare-embed');
var sdk;

/**
 * Expose `YouTube`
 */

module.exports = YouTube;

/**
 * Create new `YouTube` player.
 *
 * @param {String} id of embedded video
 */

function YouTube(id) {
  sdk = loadAPI();
  prepareEmbed(id);
  this.createPlayer(id);
}

/**
 * Play the video.
 *
 * @api public
 */

YouTube.prototype.play = function() {
  this.player.playVideo();
};

/**
 * Pause the video.
 *
 * @api public
 */

YouTube.prototype.pause = function() {
  this.player.pauseVideo();
};

/**
 * Create a controller for the video
 *
 * @param {String} id of embedded video
 * @api private
 */

YouTube.prototype.createPlayer = function(id) {
  var self = this;
  sdk(function(err, YT) {
    self.player = new YT.Player(id);
  });
};
