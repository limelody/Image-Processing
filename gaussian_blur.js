var img = new Image(); 
img.src = 'assets/rnm.png';
img.onload = function() {
    blur(this); 
};

function blur(img) {
    //initialize image
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0); 
    img.style.display = "none"; 

    //vectorize
    var imageData = ctx.getimageData(0, 0, canvas.width, canvas.height); 
    var src_data = imageData.data;
    var dst_data = []; 

}

