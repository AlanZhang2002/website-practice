const DEFAULT_COLOR = '#aaaaaa';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let gradientPercent = 0;

const grid = document.getElementById("grid");
const options = document.getElementById("options");
setOptions();
setGrid();

function setOptions() {
    const resetButton = document.createElement("button");
    resetButton.addEventListener("click", resetGrid);
    resetButton.textContent = "Clear";

    const colorButton = document.createElement("button");
    colorButton.textContent = "Normal";
    colorButton.addEventListener("click", function () {
        currentMode = 'color';
        currentColor = DEFAULT_COLOR;
    });

    const rgbButton = document.createElement("button");
    rgbButton.textContent = "Random";
    rgbButton.addEventListener("click", function () {
        currentMode = 'random';
    });

    const gradientButton = document.createElement("button");
    gradientButton.textContent = "Gradient";
    gradientButton.addEventListener("click", function () {
        currentMode = 'gradient';
        gradientPercent = 0;
    });

    options.appendChild(resetButton);
    options.appendChild(colorButton);
    options.appendChild(rgbButton);
    options.appendChild(gradientButton);
}

function setGrid() {
    for (let i = 0; i < currentSize; i++) {
        const row = document.createElement("div");
        row.id = "row";
        row.style.width = "800px";
        row.style.height = String(800/currentSize) + "px";
        for (let j = 0; j < currentSize; j++) {
            const div = document.createElement("div");
            div.id = "square";
            div.addEventListener('mouseover', updateColor);
            div.style.outline = "solid black 2px";
            div.style.width = div.style.height = String(800/currentSize) + "px";
            // div.style.height = "50px";
            div.style.float = "left";
            div.style.margin = "0px";
            div.style.backgroundColor = "#ffffff";
            row.appendChild(div);
        }
        grid.appendChild(row);
    }
}

function updateColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'random') {
        e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    } else if (currentMode === 'gradient') { 
        e.target.style.backgroundColor = "RGBA(0, 0, 0, " + String(gradientPercent) + ")";
        gradientPercent += 0.1;
    }
}
function resetGrid() {
    const rows = document.querySelectorAll("#row");
    for (const row of rows) {
        grid.removeChild(row);
    }

    let newSize = prompt("How many squares would you like on each side? (Max 100)");
    while (isNaN(newSize) || Number(newSize) > 100 || Number(newSize) < 1) {
        newSize = prompt("Please enter a size between 1 and 100");
    }
    currentSize = Number(newSize);
    setGrid(currentSize)
}