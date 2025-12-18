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

// Handle the equals button
function handleEquals() {
    // First, change the global variable equationComplete to 1 so we can clear the screen when a new number is pressed next.
    equationComplete = 1;
    let problemElement = document.getElementById("screen");
    let problemString = problemElement.value;

    /*
    Proof of concept using eval(), however not good for production. Will write code to break down the string from the screen and evaluate the equation.
    
    let solution = eval(problemString);
    let screen = document.getElementById("screen");
    screen.value = solution;
    */

    /*
    Below is the code to evaluate the equation. All button values for operands and operators have a space added by design to make it easier to split.
    */
    let problemArray = problemString.split(" ");
    console.log(problemArray);
    let outputQueue = new Array();
    let operatorStack = new Array();

}