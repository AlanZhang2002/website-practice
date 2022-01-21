const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");
let num1 = "", num2 = "", operator = null;
let ans = "0", decimal = false;
initCalculator();

function initCalculator() {
    const main = buttons.firstElementChild;
    for (let i = 1; i <= 9; i++) {
        main.appendChild(setButton(String(i), String(i)));
    }
    main.appendChild(setButton("AC", "clear"));
    main.appendChild(setButton("0", "0"));
    main.appendChild(setButton(".", "."));

    const operators = buttons.lastElementChild;
    operators.appendChild(setButton("+", "add"));
    operators.appendChild(setButton("-", "subtract"));
    operators.appendChild(setButton("x", "multiply"));
    operators.appendChild(setButton("/", "divide"));
    operators.appendChild(setButton("=", "equals"));
    updateDisplay(ans);
}

function setButton(textContent, input) {
    const button = document.createElement("button");
    button.textContent = textContent;
    button.addEventListener("click", () => {
        addInput(input);
    });
    return button;
}

function addInput(input) {
    if (input === ".") {
        if (decimal) return;
        decimal = true;
    }
    if (input === "clear") {
        operator = null;
        num1 = "";
        num2 = "";
        ans = "0";
        decimal = false;
        updateDisplay(ans);
    } else if (operator === null) { // num1 not set
        if (input.length === 1) { // input number
            if (num1.length === 8) { // stop adding once display is filled
                return;
            }
            num1 += input;
            updateDisplay(num1);
        } else { // operator
            if (num1.length === 0) {
                num1 = ans;
            }
            operator = input;
        }
    } else { // num1 is set
        if (input.length === 1) { // input number
            if (num2.length === 8) {
                return;
            }
            num2 += input;
            updateDisplay(num2);
        } else { // operator
            if (num2.length === 0) {
                // error
                updateDisplay("ERROR");
            } else {
                ans = operate(operator, num1, num2);
                updateDisplay(round(ans.toString()));
            }
            if (input != "equals") {
                operator = input;
                num1 = ans;
                num2 = "";
            } else {
                operator = null;
                num1 = "";
                num2 = "";
            }
        }
    }


}

function updateDisplay(num) {
    display.textContent = num;
}

function operate(operator, num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return "Error";
    }
    if (operator === "add") {
        return add(num1, num2);
    } else if (operator === "subtract") {
        return subtract(num1, num2);
    } else if (operator === "multiply") {
        return multiply(num1, num2);
    } else if (operator === "divide") {
        return divide(num1, num2);
    }
    return "Error";
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return (num2 == 0) ? "Error" : Number(num1) / Number(num2);
}

function round(numString) { // requires parameter to be string // TODO: fix for values past around 10 decimal places or 10^20, I think they get auto rounded past a certain point.
    if (numString.length > 8) {
        // either cut off decimals or use scientific notation
        if (Number(numString) >= 10000000) {
            return Number(numString).toExponential(5);
        } else {
            return numString.substring(0, 8);
        }
    }
    return numString;
}