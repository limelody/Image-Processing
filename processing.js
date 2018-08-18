var img = new Image();
img.src = 'assets/rnm.png';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};

var color_box = document.getElementById('color_box');
function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';
  color_box.style.background = rgb;
  color_box.textContent = rgb;
}
canvas.addEventListener('mousemove', pick);