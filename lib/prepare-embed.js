/**
 * Expose `prepareEmbed`
 */

module.exports = prepareEmbed;

/**
 * Prepare an iframe for API control. 
 *
 * Embedded YouTube videos require an `enablejsapi`
 * parameter to be controlled 
 *
 * @param {String} embedID - id of iframe to prepare
 */

function prepareEmbed(embedID) {
  var embed = document.getElementById(embedID);

  if (!isEmbeddedVideo(embed)) {
    throw new Error('embed must be an iframe');
  }

  enableAPIControl(embed);
}

/**
 * Enable API control via a `enablejsapi` parameter
 *
 * @param {Object} embed
 */

function enableAPIControl(embed) {
  if (!/&enablejsapi=1/.test(embed.src)) {
    embed.src += '&enablejsapi=1';
  }
}

/**
 * @param {Object} [embed]
 * @returns {Boolean}
 */

function isEmbeddedVideo(embed) {
  return embed && embed.tagName === 'IFRAME';
}
