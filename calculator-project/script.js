const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");
const MAX_DIGITS = 8;
let num1 = "", num2 = "", operator = null, ans = "0", decimal = false, negative = false, finished = false, mem = 0;
initCalculator();

function initCalculator() {
    document.addEventListener('keypress', addKeyInput)

    const main = buttons.firstElementChild;
    main.appendChild(setButton("+/-", "negative", "operator"));
    main.appendChild(setButton("√", "sqrt", "operator"));
    main.appendChild(setButton("%", "modulo", "operator"));
    // TODO: implement memory (refer to TI-108 memory on wikipedia)
    // main.appendChild(setButton("MRC", "memclr", "operator"));
    // main.appendChild(setButton("M-", "memsub", "operator"));
    // main.appendChild(setButton("M+", "memadd", "operator"));
    for (let i = 1; i <= 9; i++) {
        main.appendChild(setButton(String(i), String(i), "number"));
    }
    main.appendChild(setButton("AC", "clear", "operator"));
    main.appendChild(setButton("0", "0", "number"));
    main.appendChild(setButton(".", ".", "number"));

    const operators = buttons.lastElementChild;
    operators.appendChild(setButton("÷", "divide", "operator"));
    operators.appendChild(setButton("×", "multiply", "operator"));
    operators.appendChild(setButton("–", "subtract", "operator"));
    operators.appendChild(setButton("+", "add", "operator"));
    operators.appendChild(setButton("=", "equals", "operator"));
    updateDisplay(ans);
}

function setButton(textContent, input, className) {
    const button = document.createElement("button");
    button.className = className;
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
    if (input === "negative") {
        negative = !negative;
    }
    if (input !== "equals" && finished) { // not a repeat equals, so everything resets
        operator = null;
        num1 = "";
        num2 = "";
        ans = "0";
        decimal = false;
        negative = false;
    }
    if (input === "clear") {
        operator = null;
        num1 = "";
        num2 = "";
        ans = "0";
        decimal = false;
        negative = false;
        updateDisplay(ans);
    } else if (operator === null) { // num1 not set
        if (input === "negative") {
            if (negative) {
                num1 = "-" + num1;
            } else {
                num1 = num1.substring(1, num1.length)
            }
            updateDisplay(num1);
        } else if (input.length === 1) { // input number
            if (String(Math.abs(Number(num1))).length === MAX_DIGITS) { // stop adding once display is filled
                return;
            }
            num1 += input;
            updateDisplay(num1);
        } else { // operator
            if (num1.length === 0) {
                num1 = ans;
            }
            operator = input;
            negative = false;
            decimal = false;
        }
    } else { // num1 is set
        if (input === "negative") {
            if (negative) {
                num2 = "-" + num2;
            } else {
                num2 = num2.substring(1, num2.length)
            }
            updateDisplay(num2);
        } else if (input.length === 1) { // input number
            if (String(Math.abs(Number(num2))).length === MAX_DIGITS) {
                return;
            }
            num2 += input;
            updateDisplay(num2);
        } else { // operator
            if (num2.length === 0) {
                operator = input;
                return;
            } else {
                ans = operate(operator, num1, num2);
                // updateDisplay(ans.toString())
                updateDisplay(round(ans.toString()));
            }
            if (input !== "equals") {
                operator = input;
                num1 = ans;
                num2 = "";
                negative = Number(num1) < 0;
            } else {
                num1 = ans;
                finished = true;
            }
        }
    }
}

function addKeyInput(e) { // TODO: implement keyboard controls
    console.log(e.keyCode);
}

function updateDisplay(num) {
    display.textContent = num;
}

function operate(operator, num1, num2) {
    if (isNaN(num1) || isNaN(num2)) { // theoretically should never happen
        console.log("isNaN")
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
    console.log("illegal operator")
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

function round(numString) { // requires parameter to be string
    if (Math.abs(Number(numString)) >= Math.pow(10, MAX_DIGITS) || Math.abs(Number(numString)) <= Math.pow(10, -7)) {
        // Number is already in exponential form, convert to use all digits available
        if (Math.abs(Number(numString)) >= Math.pow(10, 21) || Math.abs(Number(numString)) <= Math.pow(10, -7)) {
            return Number(numString).toExponential(MAX_DIGITS - String(Math.abs(Number(numString))).length - 1);
        }
        // Number not in exponential form, not a decimal
        if (Math.abs(Number(numString)) >= Math.pow(10, MAX_DIGITS)) {
            // if (Number(numString) < 0) { // negative
            //     return Number(numString).toExponential(MAX_DIGITS - String(String(Math.abs(Number(numString)) - 1).length).length - 4);
            // }
            return Number(numString).toExponential(MAX_DIGITS - String(String(Math.abs(Number(numString))).length).length - 4);
        }
        // Number not in exponential form, is a decimal
        return numString.substring(0, 8);
    }
    return numString;
}