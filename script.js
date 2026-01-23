// Set a variable to record whether the equals button has been pressed. Once it has, any new numbers or operators should be part of a new equation and so the screen should be cleared which will be handled in the handleButton() function.
var equationComplete = 0;

// Assign event listeners to the buttons
var screen = document.getElementById("screen");
var buttons = document.querySelectorAll(".calculator--button__number, .calculator--button__operator");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleButton);
}

// Get the clear button and assign an event handler to it
var clear = document.getElementsByClassName("calculator--button__clear");
for (let i = 0; i < clear.length; i++) {
    clear[i].addEventListener("click", handleClear);
}

// Get the equals button and add an event listener to it
var equals = document.getElementsByClassName("calculator--button__equal");
for (let i = 0; i < equals.length; i++) {
    equals[i].addEventListener("click", handleEquals);
}

// When number or operator button is clicked
function handleButton(event) {
    // Get the even target's value attribute
    let button = event.target;
    let buttonValue = button.value;
    let screen = document.getElementById("screen");
    if (equationComplete == 1) {
        screen.value = "";
        equationComplete = 0;
    }

    // Add the button's value to the screen
    screen.value += buttonValue;
}

// Handle the clear button when clicked
function handleClear() {
    let screen = document.getElementById("screen");
    screen.value = "";
}

// Define operator precedence for converting to post-fix.
    const operatorPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

// Functions to use in evaluation to return true/false whether character is a operand or operator.
function isOperand(char) {
    return char >= '0' && char <= '9';
}

function isOperator(char) {
    return operatorPrecedence.hasOwnProperty(char);
}

function toPostfix(problemArray) {
    // This function will return an array.
    let outputQueue = new Array();
    let operatorStack = new Array();
    
    // Create post-fix notation
    for (let i = 0; i < problemArray.length; i++) {
        if (!isNaN(problemArray[i])) {
            outputQueue.push(problemArray[i]);
        } else if (problemArray[i] == '+' || problemArray[i] == '-' || problemArray[i] == '*' || problemArray[i] == '/') {
            
            var currentPrecedence = operatorPrecedence[problemArray[i]];
            // Calculate previous precedence and run a while loop to test if the new operator has a higher precedence or not and push to outputQueue if needed.

            while (operatorStack.length > 0) {
                var topOperator = operatorStack.at(-1);
                var previousPrecedence = operatorPrecedence[topOperator];

                if (previousPrecedence >= currentPrecedence) {
                    outputQueue.push(operatorStack.pop());
                } else {
                    break;
                }
            }
            operatorStack.push(problemArray[i]);   
        } else {
            //console.log('Error detected.');
            //screen.value('Error');
            throw new Error('There has been an error converting to postfix notation. It probably encountered a character that was not supposed to be there.');
        }        
    }

    // Move remaining operators from operatorStack to the outputQueue
    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    //console.log(outputQueue);
    //console.log(operatorStack);
    return outputQueue;
}

function runCalculation(operator, operandA, operandB) {
    switch (operator) {
        case '+':
            return operandA + operandB;
        
        case '-':
            return operandA - operandB;

        case '*':
            return operandA * operandB;

        case '/':
            if (operandB === 0) {
                throw new Error('Division by 0 not possible.');
            }
            return operandA / operandB;

        default:
            // This part should never run as there shouldn't be any operators that are not recognised.
            throw new Error('Unknown operator encountered: ${operator}');
    }
}

function calculateEquation(postfixEquation) {
    const calcStack = [];

    for (const token of postfixEquation) {
        // Push numbers straight onto the calcStack if it's a number
        if (!isNaN(parseFloat(token))) {
            calcStack.push(parseFloat(token));
        } else if (isOperator(token)) {
            if (calcStack.length < 2) {
                throw new Error("The postfix equation does not look right, there are not enough operands.");
            }

            const operandB = calcStack.pop();
            const operandA = calcStack.pop();

            const result = runCalculation(token, operandA, operandB);
            calcStack.push(result);
        }
    }

    return calcStack;
}

// Handle the equals button
function handleEquals() {
    // First, change the global variable equationComplete to 1 so we can clear the screen when a new number is pressed.
    equationComplete = 1;
    let problemElement = document.getElementById("screen");
    let problemString = problemElement.value;
    
     //All button values for operands and operators have a space added by design to make it easier to split. That's a bit of a cheat on my part to make this easier so I don't have to think about building numbers/decimal points.
    
    try {
        let problemArray = problemString.split(" ");
        //console.log(problemArray);

        // Convert to postfix notation
        let postfixEquation = toPostfix(problemArray);

        // Next it's time to evaluate the equation that's now in postfix by looping through
        let finalResult = calculateEquation(postfixEquation);

        // Put the final result on the screen.
        screen.value = finalResult;
    } catch (error) {
        console.log(error.message);
    }
    
}