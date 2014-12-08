/**
 * Module dependencies
 */

var YouTube = require('../');

/**
 * Create new player
 */

window.player = new YouTube('youtube-embed');

/**
 * Event handlers
 */

player.on('ready', function() {
  console.log('READY');
  console.log('player: ', player);

  /**
   * Bind button controls
   */
  
  bindPlay(player);
  bindPause(player);
  bindDestroy(player);
});

player.on('play', function() {
  console.log('PLAYING');
});

player.on('pause', function() {
  console.log('PAUSED');
});

player.on('end', function() {
  console.log('ENDED');
});

/**
 * Player controls
 */


function bindPlay(player) {
  var play = document.getElementById('play');

  play.addEventListener('click', function() {
    player.play();
  });
}

function bindPause(player) {
  var pause = document.getElementById('pause');

  pause.addEventListener('click', function() {
    player.pause();
  });
}

function bindDestroy(player) {
  var destroy = document.getElementById('destroy');

  destroy.addEventListener('click', function() {
    player.destroy();
  });
}
