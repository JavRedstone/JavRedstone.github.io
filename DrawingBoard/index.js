const ctx = drawBoard.getContext("2d");

const sideBarWidth = 75;

const paints = ["White", "Red", "Blue", "Green", "Yellow", "Magenta", "Cyan", "Eraser", "Clear"];
const paintHeight = 100 / paints.length;
const paintLen = 75;
const selectLen = 50;
const lineWidth = 10;

const loadElements = function () {
    drawBoard.width = window.innerWidth - sideBarWidth;
    drawBoard.height = window.innerHeight;
    for (let i = 0; i < paints.length; i++) {
        let paint = document.createElement("paint");
        paint.style.height = `${paintHeight}%`;
        paint.style.top = `${i * paintHeight}%`;
        paint.onclick = function () { selectPaint(paint, paints[i]) };
        sideBar.append(paint);

        let paintColor = document.createElement("paintColor");
        if (paints[i] == "Eraser" || paints[i] == "Clear") {
            paintColor.innerHTML = paints[i];
        }
        else {
            paintColor.style.backgroundColor = paints[i];
        }
        paint.append(paintColor);
    }
};

let colorSelected = false;
let erasing = false;
let drawing = false;
const selectPaint = function (paint, color) {
    for (let i = 0; i < sideBar.children.length; i++) {
        let child = sideBar.children[i];
        if (child != paint && child.style.width == `${selectLen}px`) {
            child.style.width = `${paintLen}px`;
        }
    }
    if (color == "Clear") {
        ctx.clearRect(0, 0, drawBoard.width, drawBoard.height);
        colorSelected = false;
    }
    else {
        if (color == "Eraser") {
            colorSelected = false;
            erasing = true;
        }
        else {
            ctx.strokeStyle = color;
            colorSelected = true;
        }
        paint.style.width = `${selectLen}px`;
    }
    drawing = false;
};

const draw = function (cX, cY) {
    if (drawing) {
        let x = cX - sideBarWidth;
        let y = cY;
        if (colorSelected) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        else if (erasing) {
            ctx.clearRect(x - 10, y - 10, 20, 20);
        }
    }
};

drawBoard.addEventListener("mousemove", function (event) {
    draw(event.clientX, event.clientY);
});
drawBoard.addEventListener("touchmove", function (event) {
    var touch = event.touches[0];
    draw(touch.clientX, touch.clientY);
}, false);
drawBoard.addEventListener("mousedown", function () {
    ctx.beginPath();
    ctx.lineWidth = 1;
    drawing = true;
});
drawBoard.addEventListener("touchstart", function (event) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    drawing = true;
}, false);
drawBoard.addEventListener("mouseup", function () {
    drawing = false;
});
drawBoard.addEventListener("touchend", function (event) {
    drawing = false;
}, false);

loadElements();