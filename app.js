class Calculator{
    constructor(previousOperandTextEl, currentOperandTextEl) {                         //el constructor toma los operadores para saber donde poner el txt display de la calculadora
        this.previousOperandTextEl = previousOperandTextEl
        this.currentOperandTextEl = currentOperandTextEl
        this.clear()
    }

    clear(){                                                                           //declara funcion clear
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)            //declara funcion limpiar un num
    }

    appendNumber(number){                                                           //declara fx para que al tocar num figure en el display
        if (number === '.' && this.currentOperand.includes('.')) return             //si numero estrictamente igual a . y operando ya contiene . no se puede volver a incluir
        this.currentOperand = this.currentOperand.toString() + number.toString()    //convierte a string para que agrege como numeros y no concatene
    }

    chooseOperation(operation){                                                     //declara fx que funciona cuando se utiliza alguna operacion en especifico
        if (this.currentOperand === '') return                                      //si actual est vacio, no permite hacer nada
        if (this.previousOperand !== '') {                                          //si anterior no esta vacio, realizar la computacion, para que actualice valores
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand                                  //recicla el actual para el anterior operador
        this.currentOperand = ''                                                    //limpia el valor del actual
    }

    compute(){                                                                      //computa el valor que tenemos que mostrar en la calc
        let computation                                                             //crea variable que va a ser el resultado de la fx compute
        const prev = parseFloat(this.previousOperand)                               //crea variable con el numero actual del operador previo, pasa de string a numero
        const current = parseFloat(this.currentOperand)                             //crea variable con el numero actual del operador actual, pasa de string a numero
        if (isNaN(prev) || isNaN(current)) return                                   //revisa que si no se pasa un numero actual o previo nan no haga
        switch (this.operation) {                                                   //swtich permite tener lo mismo que muchos if encadenados pero sobre un solo obj
            case '+':                                                               //con case definis los if statements. compara (operation) con (+)
                computation = prev + current                                        //ejecuta cuando operation es igual a +, computa el valor previo sumado al actual 
                break                                                               //cierra el ciclo
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '%':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation                                           //deja operador actual como computado, saca operacion y vacia previo
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN (integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay(){                                                                        //actualiza los valores dentro del output
        this.currentOperandTextEl.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null ){
            this.previousOperandTextEl.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandTextEl.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')                            //declara los botones, asignandolos a los elementos con query
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all__clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextEl = document.querySelector('[data-previous__operand]')            //declara operador anterior
const currentOperandTextEl = document.querySelector('[data-current__operand]')              //declara operador actual

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl)              //declara nueva Calc y le pasa el contenido del constructor

numberButtons.forEach(button => {                                                           //crea el btn para los num, los asignar con el evento click y actualiza el display
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {                                                        //pasa operacion sleccionada y actualiza el display
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

equalsButton.addEventListener('click', button => {                                         //escucha al boton de igualar
    calculator.compute()                                                                   //llama funcion de compute para obtener el valor del computo
    calculator.updateDisplay()                                                             //llama funcion updatedispay para mostrar el valor computado
  })
  
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })