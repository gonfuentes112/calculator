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

const opMap = new Map([["+", add], ["-", subtract], ["*", multiply], ["/", divide]]);
let operatorA, operatorB;

function operate(operatorA, operatorB, operationButton) {
    const operation = opMap.get(operationButton);
    return operation(operatorA, operatorB);
}
const DEFAULT_DISPLAY = "0123456789";
const MAX_NUM = 9999999999999999;
const MIN_NUM = -999999999999999;
const topDisplay = document.getElementById("topdisplay");
const bottomDisplay = document.getElementById("bottomdisplay");
const numpad = document.getElementById("numpad");

function clear(){
    topDisplay.innerHTML = "";
    bottomDisplay.innerText = "";

};

function backspace() {
    if (bottomDisplay.innerText) {
        bottomDisplay.innerText = bottomDisplay.innerText.slice(0, -1);
    }
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
    const currentText = bottomDisplay.innerText;
    if (currentText.startsWith("0")){
        bottomDisplay.innerText = "";
    }
    if (currentText.length < 16) {
        bottomDisplay.innerText = bottomDisplay.innerText + numKey.id;
    }

}

numpad.addEventListener("click", enterNumKey);

bottomDisplay.innerText = DEFAULT_DISPLAY;