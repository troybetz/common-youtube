/**
 * Module dependencies
 */

var EventEmitter = require('events');
var globalize = require('random-global');
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
 * Mixin events
 */

YouTube.prototype = new EventEmitter();

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
 * Destroy a player
 */

YouTube.prototype.destroy = function() {
  this.unbindEvents();
  this.deglobalizeEventHandlers();
  delete this.player;
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
    self.globalizeEventHandlers();
    self.bindEvents();
  });
};

/**
 * Bind events
 *
 * @api private
 */

YouTube.prototype.bindEvents = function() {
  this.player.addEventListener('onReady', this.playerReadyHandle);
  this.player.addEventListener('onStateChange', this.stateChangeHandle);
};

/**
 * Bind events
 *
 * @api private
 */

YouTube.prototype.unbindEvents = function() {
  this.player.removeEventListener('onReady', this.playerReadyHandle);
  this.player.removeEventListener('onStateChange', this.stateChangeHandle);
};

/**
 * Called when player is fully integrated with the embedded video.
 *
 * @api private
 */

YouTube.prototype.handlePlayerReady = function() { 
  this.emit('ready');
};

/**
 * Handle various player events
 *
 * @param {Object} event
 * @api private
 */

YouTube.prototype.handlePlayerStateChange = function(event) {
  switch(event.data) {

    case window.YT.PlayerState.PLAYING:
      this.emit('play');
      break;

    case window.YT.PlayerState.PAUSED:
      this.emit('pause');
      break;

    case window.YT.PlayerState.ENDED: 
      this.emit('end');
      break;

    default: 
      return;
  }
};

/**
 * YouTube API requires global event handlers for some reason.
 *
 * @api private
 */

YouTube.prototype.globalizeEventHandlers = function() {
  this.playerReadyHandle = globalize(this.handlePlayerReady.bind(this));
  this.stateChangeHandle = globalize(this.handlePlayerStateChange.bind(this));
};

/**
 * Delete global event handlers on the window
 *
 * @api private
 */

YouTube.prototype.deglobalizeEventHandlers = function() {
  delete window[this.playerReadyHandle];
  delete window[this.stateChangeHandle];
  delete this.playerReadyHandle;
  delete this.stateChangeHandle;
};
