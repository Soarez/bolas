var Model = require('./model');
var View = require('./view');

module.exports.setup = setup;

function setup(opts) {
  var ratio = opts.width / opts.height;
  var height = 1;
  var width = height * ratio;
  var model = Model({
    height: height,
    width: width
  });

  opts.model = model;
  var view = View(opts);

  view.canvas.addEventListener('click', onClick);

  function onClick(evt) {
    model.addBall({
      radius: height / 40,
      x: view.projector.revX(evt.x),
      y: view.projector.revY(evt.y),
      velX: randomSpeed(width * 3),
      velY: randomSpeed(height * 3),
      props: {
        fillStyle: randomColor(),
        strokeStyle: randomColor()
      }
    });
  }

  function randomSpeed(max) {
    max = max * 2;
    return Math.random() * max * 2 - max;
  }
}

function randomColor() {
  return '#' + (
    '00000' +
    Math.floor(Math.random()*16777215).toString(16)
  ).substr(-6);
}

