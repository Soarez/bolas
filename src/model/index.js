var Ball = require('./ball');

module.exports = World;

function World(opts) {
  var width = opts.width; // meters
  var height = opts.height; // meters

  var balls = [ ];

  return {
    width: width,
    height: height,
    addBall: addBall,
    getBalls: getBalls,
    timeStep: timeStep
  };

  function addBall(opts) {
    opts.minX = 0;
    opts.maxX = width;
    opts.minY = 0;
    opts.maxY = height;
    balls.push(Ball(opts));
  }

  function getBalls() {
    return balls.map(function(ball) {
      return ball.getState();
    });
  }

  function timeStep(delta) {
    balls.forEach(function(ball) {
      ball.timeStep(delta/1000);
    });

    return this;
  }
}

