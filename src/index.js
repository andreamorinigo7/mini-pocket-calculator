document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "0";
  let firstOperand = null;
  let operator = null;
  let awaitingSecondOperand = false;

  // Update the display with the current input
  function updateDisplay() {
    display.textContent = currentInput;
  }

  // Clear the display and reset everything
  function clearDisplay() {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    awaitingSecondOperand = false;
    updateDisplay();
  }

  // Delete the last character from the current input
  function deleteLast() {
    currentInput = currentInput.slice(0, -1) || "0"; // If input is empty, reset to "0"
    updateDisplay();
  }

  // Input number
  function inputNumber(number) {
    if (awaitingSecondOperand) {
      currentInput = number; // Start new number after an operator
      awaitingSecondOperand = false;
    } else {
      currentInput = currentInput === "0" ? number : currentInput + number;
    }
    updateDisplay();
  }

  // Handle operator input
  function inputOperator(nextOperator) {
    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
    } else if (operator) {
      const result = performCalculation(
        firstOperand,
        parseFloat(currentInput),
        operator
      );
      currentInput = String(result);
      firstOperand = result; // Update firstOperand for further calculations
    }

    // Update the display to show the expression
    currentInput += ` ${nextOperator} `;
    operator = nextOperator;
    awaitingSecondOperand = true;
    updateDisplay();
  }

  // Perform the calculation
  function performCalculation(first, second, operator) {
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      default:
        return second;
    }
  }

  // Set up button functions
  document.getElementById("btn-0").onclick = () => inputNumber("0");
  document.getElementById("btn-1").onclick = () => inputNumber("1");
  document.getElementById("btn-2").onclick = () => inputNumber("2");
  document.getElementById("btn-3").onclick = () => inputNumber("3");
  document.getElementById("btn-4").onclick = () => inputNumber("4");
  document.getElementById("btn-5").onclick = () => inputNumber("5");
  document.getElementById("btn-6").onclick = () => inputNumber("6");
  document.getElementById("btn-7").onclick = () => inputNumber("7");
  document.getElementById("btn-8").onclick = () => inputNumber("8");
  document.getElementById("btn-9").onclick = () => inputNumber("9");

  document.getElementById("btn-plus").onclick = () => inputOperator("+");
  document.getElementById("btn-minus").onclick = () => inputOperator("-");
  document.getElementById("btn-multiply").onclick = () => inputOperator("*");
  document.getElementById("btn-divide").onclick = () => inputOperator("/");

  document.getElementById("btn-equal").onclick = () => {
    if (operator) {
      const result = performCalculation(
        firstOperand,
        parseFloat(currentInput.split(" ").pop()),
        operator
      );
      currentInput = String(result);
      firstOperand = null; // Reset for the next calculation
      operator = null;
      updateDisplay(); // Show the result
    }
  };

  document.getElementById("btn-decimal").onclick = () => {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay();
    }
  };

  document.getElementById("btn-clear").onclick = clearDisplay;
  document.getElementById("btn-delete").onclick = deleteLast;

  // Initialize display
  updateDisplay();
});
