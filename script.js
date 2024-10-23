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
    return a / b;
}

const opMap = new Map([['+', add], ['-', subtract], ['*', multiply], ['/', divide]]);
let operatorA, operatorB;

function operate(operatorA, operatorB, operationButton) {
    const operation = opMap.get(operationButton);
    return operation(operatorA, operatorB);
}
const DEFAULT_DISPLAY = '0123456789';
const topDisplay = document.getElementById('topdisplay');
const bottomDisplay = document.getElementById('bottomdisplay');

function clear(){
    topDisplay.innerHTML = ""
    bottomDisplay.innerText = DEFAULT_DISPLAY;
    display.style.color = "rgb(150, 147, 147)";

}

clear();