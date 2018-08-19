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
    img.style.display = 'none'; 

    //convert pixel to vector
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 
    var data = imageData.data;
    var dst_data = []; 
    
    //easy access to pixels in 3x3 matrix
    function POS(i, x, y) {
        return i + 4 * (x + canvas.width * y);
    };

    function DST_PIXEL(i) {
        return KERNEL[0] * data[POS(i, -1, -1)] + KERNEL[1] * data[POS(i, 0, -1)] + KERNEL[2] * data[POS(i, 1, -1)] +
        KERNEL[3] * data[POS(i, -1,  0)] + KERNEL[4] * data[POS(i, 0,  0)] + KERNEL[5] * data[POS(i, 1,  0)] +
        KERNEL[6] * data[POS(i, -1,  1)] + KERNEL[7] * data[POS(i, 0,  1)] + KERNEL[8] * data[POS(i, 1,  1)];
    };

    var gaussian = function() {
        for (var i = 0; i < data.length; i += 4) {
            //border condition
            if ((i/4) % canvas.width < 1 || (i/4) % canvas.width > canvas.width - 2 || 
                (i/4) < canvas.width || (i/4) > canvas.width * (canvas.height - 1)) {
                dst_data.push(data[i]  );
                dst_data.push(data[i+1]);
                dst_data.push(data[i+2]);
                dst_data.push(data[i+3]);
            } 
            
            //convolve
            else {
                var r_dst = DST_PIXEL(i);
                dst_data.push(r_dst);

                var g_dst = DST_PIXEL(i+1);
                dst_data.push(g_dst);

                var b_dst = DST_PIXEL(i+2); 
                dst_data.push(b_dst);

                var a_dst = DST_PIXEL(i+3);
                dst_data.push(a_dst);
            }
        }

        //put the data back into the source
        for (var i = 0; i < data.length; i++) {
            data[i] = dst_data[i]; 
        }
        ctx.putImageData(imageData, 0, 0); 
    };

    var gaussblur = document.getElementById('gaussblur');
    gaussblur.addEventListener('click', gaussian);
}

// const SIGMA = 1.0; 

// const CONVOLUTION = [1.0/Math.sqrt(2.0*Math.PI*SIGMA*SIGMA)*Math.exp(-1.0/(2.0*SIGMA*SIGMA)), 1.0/Math.sqrt(2.0*Math.PI*SIGMA*SIGMA)];

// const KERNEL = [CONVOLUTION[0]*CONVOLUTION[0], CONVOLUTION[0]*CONVOLUTION[1], CONVOLUTION[0]*CONVOLUTION[0],
//                 CONVOLUTION[0]*CONVOLUTION[1], CONVOLUTION[1]*CONVOLUTION[1], CONVOLUTION[0]*CONVOLUTION[1], 
//                 CONVOLUTION[0]*CONVOLUTION[0], CONVOLUTION[0]*CONVOLUTION[1], CONVOLUTION[0]*CONVOLUTION[0]];

const KERNEL = [0.077847, 0.123317, 0.077847, 0.123317, 0.195346, 0.123317, 0.077847, 0.123317, 0.077847];