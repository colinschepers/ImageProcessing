 function applyNearestNeighborInterpolation(newWidth, newHeight) {
     let newPixels = new Array(pixels.length).fill(0);

     let dx = width / newWidth;
     let dy = height / newHeight;

     for (let j = 0; j < newHeight; j++) {
         for (let i = 0; i < newWidth; i++) {
             let x = Math.ceil(i * dx);
             let y = Math.ceil(j * dy);
             let pixelIdx = (y * width + x) * 4;

             let fromX = parseInt(i * dx);
             let toX = parseInt((i + 1) * dx);
             let fromY = parseInt(j * dy);
             let toY = parseInt((j + 1) * dy);

             for (let y = fromY; y < toY; y++) {
                 for (let x = fromX; x < toX; x++) {
                     let idx = (y * width + x) * 4;
                     newPixels[idx] = pixels[pixelIdx];
                     newPixels[idx + 1] = pixels[pixelIdx + 1];
                     newPixels[idx + 2] = pixels[pixelIdx + 2];
                     newPixels[idx + 3] = pixels[pixelIdx + 3];
                 }
             }
         }
     }

     newPixels.forEach((v, i, arr) => pixels[i] = v);
     updatePixels();
 }