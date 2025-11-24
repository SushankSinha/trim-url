const crypto = require('crypto');

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a cryptographically secure random alphanumeric code
 * @param {number} length - Desired code length (default: 6)
 * @returns {string} Random length-character code
 */
function generateCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    const idx = crypto.randomInt(0, CHARS.length);
    code += CHARS[idx];
  }
  return code;
}

module.exports = { generateCode };