// var Accelerator = require('accelerator');
var BoundedAccelerator = require('./bounded-accelerator');

var GRAVITY = -9.8;  // meters /s /s

module.exports = Ball;

function Ball(opts) {
  var radius = opts.radius;
  var pos = {
    // x: Accelerator({
    //   pos: opts.x,
    //   vel: opts.velX
    // }),
    x: BoundedAccelerator({
      min: opts.minX + radius,
      max: opts.maxX - radius,
      pos: opts.x,
      vel: opts.velX,
      onContact: function() { pos.y.friction(); }
    }),
    y: BoundedAccelerator({
      min: opts.minY + radius,
      max: opts.maxY - radius,
      pos: opts.y,
      vel: opts.velY,
      acc: GRAVITY,
      onContact: function() { pos.x.friction(); }
    })
  };

  return {
    getState: getState,
    timeStep: timeStep
  };

  function getState() {
    return {
      props: opts.props,
      radius: radius,
      x: pos.x.getPosition(),
      y: pos.y.getPosition()
    };
  }

  function timeStep(delta) {
    pos.x.timeStep(delta);
    pos.y.timeStep(delta);
  }
}

