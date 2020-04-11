const topMenuHeight = 30;
const bottomMenuHeight = 30;

var imagePixels;
var logger;

function setup() {
    frameRate(10);
    createCanvas(800, 600);
    background(255);
    pixelDensity(1);
    initTopMenu();
    initDropArea();
    initBottomMenu();
}

function draw() {
    //draw
}

function process(method) {
    if (!imagePixels) {
        return;
    }
    newPixels = method();
    newPixels.forEach((v, i, arr) => pixels[i] = v);
    updatePixels();
}

function gotFile(file) {
    var img = createImg(file.data, '', 'anonymous', () => {
        image(img, 0, 0, width, height);
        loadPixels();
        imagePixels = pixels.slice();
    }).hide();
}

function initDropArea() {
    fill(50);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Drag your image file here...", width / 2, height / 2);

    body = select('body')
    body.drop(gotFile);
}

function initTopMenu() {
    const itemCount = 2;
    const itemWidth = width / itemCount;

    button = createButton('Reset');
    button.position(itemWidth * 0, 0);
    button.class('menu-item menu-item-checked');
    button.style('height', topMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => process(() => applyFilter(imagePixels, KERNEL_IDENTITY)));

    button = createButton('Pixelize');
    button.position(itemWidth * 1, 0);
    button.class('menu-item menu-item-checked');
    button.style('height', topMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => {
        process(() => applyNearestNeighborInterpolation(pixels, width / 20, height / 20));
    });
}

function initBottomMenu() {
    const itemCount = 5;
    const itemWidth = width / itemCount;

    button = createButton('Sharpen');
    button.position(itemWidth * 0, height);
    button.class('menu-item menu-item-checked');
    button.style('height', bottomMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => process(() => applyFilter(pixels, KERNEL_SHARPEN)));

    button = createButton('Blur');
    button.position(itemWidth * 1, height);
    button.class('menu-item menu-item-checked');
    button.style('height', bottomMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => process(() => applyFilter(pixels, KERNEL_BLUR)));

    button = createButton('Detect edges');
    button.position(itemWidth * 2, height);
    button.class('menu-item menu-item-checked');
    button.style('height', bottomMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => process(() => applyFilter(pixels, KERNEL_EDGE_DETECT)));

    button = createButton('Emboss');
    button.position(itemWidth * 3, height);
    button.class('menu-item menu-item-checked');
    button.style('height', bottomMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => process(() => applyFilter(pixels, KERNEL_EMBOSS)));

    button = createButton('Median Cut');
    button.position(itemWidth * 4, height);
    button.class('menu-item menu-item-checked');
    button.style('height', bottomMenuHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => process(() => applyMedianCutColorQuantization(pixels, 64)));
}