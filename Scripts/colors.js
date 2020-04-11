 function applyMedianCutColorQuantization(pixels, colorPalette) {
     let buckets = [
         []
     ];

     for (let i = 0; i < pixels.length; i += 4) {
         buckets[0].push(i);
     }

     while (buckets.length < colorPalette) {
         let bucket = buckets.shift();
         let sortSpace = getMaxSpace(pixels, bucket);

         bucket.sort(function (idx1, idx2) {
             return pixels[idx1 + sortSpace] - pixels[idx2 + sortSpace]
         });

         buckets.push(bucket.slice(0, bucket.length / 2));
         buckets.push(bucket.slice(bucket.length / 2, bucket.length));
     }

     let newPixels = new Array(pixels.length).fill(0);

     for (let b = 0; b < buckets.length; b++) {
         let meanColor = getMeanColor(pixels, buckets[b]);
         for (let i = 0; i < buckets[b].length; i++) {
             let idx = buckets[b][i];
             newPixels[idx] = meanColor[0];
             newPixels[idx + 1] = meanColor[1];
             newPixels[idx + 2] = meanColor[2];
             newPixels[idx + 3] = meanColor[3];
         }
     }

     return newPixels;
 }

 function getMaxSpace(pixels, bucket) {
     let minArray = new Array(3).fill(Infinity);
     let maxArray = new Array(3).fill(-Infinity);

     for (let i = 0; i < bucket.length; i++) {
         let idx = bucket[i];
         minArray[0] = Math.min(minArray[0], pixels[idx]);
         minArray[1] = Math.min(minArray[1], pixels[idx + 1]);
         minArray[2] = Math.min(minArray[2], pixels[idx + 2]);
         maxArray[0] = Math.max(maxArray[0], pixels[idx]);
         maxArray[1] = Math.max(maxArray[1], pixels[idx + 1]);
         maxArray[2] = Math.max(maxArray[2], pixels[idx + 2]);
     }

     let spaceSizes = [maxArray[0] - minArray[0], maxArray[1] - minArray[1], maxArray[2] - minArray[2]];
     return spaceSizes.indexOf(Math.max(...spaceSizes));
 }

 function getMeanColor(pixels, bucket) {
     let color = new Array(4).fill(0);

     for (let i = 0; i < bucket.length; i++) {
         let idx = bucket[i];
         color[0] += pixels[idx];
         color[1] += pixels[idx + 1];
         color[2] += pixels[idx + 2];
         color[3] += pixels[idx + 3];
     }

     return color.map((x) => x / bucket.length);
 }