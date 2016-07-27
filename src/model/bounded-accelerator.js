var floor = require('./floor');
var Accelerator = require('./accelerator');

module.exports = BoundedAccelerator;

function BoundedAccelerator(opts) {
  var min = opts.min;
  var max = opts.max;
  var e = opts.e || 0.8; // coefficient of restitution i.e. "bounciness"

  var base = Accelerator(opts);
  var baseGetPosition = base.getPosition;
  base.getPosition = getPosition;

  return base;

  function getPosition(delta) {
    var pos = baseGetPosition(delta);
    if (!delta || (pos >= min && pos <= max))
      return pos;

    var newPos = floor(
      pos < min ? 
        min + (min - pos) * e :
        max - (pos - max) * e
    );
    var newSpeed = floor(base.getVelocity() * -e);

    base.reset({
      pos: newPos,
      vel: newSpeed
    });

    if (opts.onContact)
      opts.onContact();

    return baseGetPosition();
  }
}

