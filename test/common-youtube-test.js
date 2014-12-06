/**
 * Module dependencies
 */

var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquireify')(require);

var noop = function() {};

describe('common-youtube', function() {
  beforeEach(function() {

    /**
     * Add a fake embedded video to control
     */
    
    youtubeEmbed = document.createElement('iframe');
    youtubeEmbed.src = '#';
    youtubeEmbed.id = 'youtube-embed';
    document.body.appendChild(youtubeEmbed);

    /**
     * Mock out YouTube iframe API
     */

    playerMock = {
      playVideo: sinon.spy(),
      pauseVideo: sinon.spy(),
      addEventListener: sinon.spy()
    };

    window.YT = {
      Player: sinon.stub().returns(playerMock),
      PlayerState: {
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2
      }
    };

    loadAPIStub = sinon.stub().returns(function(cb) {
      cb(null, window.YT);
    });

    /**
     * Magic happens
     */
    
    YouTube = proxyquire('../', {
      './lib/load-api': loadAPIStub
    });
  });

  afterEach(function() {
    document.body.removeChild(youtubeEmbed);
  });

  describe('initialization', function() {
    it('loads the YouTube iframe API', function() {
      var player = new YouTube('youtube-embed');
      assert.ok(loadAPIStub.called);
    });

    it('creates a new instance of `YT.Player`', function() {
      var player = new YouTube('youtube-embed');
      assert.ok(window.YT.Player.calledWith('youtube-embed'));
    });
  });

  describe('functionality', function() {
    it('can play a video', function() {
      var player = new YouTube('youtube-embed');
      player.play();

      assert.ok(playerMock.playVideo.called);
    });

    it('can pause a video', function() {
      var player = new YouTube('youtube-embed');
      player.pause();

      assert.ok(playerMock.pauseVideo.called);
    });
  });

  describe('events', function() {
    it('should emit a `ready` event when player has loaded', function(done) {
      var player = new YouTube('youtube-embed');

      player.on('ready', done);
      player.handlePlayerReady();
    });

    it('should emit a `play` event when playing', function(done) {
      var player = new YouTube('youtube-embed');

      player.on('play', done);
      player.handlePlayerStateChange({
        data: window.YT.PlayerState.PLAYING
      });
    });

    it('should emit a `pause` event is paused', function(done) {
      var player = new YouTube('youtube-embed');

      player.on('pause', done);
      player.handlePlayerStateChange({
        data: window.YT.PlayerState.PAUSED
      });
    });

    it('should emit a `end` event when video has ended', function(done) {
      var player = new YouTube('youtube-embed');

      player.on('end', done);
      player.handlePlayerStateChange({
        data: window.YT.PlayerState.ENDED
      });
    });
  });
});
