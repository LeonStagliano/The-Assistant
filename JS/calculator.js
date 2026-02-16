/* 
CALCULATOR
Arithmetic Calculator wich repect mathematical hierarchy and the order of operations to obtain the result.
It begins by solving brackets, including nested ones, and continues with percentages, multiplications and divisions, 
finishing with additions and subtractions.
It stores a history of operations and results, and also includes a units converter.
*/

// ToDO

// // Check for possible key and buttons errors
// // Manage begining equations with an operator other than '-'
// // Manage typing two consecutive operators
// // Add a 0 when there is no integer before a decimal point
// // Manage multiple decimal points
// // Manage empty or invalid brackets
// // Bracket Management: Manage repeated implied multiplication, unary minus before brackets, removing operators between brackets
// // Replace the last operator if a new one is pressed
// // Manage invalid outputs
// // Prevent infinite Loops by unclosed brackets
// // Sign Inverter key
// // History of operations and results
// // Toggle History/Numpad Button Icon
// // Toggle Anchor href
// // Reverts to Numpad when click on same button
// // Units Converter
// Equation cursor
// Scientist calculator

// TESTING ONLY
// equationDisplay.value = "2*4-3*(12-3*2/2)/3+21.5*7/4-1+(14+2-8/2)"
// equationDisplay.value = "10*(2+(-5)-(8/2+(-1)))"
// equationDisplay.value = "8/2+(-1)+12-2*6/3"
// equationDisplay.value = "10*(-1*(10-8))"
// equationDisplay.value = "10*(50%*40)/25+(-1*(9-4))"
// equationDisplay.value = "6/2*(1+2)"
// if (equationDisplay.value) console.log(`${equationDisplay.value} = ` + eval(equationDisplay.value))

let equationDisplay
let partialResult
let calculatorKeys
let numpad
let calculatorNav
let historyNavBtn
let historyIcon
let historyContainer
let db
let isHistoryDisplayed = false

