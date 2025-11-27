const display = document.getElementById("display");
let justCalculated = false; // tracks if last action was a calculation

function appendToDisplay(input) {
    // If last action was a calculation
    if (justCalculated) {
        if (/[0-9.]/.test(input)) {
            // Number or dot replaces display
            display.value = input;
        } else {
            // Operator continues from result
            display.value += input;
            // scroll display to show the last character
        }
        justCalculated = false;
        display.scrollLeft = display.scrollWidth;
        return;
    }

    // If display shows Error and input is number/dot → replace
    if (display.value === "Error !" && /[0-9.]/.test(input)) {
        display.value = input;
        display.scrollLeft = display.scrollWidth;
        return;
    }

    // If display shows Error and input is operator → ignore
    if (display.value === "Error !" && /[+\-*/]/.test(input)) {
        return;
    }

    // Default: append input
    display.value += input;
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
    display.value = "";
    justCalculated = false; // reset flag
}

function calculate() {
    try {
        display.value = eval(display.value);
        justCalculated = true; // set flag to enable new input behavior
        display.scrollLeft = display.scrollWidth;
    } catch (error) {
        display.value = "Error !";
        justCalculated = false;
    }
}
