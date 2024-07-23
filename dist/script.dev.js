"use strict";

// Select the calculator screen and all buttons
var screen = document.querySelector('.calculator-screen');
var buttons = document.querySelectorAll('button'); // Variable to store the current input

var currentInput = '';
var shouldResetScreen = false; // Function to update the screen

function updateScreen() {
  screen.value = currentInput;
} // Function to handle button clicks


buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    var value = button.value; // Handle all-clear button

    if (value === 'all-clear') {
      currentInput = '';
      shouldResetScreen = false;
      updateScreen();
      return;
    } // Handle operator buttons


    if (button.classList.contains('operator')) {
      if (currentInput !== '' && !shouldResetScreen) {
        currentInput += " ".concat(value, " ");
        updateScreen();
      }

      return;
    } // Handle equal-sign button


    if (value === '=') {
      if (currentInput.includes(' ')) {
        var result = evaluateExpression(currentInput);
        currentInput = result.toString();
        shouldResetScreen = true;
        updateScreen();
      }

      return;
    } // Handle number and dot buttons


    if (shouldResetScreen) {
      currentInput = value;
      shouldResetScreen = false;
    } else {
      currentInput += value;
    }

    updateScreen();
  });
}); // Function to evaluate the expression

function evaluateExpression(expression) {
  try {
    // Use Function constructor to evaluate the expression
    return new Function('return ' + expression)();
  } catch (error) {
    return 'Error';
  }
}
//# sourceMappingURL=script.dev.js.map
