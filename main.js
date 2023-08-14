class Calculator {
    constructor(previusOperationElement, currentOperationElement){
        this.previusOperationElement = previusOperationElement;
        this.currentOperationElement = currentOperationElement;
        this.clear();
    };

    clear() {
        this.currentOperand = '';
        this.previusOperand = '';
        this.operation = undefined;
    };
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    };

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return              //--------- ONLY 1 POINT -------//
        this.currentOperand = this.currentOperand.toString() + number.toString()    //---------CONVERT NUMBER OPERAND IN STRING FOR PLUS LINE-------//
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previusOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previusOperand = this.currentOperand
        this.currentOperand = ''
    };

    compute() {
        let computetion;
        const prev = parseFloat(this.previusOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computetion = prev + current
                break;
            case '-':
                computetion = prev - current
                break;
            case '/':
                computetion = prev / current
                break;
            case '*':
                computetion = prev * current
                break;              
        
            default:
                return;
        }

        this.currentOperand = computetion;
        this.operation = undefined;
        this.previusOperand = ''
    };

    updateDisplay() {
        this.currentOperationElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previusOperationElement.innerText = `${this.previusOperand} ${this.operation}` + this.currentOperand + '=';
        } else {
            this.previusOperationElement.innerText = ''
        }
    };
};

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll( "[data-operation]");

const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");

const previusOperationElement = document.querySelector( "[data-previus-operation]");
const currentOperationElement = document.querySelector( "[data-current-operation]");


const calculator = new Calculator(previusOperationElement, currentOperationElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});
equalsButton.addEventListener('click', () => {
        calculator.compute()
        calculator.updateDisplay()
})
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})