export function initCalculator() {
    equationDisplay = document.getElementById('equation-display')
    partialResult = document.getElementById('partial-result')
    calculatorKeys = document.querySelector('.calculator-keys')
    numpad = document.getElementById('numpad')
    calculatorNav = document.querySelectorAll('.link')
    historyNavBtn = document.getElementById('history-btn')
    historyIcon = document.getElementById('history-icon')
    historyContainer = document.getElementById('history-container')

    setupDatabase()

    // Defines keys behaviour
    calculatorKeys.addEventListener('click', function (event) {
        const target = event.target
        const targetValue = target.value
        const lastChar = equationDisplay.value.slice(-1)

        if (!target.classList.contains('key')) return // Prevents behaviour when clicking outside of keys area

        // Clears both display screens
        if (targetValue === "C") {
            equationDisplay.value = ""
            partialResult.value = ""
            return
        }
        // Computes the operation
        if (targetValue === "=") {
            if (isNaN(compute(equationDisplay.value))) return equationDisplay.value // Prevents erroneous results
            recordOperation(equationDisplay.value, compute(equationDisplay.value)) // Stores the operation in the history
            if (isHistoryDisplayed) displayHistory()
            equationDisplay.value = compute(equationDisplay.value) // Shows the result on equationDisplay.value
            partialResult.value = ''
            return
        }
        // Open and Close Brackets Keys
        if (targetValue === "(" || targetValue === ")") {
            // Prevents erroneous brackets
            equationDisplay.value = manageBrackets(equationDisplay.value, targetValue)
            updatePartialResult()
            return
        }
        // Inverts the sign of the last number or closed bracket
        if (targetValue === "*-1") {
            equationDisplay.value = invertSign(equationDisplay.value)
            updatePartialResult()
            return
        }
        // If the last is '%' and its followed by a number, decimal point, or a opening bracket => Implied multiplication
        if (lastChar === '%' && (/[\d.]|\(/.test(targetValue))) equationDisplay.value += '*'

        // Decimal point Key managment
        if (targetValue === '.') {
            if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication after brackets
            if (lastChar === '' || /[+\-*/().%]/.test(lastChar)) equationDisplay.value += '0' // Add 0 when pressing "." without integers
            if (verifyDecimalPoints(equationDisplay.value)) return // Prevents multiple decimal points
            equationDisplay.value += targetValue
            updatePartialResult()
            return
        }

        // Numbers Keys
        if (/\d/.test(targetValue)) {
            if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication
            equationDisplay.value += targetValue
            updatePartialResult()
            return
        }

        // Operators Keys
        const operators = /[+\-*/%]/
        if (operators.test(targetValue)) {
            // Prevents printing an operator at the begining of the operation or bracket, excepting unary minus
            if ((!equationDisplay.value || lastChar === '(') && targetValue !== '-') return
            // Prevents replacing a unary minus in a bracket with another operator
            if (equationDisplay.value.slice(-2, -1) === '(' && !/[\d(]/.test(lastChar)) return
            // Prevents replacing an initial unary minus with another operator
            if (equationDisplay.value === '-' && operators.test(targetValue)) return
            // If the last character is a decimal point or an operator, it's replaced with the new one, excepting unary minus
            if (operators.test(lastChar) || lastChar === '.') equationDisplay.value = equationDisplay.value.slice(0, -1) + targetValue
            else equationDisplay.value += targetValue
            updatePartialResult()
            return
        }
    })
    // Defines keyboard input
    document.addEventListener('keydown', function (event) {
        const key = event.key
        // Prevents capturing wrong keys
        if (!['Delete', 'c', 'C', 'Enter', 'Backspace', '(', ')', '<', '>', '%', '+', '-', '*', '/', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) return
        const lastChar = equationDisplay.value.slice(-1)

        // Clears both display screens
        if (key === 'Delete' || key === "c" || key === "C") {
            equationDisplay.value = ""
            partialResult.value = ""
            return
        }
        // Computes operation with 'Enter' Key
        if (key === "Enter") {
            if (isNaN(compute(equationDisplay.value))) return equationDisplay.value // Prevents erroneous results
            recordOperation(equationDisplay.value, compute(equationDisplay.value)) // Stores the operation in the history
            if (isHistoryDisplayed) displayHistory()
            equationDisplay.value = compute(equationDisplay.value) // Shows the result on equationDisplay.value
            partialResult.value = ''
            return
        }
        // Removes the last character with Backspace Key and updates partialResult
        if (key === "Backspace") {
            equationDisplay.value = equationDisplay.value.slice(0, -1)
            updatePartialResult()
        }
        // Captures the parentheses keys
        if (key === "(" || key === ")") {
            // Prevents erroneous brackets
            equationDisplay.value = manageBrackets(equationDisplay.value, key)
            updatePartialResult()
            return
        }
        // Captures the angle brackets keys to inverts the sign of the last number or closed bracket
        if (key === "<" || key === '>') {
            equationDisplay.value = invertSign(equationDisplay.value)
            updatePartialResult()
            return
        }

        // If the last is '%' and its followed by a number, decimal point, or a opening bracket => Implied multiplication
        if (lastChar === '%' && (/[\d.]|\(/.test(key))) equationDisplay.value += '*'

        // Dot key managment
        if (key === '.') {
            if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication after brackets
            if (lastChar === '' || /[+\-*/().%]/.test(lastChar)) equationDisplay.value += '0' // Add 0 when pressing "." without integers
            if (verifyDecimalPoints(equationDisplay.value)) return // Prevents multiple decimal points
            equationDisplay.value += key
            updatePartialResult()
            return
        }

        // Numbers Keys
        if (/\d/.test(key)) {
            if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication
            equationDisplay.value += key
            updatePartialResult()
            return
        }

        // Operatos Keys
        const operators = /[+\-*/%]/
        if (operators.test(key)) {
            // Prevents printing an operator at the start of the operation or bracket, excepting unary minus
            if ((!equationDisplay.value || lastChar === '(') && key !== '-') return
            // Prevents replacing an unary minus in a bracket with another operator
            if (equationDisplay.value.slice(-2, -1) === '(' && !/[\d(]/.test(lastChar)) return
            // Prevents replacing an initial unary minus with another operator
            if (equationDisplay.value === '-' && operators.test(key)) return
            // If the last character is a decimal point or an operator, it replaces it with the new one, excepting unary minus
            if (operators.test(lastChar) || lastChar === '.') equationDisplay.value = equationDisplay.value.slice(0, -1) + key
            else equationDisplay.value += key
            updatePartialResult()
            return
        }
    })
    // Adds listeners to each calculator nav anchor
    calculatorNav.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault()

            let targetPage = link.getAttribute('href') || link.getAttribute('data-page')

            if (targetPage === '#history') {
                displayHistory()
            }
            // Removes the last character of the equation and updates partialResult
            if (targetPage === '#delete') {
                equationDisplay.value = equationDisplay.value.slice(0, -1)
                updatePartialResult()
            }
            if (targetPage === '#numpad') {
                displayNumpad()
            }
        })
    })
}
// Operation History with IndexedDB
function setupDatabase() {
    // Open our database
    let request = window.indexedDB.open('history', 1)
    // Event handlers
    request.onerror = function () {
        console.log('The database could not be opened')
    }
    request.onsuccess = function () {
        console.log('Database opened successfully')
        db = request.result
    }
    // Set up the database tables
    request.onupgradeneeded = function (event) {
        let db = event.target.result
        // Create an objectStore to store the operations
        let objectStore = db.createObjectStore('history', {
            keyPath: 'id',
            autoIncrement: true
        })
        objectStore.createIndex('operation', 'operation', { unique: false })
        objectStore.createIndex('result', 'result', { unique: false })
    }
}

function recordOperation(equation, result) {
    let newOperation = { operation: equation, result: result }
    let transaction = db.transaction(['history'], 'readwrite')
    let objectStore = transaction.objectStore('history')

    objectStore.add(newOperation)

    transaction.oncomplete = function () {
        console.log('Operation added to History')
    }

    transaction.onerror = function () {
        console.log('It was not possible to register the transaction')
    }
}
function displayHistory() {
    numpad.style.display = 'none'
    historyContainer.style.display = 'grid'
    historyNavBtn.href = '#numpad'
    historyIcon.src = './assets/img/calculator icon.png'
    isHistoryDisplayed = true
    // Clears history list
    while (historyContainer.firstChild) historyContainer.removeChild(historyContainer.firstChild)

    const operationsList = document.createElement('ul')
    operationsList.classList.add('list-container')
    historyContainer.appendChild(operationsList)

    let objectStore = db.transaction('history').objectStore('history')
    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result
        if (cursor) {
            // Creates the new history-list content
            const operation = document.createElement('li')
            const operationContainer = document.createElement('div')
            const operationValue = document.createElement('p')
            const operationResult = document.createElement('p')
            const deleteOperationBtn = document.createElement('button')
            const deleteOperationIcon = document.createElement('img')

            operation.classList.add('history-operation')
            operationContainer.classList.add('operation-container')
            deleteOperationIcon.setAttribute('src', './assets/img/trash icon.png')
            deleteOperationIcon.setAttribute('alt', 'Delete icon')
            // toDo Move this style to CSS
            deleteOperationBtn.style.width = '20%'
            deleteOperationBtn.style.background = 'none'
            deleteOperationBtn.style.border = 'none'
            deleteOperationIcon.style.width = '70%'

            operationContainer.appendChild(operationValue)
            operationContainer.appendChild(operationResult)
            deleteOperationBtn.appendChild(deleteOperationIcon)
            operation.appendChild(operationContainer)
            operation.appendChild(deleteOperationBtn)
            operationsList.appendChild(operation)

            operationValue.textContent = cursor.value.operation
            operationResult.textContent = `=${cursor.value.result}`

            operation.setAttribute('operation-id', cursor.value.id)
            operationValue.addEventListener('click', recoverHistoricValue)
            operationResult.addEventListener('click', recoverHistoricValue)
            deleteOperationBtn.addEventListener('click', deleteHistoricOperation)

            cursor.continue()
        } else {
            if (!operationsList.querySelector('.history-operation')) {
                document.getElementById('clear-history-btn').remove()
                const operation = document.createElement('li')
                operation.classList.add('history-operation')
                operation.textContent = 'There are no registered operations yet'
                operationsList.appendChild(operation)
            }
            console.log('The entire history is displayed on screen')
        }
    }
    // Clears history database
    const clearHistoryBtn = document.createElement('button')
    clearHistoryBtn.setAttribute('id', 'clear-history-btn')
    clearHistoryBtn.textContent = 'Clear history'
    historyContainer.appendChild(clearHistoryBtn)
    clearHistoryBtn.addEventListener('click', clearHistory)
}
function deleteHistoricOperation(event) {
    const operationElement = event.target.closest('[operation-id]')
    if (!operationElement) return

    let operationId = Number(operationElement.getAttribute('operation-id'))

    let transaction = db.transaction(['history'], 'readwrite')
    let objectStore = transaction.objectStore('history')
    let request = objectStore.delete(operationId)

    transaction.oncomplete = function () {
        operationElement.remove()
        console.log(`Operation ${operationId} has been deleted`)
        if (!historyContainer.querySelector('.history-operation')) {
            document.getElementById('clear-history-btn').remove()
            const operation = document.createElement('li')
            operation.classList.add('history-operation')
            operation.textContent = 'There are no registered operations yet'
            historyContainer.appendChild(operation)
        }
    }
}
function clearHistory() {
    let transaction = db.transaction(['history'], 'readwrite')
    let objectStore = transaction.objectStore('history')
    objectStore.clear()
    console.log('The history has been cleared')
    displayHistory()
}
function recoverHistoricValue(event) {
    let historicValue = event.target.textContent
    // Checks if the last number in the equation and the first number in the historical value have decimal points
    if (verifyDecimalPoints(equationDisplay.value) && verifyDecimalPoints(historicValue, true)) return  // Prevents multiple decimal points
    if (historicValue.slice(0, 1) === '=') {
        equationDisplay.value += historicValue.slice(1)
        updatePartialResult()
        return
    }
    equationDisplay.value += historicValue
    updatePartialResult()
}
function displayNumpad() {
    numpad.style.display = 'grid'
    historyContainer.style.display = 'none'
    historyIcon.src = './assets/img/history icon.png'
    calculatorNav[0].href = '#history'
    isHistoryDisplayed = false
}

