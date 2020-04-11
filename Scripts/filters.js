const KERNEL_IDENTITY = [0, 0, 0, 0, 1, 0, 0, 0, 0];
const KERNEL_SHARPEN = [0, -1, 0, -1, 5, -1, 0, -1, 0];
const KERNEL_EDGE_DETECT = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
const KERNEL_EMBOSS = [-2, -1, 0, -1, 1, 1, 0, 1, 2];

function identity() {
    applyFilter(KERNEL_IDENTITY);
}

function sharpen() {
    applyFilter(KERNEL_SHARPEN);
}

function blur(kernelRadius, sigma) {
    let gaussianBlurKernel = []
    let deltaR = parseInt((kernelRadius - 1) / 2);
    for (let y = -deltaR; y <= deltaR; y++) {
        for (let x = -deltaR; x <= deltaR; x++) {
            gaussianBlurKernel.push(1 / (2 * Math.PI * sigma * sigma) * Math.exp(-(x * x + y * y) / 2 * sigma * sigma));
        }
    }
    var sum = gaussianBlurKernel.reduce((a, b) => a + b, 0);
    gaussianBlurKernel = gaussianBlurKernel.map(x => x / sum)

    applyFilter(gaussianBlurKernel);
}

function detectEdges() {
    applyFilter(KERNEL_EDGE_DETECT);
}

function emboss() {
    applyFilter(KERNEL_EMBOSS);
}

function applyFilter(kernel) {
    let deltaIdx = [];
    let deltaR = parseInt((Math.sqrt(kernel.length) - 1) / 2);
    for (let y = -deltaR; y <= deltaR; y++) {
        for (let x = -deltaR; x <= deltaR; x++) {
            deltaIdx.push((y * width + x) * 4);
        }
    }

    let newPixels = new Array(pixels.length).fill(0);

    for (let i = 0; i < pixels.length; i += 4) {
        for (let k = 0; k < kernel.length; k++) {
            let j = i + deltaIdx[k];
            newPixels[i] += kernel[k] * pixels[j];
            newPixels[i + 1] += kernel[k] * pixels[j + 1];
            newPixels[i + 2] += kernel[k] * pixels[j + 2];
            newPixels[i + 3] = pixels[i + 3];
        }
    }

    newPixels.forEach((v, i, arr) => pixels[i] = v);
    updatePixels();
}