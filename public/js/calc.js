const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
      if (calculator.waitingForSecondOperand === true) return;
    
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand,

    'sin': (firstOperand, secondOperand) => secondOperand,

    'cos': (firstOperand, secondOperand) => secondOperand,

    'tan': (firstOperand, secondOperand) => secondOperand,

    'sqrt': (firstOperand, secondOperand) => secondOperand,

    'square': (firstOperand, secondOperand) => secondOperand,

    '%': (firstOperand, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  function sin() {
    calculator.displayValue = Math.sin(calculator.displayValue  * Math.PI/180);
  }

  function cos() {
    calculator.displayValue = Math.cos(calculator.displayValue  * Math.PI/180);
  }

  function tan() {
    calculator.displayValue = Math.tan(calculator.displayValue  * Math.PI/180);
  }
  
  function sqrt() {
    calculator.displayValue = Math.sqrt(calculator.displayValue);
  }

  function square() {
    calculator.displayValue = eval(calculator.displayValue) * eval(calculator.displayValue);
  }

  function percent() {
    calculator.displayValue = eval(calculator.displayValue) / 100;
  }


  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
          updateDisplay();
      return;
    }

    if (target.classList.contains('sin')) {
        sin();
        handleOperator(target.value);
            updateDisplay();
        return;
      }

      if (target.classList.contains('cos')) {
        cos();
        handleOperator(target.value);
            updateDisplay();
        return;
      }

      if (target.classList.contains('tan')) {
        tan();
        handleOperator(target.value);
            updateDisplay();
        return;
      }

      if (target.classList.contains('sqrt')) {
        sqrt();
        handleOperator(target.value);
            updateDisplay();
        return;
      }

      if (target.classList.contains('square')) {
        square();
        handleOperator(target.value);
            updateDisplay();
        return;
      }

      if (target.classList.contains('percent')) {
        percent();
        handleOperator(target.value);
            updateDisplay();
        return;
      }
  
    inputDigit(target.value);
    updateDisplay();
  });