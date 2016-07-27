module.exports = View;

var MAX_TIME_STEP = 200;

function View(opts) {
  var container = opts.container;
  if (!container)
    container = 'body';

  if (typeof container === 'string')
    container = document.querySelector(container);

  var width = opts.width;
  var height = opts.height;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  container.appendChild(canvas);

  var model = opts.model;

  var projector = {
    widthRatio: width / model.width,
    heightRatio: height / model.height,

    width: function(p) { return p * this.widthRatio; },
    revWidth: function(p) { return p / this.widthRatio; },

    height: function(p) { return p * this.heightRatio; },
    revHeight: function(p) { return p / this.heightRatio; },

    x: function(p) { return this.width(p); },
    revX: function(p) { return this.revWidth(p); },

    y: function(p) { return height - this.height(p); },
    revY: function(p) { return this.revHeight(height - p); }
  };

  var ctx = canvas.getContext('2d');
  animate(ctx);

  return {
    canvas: canvas,
    projector: projector
  };

  function animate(ctx) {
    var prev = Date.now();
    run();

    function run() {
      var now = Date.now();
      var time = Math.min(now - prev, MAX_TIME_STEP);

      emptyCanvas(ctx);
      model
        .timeStep(time)
        .getBalls()
        .forEach(function(ball) { drawBall(ball, ctx); })

      prev = now;

      requestAnimationFrame(run);
    }
  }

  function emptyCanvas(ctx) {
    ctx.save();
    ctx.clearRect(0,0, width, height);
    ctx.fillStyle = opts.bgColor || 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, width, height);
    ctx.restore();
  }

  function drawBall(ball, ctx) {
    var x = projector.x(ball.x);
    var y = projector.y(ball.y);
    var radius = projector.height(ball.radius);
    var fillStyle = ball.props.fillStyle || 'red';
    var strokeStyle = ball.props.strokeStyle || 'blue';

    var circle = new Path2D();
    circle.moveTo(x + radius, y);
    circle.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.fill(circle);
    ctx.strokeStyle = strokeStyle;
    ctx.stroke(circle);
    ctx.restore();
  }
}

