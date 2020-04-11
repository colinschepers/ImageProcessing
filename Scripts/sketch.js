var imagePixels;
var logger;

function setup() {
    frameRate(10);
    createCanvas(1024, 768);
    background(255);
    pixelDensity(1);
    initDropArea();
    initMenu();
}

function draw() {
    //draw
}

function reset() {
    imagePixels.forEach((v, i, arr) => pixels[i] = v);
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
    loadImage('Images/cats.jpg', img => {
        image(img, 0, 0, width, height);
        loadPixels();
        imagePixels = pixels.slice();

        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(42);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("Drag your image file here...", width / 2, height / 2);
    });

    body = select('body')
    body.drop(gotFile);
}

function initMenu() {
    const itemHeight = 30;
    const itemCount = 4;
    const itemWidth = width / itemCount;

    button = createButton('Reset');
    button.position(itemWidth * 0, height);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(reset);

    button = createButton('Mosaic');
    button.position(itemWidth * 1, height);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => {
        blur(5, 0.01);
        applyNearestNeighborInterpolation(width / 10, height / 10);
        emboss();
    });

    button = createButton('Nearest Neighbor Interpolation');
    button.position(itemWidth * 2, height);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => applyNearestNeighborInterpolation(width / 15, height / 15));

    button = createButton('Median Cut Color Quantization');
    button.position(itemWidth * 3, height);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => applyMedianCutColorQuantization(32));

    button = createButton('Sharpen');
    button.position(itemWidth * 0, height + itemHeight);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => sharpen());

    button = createButton('Blur');
    button.position(itemWidth * 1, height + itemHeight);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => blur(5, 0.01));

    button = createButton('Detect edges');
    button.position(itemWidth * 2, height + itemHeight);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => detectEdges());

    button = createButton('Emboss');
    button.position(itemWidth * 3, height + itemHeight);
    button.class('menu-item menu-item-checked');
    button.style('height', itemHeight + 'px');
    button.style('width', itemWidth + 'px');
    button.mousePressed(() => emboss());
}