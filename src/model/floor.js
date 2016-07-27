var PRECISION = 4;
var FACTOR = Math.pow(10, PRECISION)

module.exports = floor;

function floor(value) {
  return Math.floor(value * FACTOR) / FACTOR;
}

