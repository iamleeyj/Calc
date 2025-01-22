const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value) {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Handle equals button
equalsButton.addEventListener('click', () => {
    try {
        const result = eval(currentInput);
        updateDisplay(result);
        currentInput = result.toString();
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
    }
});

// Handle clear button
clearButton.addEventListener('click', () => {
    currentInput = '';
    updateDisplay(0);
});

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}
