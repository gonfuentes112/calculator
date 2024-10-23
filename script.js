const add = function(a, b) {
	return +a + +b;
};

const subtract = function(a, b) {
	return +a - +b;
};

const multiply = function(a, b) {
  return +a * +b;
};

const divide = function(a, b) {
    return +a / +b;
}

const opMap = new Map([["+", add], ["-", subtract], ["*", multiply], ["/", divide]]);

function operate(operatorA, operatorB, operationButton) {
    const operation = opMap.get(operationButton);
    return operation(operatorA, operatorB);
}
const DEFAULT_DISPLAY = "0";
const MAX_NUM = 9999999999999999;
const MIN_NUM = -999999999999999;
const OP_BUTTONS = ["+", "-", "*", "/"];
const display = document.getElementById("display");
const numpad = document.getElementById("numpad");
const operatorPad = document.getElementById('operatorpad');
const operands = ["", ""];
let currentOperandIndex = 0, operatorButton = "", currentOperator = "";

function clear(){
    display.innerText = "";
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
    const numKey = event.target;
    if (!(numKey.classList.contains("numbutton"))) {
        return;
    }    
    if (numKey.id === "clear") {
        clear();
        return;
    }
    if (numKey.id === "backspace") {
        backspace();
        return;
    }
    const currentText = display.innerText;
    if (currentText.startsWith("0") && !currentText.includes(".")){
        display.innerText = "";
    }
    if (currentText.length < 16) {
        display.innerText += numKey.id;
    }

}

numpad.addEventListener("click", enterNumKey);

display.innerText = DEFAULT_DISPLAY;

function enoughOperators() {
    return operands.every(operand => operand !== "") && operatorButton !== "";
}

function opButtonAlreadyDisplayed() {
    let alreadyDisplayed = false;
    OP_BUTTONS.forEach(button => {
        alreadyDisplayed ||= display.innerText.includes(button);
    })
    return alreadyDisplayed;
}

function inputOperator(event) {
    const opKey = event.target;
    if (!(opKey.classList.contains("operator"))) {
        return;
    }
    operatorButton = opKey.id;
    const displayedOperand = display.innerText;
    if (displayedOperand.startsWith("0") && !displayedOperand.includes(".")){
        displayedOperand = "0";
    }
    operands[currentOperandIndex] = displayedOperand;
    currentOperandIndex = (currentOperandIndex + 1) % operands.length;
    display.innerText += " " + displayedOperand;
    if (enoughOperators()) {
        const result = operate(operands[0], operands[1], operatorButton);
        display.innerText = result;
        operands[0] = result;
        operands[1] = "";
        currentOperandIndex = 1;
        return;
    }
    display.innerText += " " + operatorButton;
    operands[currentOperandIndex] = displayedOperand;
    if (operatorButton !== "=") {
        currentOperator = operatorButton;
    }
}

operatorPad.addEventListener('click', inputOperator);