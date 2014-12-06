/**
 * Module dependencies
 */

var assert = require('assert');
var sinon = require('sinon');
var prepareEmbed = require('../lib/prepare-embed');

var noop = function() {};

var perfectEmbed;
var goodEmbed;
var badEmbed;

describe('prepare-embed', function() {
  beforeEach(function() {

    /**
     * Perfect case scenario, embedded iframe is already ready to control.
     */
    
    perfectEmbed = document.createElement('iframe');
    perfectEmbed.src = '#&enablejsapi=1';
    perfectEmbed.id = 'perfect-embed';

    /**
     * This iframe just needs to be API enabled
     */
    
    goodEmbed = document.createElement('iframe');
    goodEmbed.src = '#';
    goodEmbed.id = 'good-embed';

    /**
     * Bad. This isn't even an iframe.
     */
    
    badEmbed = document.createElement('div');
    badEmbed.id = 'bad-embed';

    document.body.appendChild(perfectEmbed);
    document.body.appendChild(goodEmbed);
    document.body.appendChild(badEmbed);
  });

  afterEach(function() {
    document.body.removeChild(perfectEmbed);
    document.body.removeChild(goodEmbed);
    document.body.removeChild(badEmbed);
  });

  it('should throw an error if embed doesnt exist', function() {
    assert.throws(function() {
      prepareEmbed('imaginary-iframe');
    });
  });

  it('should throw an error if embed isnt an iframe', function() {
    assert.throws(function() {
      prepareEmbed('bad-embed');
    });
  });

  it('should enable API control using an iframes `src` attribute', function() {
    prepareEmbed('good-embed');
    assert.ok(/&enablejsapi=1/.test(goodEmbed.src));
  });

  it('should do nothing if the iframe is already prepared', function() {
    var previousSrc = perfectEmbed.src;
    prepareEmbed('perfect-embed');

    assert.equal(previousSrc, perfectEmbed.src);
  });
});