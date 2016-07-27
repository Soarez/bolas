var floor = require('./floor');

module.exports = Accelerator;

function Accelerator(opts) {
  var pos = opts.pos || 0; // position
  var vel = opts.vel || 0; // speed
  var acc = opts.acc || 0; // acceleration
  var t0 = Date.now() / 1000;

  var ball = {
    getPosition: getPosition,
    getVelocity: getVelocity,
    getAcceleration: getAcceleration,
    getT0: getT0,
    reset: reset,
    timeStep: timeStep,
    friction: friction
  };

  return ball;

  function getT0() { return t0; }

  function getPosition(delta) {
    if (!delta)
      return pos;

    return floor(
      pos +
      vel * delta +
      acc/2 * Math.pow(delta, 2)
    );
  }

  function getVelocity(delta) {
    if (!delta)
      return vel;

    return floor(acc * delta + vel);
  }

  function getAcceleration() { return acc; }

  function reset(opts) {
    if ('pos' in opts) pos = opts.pos;
    if ('vel' in opts) vel = opts.vel;
    if ('acc' in opts) acc = opts.acc;
    t0 = opts.t0 || Date.now() / 1000;
    return this;
  }

  function timeStep(delta) {
    reset({
      pos: ball.getPosition(delta),
      vel: getVelocity(delta)
    });
  }

  function friction(coefficient) {
    coefficient = coefficient || 0.9;

    var newVel = floor(vel * coefficient);
    if (newVel === vel)
      newVel = 0;

    vel = newVel;
  }
}

