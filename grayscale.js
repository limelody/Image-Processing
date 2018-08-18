var img = new Image();
img.src = 'assets/rnm.png';
img.onload = function() {
  gray(this);
};

function gray(img) {

    //initializes image
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';

    //vectorize the image
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    var grayscale = function() {
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i+1] + data[i+2]) / 3;
            data[i] = avg;
            data[i+1] = avg;
            data[i+2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
    };

    var convert_gray = document.getElementById('convert_gray');
    convert_gray.addEventListener('click', grayscale);
}