function verifyPartialResult(equation) {
    let result = compute(equation)
    if (isNaN(result)) {
        result = ''
    }
    return result
}
const updatePartialResult = () => {
    partialResult.value = verifyPartialResult(equationDisplay.value)
}
// Validations to prevent erroneous brackets
function manageBrackets(equation, key) {
    const lastChar = equation.slice(-1)

    if (equation === '-') return '(-'

    const opens = (equation.match(/\(/g) || []).length
    const closes = (equation.match(/\)/g) || []).length
    const balance = opens - closes

    // Prevents closing more parentheses than open ones  
    if (key !== '(' && opens >= 0 && balance <= 0) return equation

    // If the last character is an operator or a decimal point, it is replaced by ')'
    if (key === ')' && /[+\-*/.]$/.test(lastChar)) equation = equation.slice(0, -1)
    // Implied multiplication if the last character is a number, ')' o '%' 
    if (key === '(' && /[)\d%]/.test(lastChar)) return equation + '*' + '('
    // If the last character is a decimal point, it is deleted and prints a '(' with implied multiplication
    if (key === '(' && /\./.test(lastChar)) return equation.slice(0, -1) + '*' + '('
    // Deletes unary minus when opening a new bracket
    if (key === '(' && /-/.test(lastChar)) equation = cleanBrackets(equation)

    equation = equation + key

    // Deletes brackets without numbers
    if (key === ')') return cleanBrackets(equation)

    return equation
}
// Checks brackets without numbers and removes them
function cleanBrackets(equation) {
    for (let i = equation.length - 1; i >= 0; i--) {
        if (/\d/.test(equation[i])) return equation
        if (equation[i] === '(') return equation.slice(0, i)
    }
}
// Inverts the sign of the last number or closed bracket
function invertSign(equation) {
    if (!equation) return equation // Prevents errors with wrong or empty operations
    let lastChar = equation.slice(-1)

    // If the last character is a digit or a decimal point
    if (/\d|\./.test(lastChar)) {
        let i = equation.length - 1
        while (i >= 0 && /[\d\.]/.test(equation[i])) i-- // Iterates the operation from the end until the entire number is found
        let start = i + 1 // Last operation number's first digit

        // Removes the unary minus before the number if it exists
        if (start > 0 && equation[start - 1] === '-') {
            // Checks if it's a unary minus (at start, after operator, or after opening bracket)
            if (start === 1 || /[+\-*/]/.test(equation[start - 2])) {
                return equation.slice(0, start - 1) + equation.slice(start) // At start or after operator
            } else if (equation[start - 2] === '(') {
                return equation.slice(0, start - 2) + equation.slice(start) // After opening bracket
            }
        }

        // Adds a unary minus
        if (equation[start - 1] === '(') {
            return equation.slice(0, start) + '-' + equation.slice(start) // Adds the sign after opening bracket
        } else {
            return equation.slice(0, start) + '(-' + equation.slice(start) // Otherwise, opens a new bracket with unary minus
        }
    }

    // Inverts the sign of the entire last parenthesis group
    if (lastChar === ')') {
        let depth = 0
        let i = equation.length - 1
        // Finds the entire bracket to invert
        while (i >= 0) {
            if (equation[i] === ')') depth++ // Adds depth each time it finds a new closing parentheses
            else if (equation[i] === '(') {
                depth-- // Reduces depth each time it finds a new opening parentheses
                if (depth === 0) break // Breaks the loop when it finds its parentheses pair
            }
            i--
        }
        let openIndex = i

        let bracket = equation.slice(openIndex)
        // If already wrapped as (-1*...), unwrap it
        if (bracket.startsWith('(-1*')) {
            let inner = bracket.slice(4, -1) // Bracket without inversion
            return equation.slice(0, openIndex) + inner
        } else {
            // Multiplies the entire bracket by -1 wraping it with (-1* ...)
            return equation.slice(0, openIndex) + '(-1*' + bracket + ')'
        }
    }

    // Default: nothing to invert
    return equation
}
// Computes the whole operation following maths hierarchy
function compute(equation) {
    // Splits the operation string in tokens of numbers (integers or decimals), operators and brackets
    let equation = tokenize(equation)

    // Computes all brackets (even the nested ones) until it obtains an operation without them
    while (equation.includes('(') && equation.includes(')')) {
        const prev = equation.join(',')
        equation = resolveBrackets(equation)
        // Progress condition to prevent an infinite loop - If there is no progress in iteration, a warning is displayed in console
        if (equation.join(',') === prev) {
            console.warn('No more brackets could be computed - Preventing an infinite loop')
            break
        }
    }
    // Computes the whole operation, by dividing it into terms and solving them
    equation = calculate(equation)

    // Parses the result and formats it using fixed-point notation
    equation = parseFloat(equation).toPrecision(10)

    // Removes the leading and trailing zeros, and decimal points if there are no decimals
    equation = equation.toString()
    if (equation.includes('.')) {
        equation = equation.split('')
        while (equation[equation.length - 1] == 0) {
            equation.pop() // Removes trailing zeros
        }
        if (equation[equation.length - 1] === '.') {
            equation.pop() // Removes decimal points when there are no decimals
        }
        while (equation[0] == 0 && equation[1] != '.') {
            equation.shift() // Removes leading zeros
        }
        equation = equation.join('')
    }

    return equation
}
// Splits operationScreen.value into tokens of numbers, parentheses and operators
function tokenize(equation) {
    // Captures digits (including decimals), parentheses and operators
    const rawTokens = equation.match(/\d+(\.\d+)?|[+\-*/()%]/g)
    if (!rawTokens) return [] // Prevents type errors if expr.match returns null

    // Checks if any '-' acts as a unary minus, and binds it to its number
    const tokensArray = []
    for (let i = 0; i < rawTokens.length; i++) {
        const token = rawTokens[i]

        // If it acts as a unary minus, begining the operation or parentheses, or after an operator 
        if (token === '-' && (i === 0 || /[+\-*/(]/.test(rawTokens[i - 1]))) {
            const next = rawTokens[i + 1]
            if (next && /\d/.test(next)) { // If a following element exists, and it's a digit
                tokensArray.push('-' + next) // Binds the sign to the following number and pushes it into tokensArray
                i++
            } else {
                tokensArray.push('-') // Pushes the unary minus when there is no following number
            }
        } else {
            tokensArray.push(token)
        }
    }
    return tokensArray
}
function verifyDecimalPoints(equation, fromBegin) {
    const tokensArray = tokenize(equation)
    if (fromBegin){
        for (let i = 0; i < tokensArray.length; i++) {
        const token = tokensArray[i]
        if (/^-?(?:\d+(\.\d+)?|\.\d+)$/.test(token)) { // Checks if the token is a number with decimals (even negative ones)
            return token.includes('.')
        }
    }} else {
        for (let i = tokensArray.length - 1; i >= 0; i--) {
            const token = tokensArray[i]
            if (/^-?(?:\d+(\.\d+)?|\.\d+)$/.test(token)) { // Checks if the token is a number with decimals (even negative ones)
                return token.includes('.')
            }
        }
    }
    return false
}
// Computes an operation without brackets, starting by percentages, multiplications and divisions to additions and subtractions
function calculate(equation) {
    let result = equation // Receives an operation without brackets
    // Computes all percentages of the operation
    while (result.includes('%')) {
        let percentIndex = result.indexOf('%')
        let percent = result[percentIndex - 1] / 100
        percent = percent.toPrecision(4) // Formats the result using fixed-point notation
        result.splice(percentIndex - 1, 2, percent) // Inserts the percentage operation's value into the equation
    }
    // As long as there is a multiplication or division, it is computed one by one
    while (result.includes('*') || result.includes('/')) {
        // Finds the first multiplication or division to save the operator
        let operator = (result.indexOf('*') != -1 && (result.indexOf('*') < result.indexOf('/') || result.indexOf('/') == -1)) ? '*' : '/'
        // Stores the first operator's index
        let operatorIndex = result.indexOf(operator)
        // Sends operator and its operandums to operationSelector
        let solved = selectOperation(result.slice(operatorIndex - 1, operatorIndex + 2))
        // Replaces each operation with their results
        result.splice(operatorIndex - 1, 3, solved)
    }
    // Computes each addition and subtraction one by one until it obtains the operation's final result
    while (result.includes('+') || result.includes('-')) {
        // Finds the first addition or subtraction to save the operator
        let operator = (result.indexOf('+') != -1 && (result.indexOf('+') < result.indexOf('-') || result.indexOf('-') == -1)) ? '+' : '-'
        // Stores the first operator's index
        let operatorIndex = result.indexOf(operator)
        // Sends operator and its operandums to operationSelector
        let solved = selectOperation(result.slice(operatorIndex - 1, operatorIndex + 2))
        // Replaces each operation with their results
        result.splice(operatorIndex - 1, 3, solved)
    }
    return result
}
// Manages brackets, even nested ones, to obtain only the final result of the first bracket
function resolveBrackets(equation) {
    let bracketArray = []
    let openIndex = 0
    let closeIndex = 0

    // Finds the index of the opening and closing parentheses
    let depth = 0
    let i = 0
    // Finds the entire bracket
    while (i < equation.length) {
        if (equation[i] === '(') {
            if (depth === 0) openIndex = i // Stores the index when it finds the first opening parentheses
            depth++ // Adds depth when finding a new opening parentheses
        }
        else if (equation[i] === ')') {
            depth-- // It reduces depth when closing a parentheses
            if (depth === 0) break // Breakes the loop when finding the pair of the first opening parentheses
        }
        i++
    }
    closeIndex = i // Stores the closing parentheses index

    // If there is an open parentheses without its closing pair, returns
    if (closeIndex === equation.length) return equation

    // Updates bracket with it's content
    bracketArray = equation.slice(openIndex + 1, closeIndex)

    // If the bracket only contains a single number, it is returned without brackets
    if (bracketArray.length === 1) return equation.slice(0, openIndex).concat(bracketArray).concat(equation.slice(closeIndex + 1))

    // If there are nested brackets, repeats the function with only the nested bracket content, until getting the final result
    while (bracketArray.includes('(') && bracketArray.includes(')') && bracketArray.length > 1) {
        const prev = bracketArray.join(',')
        bracketArray = resolveBrackets(bracketArray) // Stores the nested bracket result
        // Progress condition to prevent an infinite loop
        if (bracketArray.join(',') === prev) break
    }
    // Computes the content of the deepest bracket
    bracketArray = calculate(bracketArray)

    // Returns the operation updated with bracket result
    return equation.slice(0, openIndex).concat(bracketArray).concat(equation.slice(closeIndex + 1))
}
function selectOperation(equation) {
    if (equation[0] === '-') return // Prevents an error when there is only a unary minus
    let operator = equation[1]

    const operations = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    }
    const operation = operations[operator] // Stores the correct operation depending on the inputed operator

    const x = parseFloat(equation[0])
    const y = parseFloat(equation[2])
    return operation(x, y)
}