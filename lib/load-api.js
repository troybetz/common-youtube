/**
 * Module dependencies
 */

var load = require('require-sdk');

/**
 * Expose `loadAPI`
 */

module.exports = loadAPI;

/**
 * Load the YouTube API
 *
 * @returns {Function}
 */

function loadAPI() {
  var sdk = load('https://www.youtube.com/iframe_api', 'YT');
  var loadTrigger = sdk.trigger();

  /**
   * The YouTube API requires a global ready event handler. 
   * The YouTube API really sucks.
   */

  window.onYouTubeIframeAPIReady = function () {
    loadTrigger();
    delete window.onYouTubeIframeAPIReady;
  };

  return sdk;
}