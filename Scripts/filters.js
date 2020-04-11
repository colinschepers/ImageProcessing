const KERNEL_IDENTITY = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];

const KERNEL_SHARPEN = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
];

const KERNEL_BLUR = [
    [1 / 16, 2 / 16, 1 / 16],
    [2 / 16, 4 / 16, 2 / 16],
    [1 / 16, 2 / 16, 1 / 16]
]

const KERNEL_EDGE_DETECT = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
]

const KERNEL_EMBOSS = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
]

function applyFilter(kernel) {
    let newPixels = new Array(pixels.length).fill(0);

    let dy = (kernel.length - 1) / 2;
    let dx = (kernel[0].length - 1) / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var idx = (y * width + x) * 4;
            for (let j = 0; j < kernel.length; j++) {
                for (let i = 0; i < kernel[j].length; i++) {
                    let x2 = (x - dx + i + width) % width;
                    let y2 = (y - dy + j + height) % height;
                    let idx2 = (y2 * width + x2) * 4;
                    newPixels[idx] += kernel[j][i] * pixels[idx2];
                    newPixels[idx + 1] += kernel[j][i] * pixels[idx2 + 1];
                    newPixels[idx + 2] += kernel[j][i] * pixels[idx2 + 2];
                    newPixels[idx + 3] = pixels[idx2 + 3];
                }
            }
        }
    }

    newPixels.forEach((v, i, arr) => pixels[i] = v);
    updatePixels();
}