let operatorButtons = document.getElementsByClassName("operator");
let numberButtons = document.getElementsByClassName("number");
let output = document.getElementById("output-value");
let history = document.getElementById("history-value");
let outputValue = "";
let historyValue = "";
let equalState = 0;
//#region functions

function clearHistory() {
  history.innerHTML = "";
}

function clearOutput() {
  output.innerHTML = "";
}

function setHistory(historyValue) {
  history.innerHTML = historyValue;
}

function setOutput(outputValue) {
  if (outputValue.length > 1 && outputValue[0] == "0")
    outputValue = outputValue.slice(1);
  output.innerHTML = outputValue;
}

//#endregion

//#region EventListeners
function concatOutput() {
  if (historyValue == "" && this.id == "0") return;
  if (equalState == 1 && this.className == "number") {
    equalState = 0;
    clearAll();
    outputValue = "";
  } else if (equalState == 1 && this.className == "operator") {
    equalState = 0;
    historyValue = outputValue + this.innerHTML.trim();
    outputValue = "";
    setHistory(historyValue);
    setOutput(outputValue);

    return;
  }
  historyValue += this.innerHTML.trim();
  outputValue += this.innerHTML.trim();

  setOutput(outputValue);
  setHistory(historyValue);
}

function clearEntry() {
  historyValue = historyValue.slice(
    0,
    historyValue.length - outputValue.length
  );
  outputValue = "";
  setOutput("0");
  setHistory(historyValue);
}

function clearAll() {
  outputValue = "0";
  historyValue = "";
  setOutput(outputValue);
  setHistory(historyValue);
}

function validateAndConvertInput() {
  let historyToList = [];
  let i = 0;
  let temp = "";
  while (i < historyValue.length) {
    if (isNaN(historyValue[i]) && historyValue[i] != ".") {
      if (temp == "" && historyValue[i - 1] != "%") {
        alert("Invalid input. Clearing display!");
        clearAll();
        return;
      }
      if (historyValue[i - 1] != "%") historyToList.push(temp);

      historyToList.push(historyValue[i]);
      temp = "";
    } else {
      temp += historyValue[i];
    }
    i++;
  }
  if (temp == "" && historyValue[historyValue.length - 1] != "%") {
    alert("Invalid input. Clearing display!");
    clearAll();
    return;
  }
  if (temp != "") historyToList.push(temp);
  return historyToList;
}

function equals() {
  if (equalState == 0) equalState = 1;
  let input = validateAndConvertInput();
  console.log(input);
  let i = 0;
  while (i < input.length) {
    if (input[i] == "×") {
      temp = input[i - 1] * input[i + 1];
      input.splice(i - 1, 3, temp);
      i = 0;
    } else if (input[i] == "÷") {
      temp = input[i - 1] / input[i + 1];
      input.splice(i - 1, 3, temp);
      i = 0;
    } else if (input[i] == "%") {
      temp = input[i - 1] / 100;
      input.splice(i - 1, 2, temp);
      i = 0;
    } else {
      i += 1;
    }
  }
  i = 0;
  while (i < input.length) {
    if (input[i] == "+") {
      temp = parseInt(input[i - 1]) + parseInt(input[i + 1]);
      input.splice(i - 1, 3, temp);
      i = 0;
    } else if (input[i] == "-") {
      temp = input[i - 1] - input[i + 1];
      input.splice(i - 1, 3, temp);
      i = 0;
    } else {
      i += 1;
    }
  }
  if (input.length > 1) {
    alert("Invalid input. Clearing display!");
    clearAll();
    return;
  }
  outputValue = input[0];
  setOutput(input[0]);
}

//#endregion
//#region
for (i = 0; i < numberButtons.length; ++i) {
  if (numberButtons[i].id == "backspace") {
    numberButtons[i].addEventListener("click", clearEntry);

    continue;
  }
  if (numberButtons[i].id == "clear") {
    numberButtons[i].addEventListener("click", clearAll);
    continue;
  }
  numberButtons[i].addEventListener("click", concatOutput);
}

for (i = 0; i < operatorButtons.length; ++i) {
  if (operatorButtons[i].id == "=") {
    operatorButtons[i].addEventListener("click", equals);
  } else {
    operatorButtons[i].addEventListener("click", concatOutput);
    operatorButtons[i].addEventListener("click", setOutput(""));
  }
}
setOutput("0");
