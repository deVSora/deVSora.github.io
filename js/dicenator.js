const result = document.querySelector('.result');
const historic = document.querySelector('.historic');


// recebe uma entrada com dados, e os calculas, a entrada é composta de: n(d)x
// Onde n é o número de dados, d é o identificador de dado, e x é o número de lados do lado
//Também calcula entradas com expressões, feitas da mesma maneira, como por exemplo: 15d20+150/(4+5d10)
class DiceRoll {
    constructor(rollExpression) {
        rollExpression = rollExpression.replace(/D/g, 'd');
        Object.defineProperty(this, 'dicesRollOut', {
            value: rollExpression,
            enumerable: true,
            writable: true,
            configurable: true
        });
    }

    // Create the function executeRollOut that do the dice roll out
    // Return the 'generalRollList' array that contain [sumOfDices, ...dices]

    executeRollOut() {
        try {
            let expression = this.dicesRollOut
            let generalRollList = []
            for (let i = 0; i < expression.length; i++) {
                if (isNaN(expression[i])) {
                    if (expression[i] == 'd') {
                        let rolls = ''
                        let rollList = []
                        let count = 1
                        while (!isNaN(expression[i - count])) {
                            rolls += expression[i - count]
                            count++;
                        }
                        let rollPosition = i - (count - 1)
                        rolls = rolls.split("").reverse().join("")
                        console.log(rolls)
                        if (rolls == '') {
                            let dice = ''
                            let count = 1
                            while (!isNaN(expression[i + count])) {
                                dice += expression[i + count]
                                count++;
                            }
                            let dicePosition = i + count
                            let diceRoll = (Math.floor(Math.random() * (Number(dice) - 1) + 1));
                            expression = expression.replace(expression.slice(rollPosition, dicePosition), diceRoll)
                            generalRollList.push(`D${dice}: ` + diceRoll)
                        }
                        else {
                            let dice = ''
                            let count = 1
                            while (!isNaN(expression[i + count])) {
                                dice += expression[i + count]
                                count++;
                            }
                            let dicePosition = i + count
                            let roll = 1
                            let total = 0
                            while (roll <= rolls) {
                                let diceRoll = (Math.floor(Math.random() * (Number(dice) - 1) + 1));
                                rollList.push(' ' + diceRoll)
                                total += diceRoll;
                                roll++;
                            }
                            expression = expression.replace(expression.slice(rollPosition, dicePosition), total)
                            generalRollList.push(`${rolls}D${dice}: ` + rollList)
                        }
                    }
                }
            }
            expression = eval(expression)
            generalRollList.unshift(expression)
            return generalRollList
        }
        catch (e) {
            return false
        }
    }
}


//Calculadora, básicamente adiciona o display, e interação dos botões com o display, além de teclas de atalho, como Enter, backspace etc.
//Também usa a função construtora para que intereja devidamente com a calculadora
function Calculadora() {
    this.display = document.querySelector('.display');

    this.inicia = function () {
        this.cliqueBotoes();
        this.pressionaBackSpace();
        this.pressionaEnter();
    };

    this.pressionaEnter = function () {
        this.display.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
                this.realizaConta();
            }
        });
    };

    this.pressionaBackSpace = function () {
        this.display.addEventListener('keydown', e => {
            if (e.keyCode === 8) {
                e.preventDefault();
                this.clearDisplay();
            }
        });
    };

    this.realizaConta = function () {
        let diceList = ""
        let expression = this.display.value
        let dicesRollOut = new DiceRoll(this.display.value);
        let rollOut = dicesRollOut.executeRollOut()
        const p = document.createElement('p');
        const line = document.createElement('p');
        if (rollOut[0]) {
            for (let i = 1; i < rollOut.length; i++) {
                diceList += `\n->${rollOut[i]}`
            }
            result.innerText = `${expression} = ${rollOut[0]} (${diceList})`
            p.innerText = `${expression} = ${rollOut[0]} (${diceList})`
            historic.appendChild(p)
            line.innerText = `---------------------------------`
            historic.appendChild(line)
        } else {
            result.innerText = `Não foi possível fazer a conta/lançamento`
        }

    };

    this.clearDisplay = function () {
        this.display.value = '';
    };

    this.deleteOne = function () {
        this.display.value = this.display.value.slice(0, -1);
    };


    this.cliqueBotoes = function () {
        document.addEventListener('click', e => {
            const el = e.target;

            if (el.classList.contains('btn-num')) {
                this.btnParaDisplay(el.innerText);
            }

            if (el.classList.contains('btn-clear')) {
                this.clearDisplay();
            }

            if (el.classList.contains('btn-del')) {
                this.deleteOne();
            }

            if (el.classList.contains('btn-eq')) {
                this.realizaConta();
            }

            this.display.focus();
        });
    };

    this.btnParaDisplay = function (valor) {
        this.display.value += valor;
    }
};

calculadora = new Calculadora();
calculadora.inicia();