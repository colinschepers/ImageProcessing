 function applyMedianCutColorQuantization(colorPalette) {
     let initialBucket = [];
     for (let idx = 0; idx < pixels.length; idx += 4) {
         initialBucket.push(idx);
     }

     let buckets = [initialBucket];
     while (buckets.length < colorPalette) {
         let bucket = buckets.shift();
         let spaceIdx = getColorSpaceWithMaxRange(bucket);

         bucket.sort(function (idx1, idx2) {
             return pixels[idx1 + spaceIdx] - pixels[idx2 + spaceIdx]
         });

         let medianIdx = parseInt((bucket.length + 1) / 2)
         buckets.push(bucket.slice(0, medianIdx));
         buckets.push(bucket.slice(medianIdx, bucket.length));
     }

     for (let b = 0; b < buckets.length; b++) {
         let meanColor = getMeanColor(buckets[b]);
         for (let i = 0; i < buckets[b].length; i++) {
             let idx = buckets[b][i];
             pixels[idx] = meanColor[0];
             pixels[idx + 1] = meanColor[1];
             pixels[idx + 2] = meanColor[2];
             pixels[idx + 3] = meanColor[3];
         }
     }

     updatePixels();
 }

 function getColorSpaceWithMaxRange(bucket) {
     // Math.max and Math.min throws Call stack exception for big arrays
     let mins = new Array(3).fill(-Number.MAX_VALUE);
     let maxs = new Array(3).fill(Number.MAX_VALUE);

     for (let i = 0; i < bucket.length; i++) {
         let idx = bucket[i];
         mins[0] = Math.min(mins[0], pixels[idx]);
         mins[1] = Math.min(mins[1], pixels[idx + 1]);
         mins[2] = Math.min(mins[2], pixels[idx + 2]);
         maxs[0] = Math.max(maxs[0], pixels[idx]);
         maxs[1] = Math.max(maxs[1], pixels[idx + 1]);
         maxs[2] = Math.max(maxs[2], pixels[idx + 2]);
     }

     let spaceSizes = [maxs[0] - mins[0], maxs[1] - mins[1], maxs[2] - mins[2]];
     return spaceSizes.indexOf(Math.max(...spaceSizes));
 }

 function getMeanColor(bucket) {
     let color = new Array(4).fill(0);

     for (let i = 0; i < bucket.length; i++) {
         let idx = bucket[i];
         color[0] += pixels[idx] / bucket.length;
         color[1] += pixels[idx + 1] / bucket.length;
         color[2] += pixels[idx + 2] / bucket.length;
         color[3] += pixels[idx + 3] / bucket.length;
     }

     return color;
 }