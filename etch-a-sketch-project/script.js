const DEFAULT_COLOR = '#aaaaaa';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.getElementById("grid");
setGrid(currentSize);

function setGrid(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.id = "row";
        row.style.justifyContent = "center";
        row.style.alignItems = "center";
        for (let j = 0; j < size; j++) {
            const div = document.createElement("div");
            div.addEventListener('mouseover', updateColor);
            div.style.border = "solid black 2px";
            div.style.width = "50px";
            div.style.height = "50px";
            row.appendChild(div);
        }
        grid.appendChild(row);
    }
}

function updateColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    }
}