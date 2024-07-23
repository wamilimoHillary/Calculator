// Select the calculator screen and all buttons
const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');

// Variable to store the current input
let currentInput = '';
let shouldResetScreen = false;

// Function to update the screen
function updateScreen() {
    screen.value = currentInput;
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        // Handle all-clear button
        if (value === 'all-clear') {
            currentInput = '';
            shouldResetScreen = false;
            updateScreen();
            return;
        }

        // Handle operator buttons
        if (button.classList.contains('operator')) {
            if (currentInput !== '' && !shouldResetScreen) {
                currentInput += ` ${value} `;
                updateScreen();
            }
            return;
        }

        // Handle equal-sign button
        if (value === '=') {
            if (currentInput.includes(' ')) {
                const result = evaluateExpression(currentInput);
                currentInput = result.toString();
                shouldResetScreen = true;
                updateScreen();
            }
            return;
        }

        // Handle number and dot buttons
        if (shouldResetScreen) {
            currentInput = value;
            shouldResetScreen = false;
        } else {
            currentInput += value;
        }
        updateScreen();
    });
});

// Function to evaluate the expression
function evaluateExpression(expression) {
    try {
        // Use Function constructor to evaluate the expression
        return new Function('return ' + expression)();
    } catch (error) {
        return 'Error';
    }
}
