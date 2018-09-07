var img = new Image();
img.src = 'assets/STAT_240.jpg';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    
    var scanning = function() {
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i+1] + data[i+2]) / 3;
            data[i] = avg;
            data[i+1] = avg;
            data[i+2] = avg;
        }
        
        for (var i = 0; i < data.length; i += 4) {
            if (data[i] <= 160) {
                data[i] = 0; 
                data[i+1] = 0;
                data[i+2] = 0;
            }
            else if (data[i] > 160 && data[i] <= 200)
            {}
            else {
                data[i] = 255; 
                data[i+1] = 255; 
                data[i+2] = 255;  
            }
        } 
        ctx.putImageData(imageData, 0, 0);
    };

    var scan = document.getElementById('scan');
    scan.addEventListener('click', scanning);
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

