const DEFAULT_COLOR = '#aaaaaa';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.getElementById('grid');

function setGrid(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const div = document.createElement("div");
            div.addEventListener('mouseover', updateColor)
            grid.appendChild(div);
        }
    }
}

function updateColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    }
}