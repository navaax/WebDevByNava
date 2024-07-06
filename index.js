let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = null;

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;

}

function performOperation(op) {
    if (currentInput !== '') {
        if (previousInput === null) {
            previousInput = parseFloat(currentInput);
            operator = op;
            currentInput = '';
        } else {
            calculate();
            operator = op;
        }
    }
}

function calculate() {
    const key = event.key;
    
    if (previousInput !== null && currentInput !== '' && operator !== null) {
        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        switch
 (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    result = 'Error: Division by zero';
                } else {
                    result = num1 / num2;
                }
                break;
        }

        display.value = result;
        previousInput = result;
        currentInput = '';
        operator = null;
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = null;
    previousInput = null;
}


// Event listener para teclas
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Verificar si la tecla presionada es un número o un operador válido
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        if (key === '/' && currentInput === '') {
            // Prevenir división por cero al inicio
            return;
        }

        if (key === '+' || key === '-' || key === '*' || key === '/') {
            performOperation(key);
        } else {
            appendNumber(key);
        }
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});
