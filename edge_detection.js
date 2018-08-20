var img = new Image(); 
img.src = 'assets/rnm.png';
img.onload = function() {
    edge(this); 
};

function edge(img) {

    //initialize image
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0); 
    img.style.display = 'none'; 

    //convert pixel to vector
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 
    var data = imageData.data;
    var tmp_data = [];
    var dst_data = []; 
    /*
    function POS(i, x, y) {
        return i + 4 * (x + canvas.width * y); 
    }

    //first sobel filter
    function X_PIXEL(i) {
        return  1 * data[POS(i, -1, -1)] - 1 * data[POS(i, 1, -1)] +
                2 * data[POS(i, -1,  0)] - 2 * data[POS(i, 1,  0)] +
                1 * data[POS(i, -1,  1)] - 1 * data[POS(i, 1,  1)];
    }

    funtion Y_PIXEL(i) {
        return  1 * tmp_data[POS(i, -1, -1)] + 2 * tmp_data[POS(i, 0, -1)] + 1 * tmp_data[POS(i, 1, -1)] -
                1 * tmp_data[POS(i, -1,  1)] - 2 * tmp_data[POS(i, 0,  1)] - 1 * tmp_data[POS(i, 1,  1)];
    }

    function clamp(i, min, max) {
        return Math.max(min, Math.min(i, max));
    }
    */
    var edge_detection = function () {
        //grayscale
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i+1] + data[i+2]) / 3;
            data[i] = avg;
            data[i+1] = avg;
            data[i+2] = avg;
        }

        /*
        for (var i = 0; i < data.length; i += 4) {
            //border condition
            if ((i/4) % canvas.width < 1 || (i/4) % canvas.width > canvas.width - 2 || 
                (i/4) < canvas.width || (i/4) > canvas.width * (canvas.height - 1)) {
                tmp_data.push(data[i]);
                tmp_data.push(data[i+1]);
                tmp_data.push(data[i+2]);
                tmp_data.push(data[i+3]);
            }
        
            //apply filter once
            else {
                var r_tmp = X_PIXEL(i); 
                r_tmp = clamp(r_tmp, 0, 255); 
                tmp_data.push(r_tmp); 
                

                var g_tmp = X_PIXEL(i+1); 
                g_tmp = clamp(g_tmp, 0, 255);
                tmp_data.push(g_tmp);

                var b_tmp = X_PIXEL(i+2); 
                b_tmp = clamp(b_tmp, 0, 255);
                tmp_data.push(b_tmp);

                var a_tmp = X_PIXEL(i+3);
                a_tmp = clamp(a_tmp, 0, 255);
                tmp_data.push(a_tmp);
            }

            if ((i/4) % canvas.width < 1 || (i/4) % canvas.width > canvas.width - 2 || 
                (i/4) < canvas.width || (i/4) > canvas.width * (canvas.height - 1)) {
                dst_data.push(tmp_data[i]);
                dst_data.push(tmp_data[i+1]);
                dst_data.push(tmp_data[i+2]);
                dst_data.push(tmp_data[i+3]);
            }

            else {
                var r_dst = Y_PIXEL(i);
                r_dst = clamp(r_dst, 0, 255);
                dst_data.push(r_dst); 

                var g_dst = Y_PIXEL(i+1);
                g_dst = clamp(g_dst, 0, 255);
                dst_data.push(g_dst);

                var b_dst = Y_PIXEL(i+2);
                b_dst = clamp(b_dst, 0, 255);
                dst_data.push(b_dst);

                var a_dst = Y_PIXEL(i+3);
                a_dst = clamp(a_dst, 0, 255);
                dst_data.push(a_dst);
            }
        }

        for (var i = 0; i < data.length; i++) {
            data[i] = dst_data[i];
        } */
        ctx.putImageData(imageData, 0, 0); 
    };

    var sobel = document.getElementById('sobel');
    sobel.addEventListener('click', edge_detection);
    
}