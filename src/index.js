document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".user-Input");
  let currentInput = "0"; // To store the input being typed
  let firstOperand = ""; // Stores the first number
  let operator = ""; // Stores the chosen operator
  let secondOperand = ""; // Stores the second number

  // Update the display with the current input
  function updateDisplay(value) {
    display.textContent = value;
  }

  // Handle number button clicks
  function handleNumber(number) {
    if (operator) {
      secondOperand += number; // Add numbers to the second operand
      updateDisplay(secondOperand);
    } else {
      if (currentInput === "0") {
        currentInput = number; // Replace the initial zero with a number
      } else {
        currentInput += number; // Add numbers to the current input
      }
      updateDisplay(currentInput);
    }
  }

  // Handle operator button clicks (+, -, x, ÷)
  function handleOperator(op) {
    if (!currentInput) return;
    firstOperand = currentInput; // Save the first number
    operator = op; // Save the chosen operator
    currentInput = ""; // Clear the input for the second number
  }

  // Perform calculation when "=" is clicked
  function calculate() {
    let result;
    if (!firstOperand || !secondOperand || !operator) return;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    // Perform the operation
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "÷":
        result = num1 / num2;
        break;
      default:
        return;
    }

    updateDisplay(result);
    currentInput = result.toString();
    firstOperand = secondOperand = operator = ""; // Reset for next calculation
  }

  // Clear display (AC button)
  function clearDisplay() {
    currentInput = "0";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    updateDisplay(currentInput);
  }

  // Delete the last character (DEL button)
  function deleteLast() {
    currentInput = currentInput.slice(0, -1) || "0"; // Remove last character
    updateDisplay(currentInput);
  }

  // Add event listeners to number buttons
  document
    .querySelectorAll(".number")
    .forEach((button) =>
      button.addEventListener("click", () => handleNumber(button.textContent))
    );

  // Add event listeners to operator buttons
  document.querySelectorAll(".operation").forEach((button) => {
    if (button.textContent === "AC") {
      button.addEventListener("click", clearDisplay);
    } else if (button.textContent === "DEL") {
      button.addEventListener("click", deleteLast);
    } else {
      button.addEventListener("click", () =>
        handleOperator(
          button.textContent === "x"
            ? "*"
            : button.textContent === "÷"
            ? "/"
            : button.textContent
        )
      );
    }
  });

  // Add event listener for the "=" button
  document.querySelector(".equal").addEventListener("click", calculate);
});
