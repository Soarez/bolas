var Bolas = require('../src');

window.addEventListener('load', init);

function init() {
  var body = document.querySelector('body');
  body.style.margin = '0';

  Bolas.setup({
    bgColor: '#f7f2ff',
    container: body,
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  });
}

