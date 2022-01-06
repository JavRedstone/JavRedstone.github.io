let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const keepShape = function () {
    CPSButton.style.width = "30%";
    CPSButton.style.height = `${(WIDTH / HEIGHT) * 30}%`;
    CPSButton.style.left = "35%";
    CPSButton.style.top = `${50 - (WIDTH / HEIGHT) * 15}%`
};

let started = false;
let recording = null;

let clickAmount = 0;
const clickTotal = 100;

const startClick = function () {
    CPSButton.innerHTML = `${clickAmount}/${clickTotal}`;
    if (!started) {
        started = true;
    }
    else {
        if (clickAmount > 0 && recording == null) {
            recording = Date.now();;
        }
        if (clickAmount < clickTotal) {
            clickAmount++;
        }
        else {
            CPSButton.innerHTML = "Again";
            CPSTracker.innerHTML = `${~~(clickAmount * 1000 / (Date.now() - recording))} CPS`;
            started = false;
            clickAmount = 0;
        }
    }
};

setInterval(keepShape);