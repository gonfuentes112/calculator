const DEFAULT_DISPLAY = "0";
const MAX_NUM = 9999999999999999;
const MIN_NUM = -999999999999999;
const OP_BUTTONS = ["+", "-", "*", "/"];
const display = document.getElementById("display");
const numpad = document.getElementById("numpad");
const operatorPad = document.getElementById('operatorpad');
const operands = [null, null];
let operatorButton = null, currentOperator = null, lastButton = null;
let clearForNextOperand = false;

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
    if (b === 0) {
        display.innerText = null;
        return;
    }
    return a / b;
}

const opMap = new Map([["+", add], ["-", subtract], ["*", multiply], ["/", divide]]);

function operate(operatorA, operatorB, operationButton) {
    const operation = opMap.get(operationButton);
    return operation(operatorA, operatorB);
}

function clear(){
    display.innerText = "0";
    operands[0] = null;
    operands[1] = null;
    clearForNextOperand = false;
};

function backspace() {
    if (!display.innerText || display.innerText.length === 1) {
        display.innerText = "0";
        return;
    }
    display.innerText = display.innerText.slice(0, -1);
    return;
}

function enterNumKey(event) {
    let numKey = event.target;
    if (event.type === 'keydown') {
        numKey.id = event.key;
    } else {

        if (!(numKey.classList.contains("numbutton"))) {
            return;
        }  
    }
  
    if (numKey.id === "clear") {
        clear();
        return;
    }
    if (numKey.id.toLowerCase() === "backspace") {
        backspace();
        return;
    }
    const currentText = display.innerText;
    if ((currentText.startsWith("0") && !currentText.includes(".")) ||
        clearForNextOperand){
        clearForNextOperand = false;
        display.innerText = "";
    }
    if (currentText.length < 16) {
        display.innerText += numKey.id;
        lastButton = numKey;
    }

}

numpad.addEventListener("click", enterNumKey);

display.innerText = DEFAULT_DISPLAY;

function enoughOperators() {
    return operands.every(operand => operand !== null) && currentOperator;
}

function formatResult(num) {
    if (num > MAX_NUM) {
        return MAX_NUM;
    }
    if (num < MIN_NUM) {
        return MIN_NUM;
    }
    if (!Number.isInteger(num)) {
        return parseFloat(num.toPrecision(8));
    }
}

function inputOperator(event) {
    const opKey = event.target;
    if (!(opKey.classList.contains("operator"))) {
        return;
    }
    operatorButton = opKey.id;

    if (lastButton.classList.contains("operator") && !enoughOperators()) {
        currentOperator = operatorButton;
        lastButton = opKey;
        return;
    }

    let displayedOperand = display.innerText;
    if (displayedOperand.startsWith("0") && !displayedOperand.includes(".")){
        displayedOperand = "0";
    }
    if (!operands[0]) {
        operands[0] = Number(displayedOperand);
    } else {
        operands[1] = Number(displayedOperand);
    }

    if (enoughOperators()) {
        const result = formatResult(operate(operands[0], operands[1], currentOperator));
        display.innerText = result;
        operands[0] = Number(result);
        operands[1] = null;
        clearForNextOperand = true;
        currentOperator = null;
        return;
    }
    if (operatorButton !== "=") {
        currentOperator = operatorButton;
    }
    lastButton = opKey;
    clearForNextOperand = true;
}

operatorPad.addEventListener('click', inputOperator);

function keyboardDelegate(event) {
    const pressedKey = event.key;
    if (opMap.has(pressedKey) || pressedKey === "Enter") {
        inputOperator(event);
        return;
    }
    if (pressedKey >= "0" && pressedKey <= "9" || pressedKey === "Backspace") {
        enterNumKey(event);
        return;
    }
}
document.addEventListener('keydown', keyboardDelegate);