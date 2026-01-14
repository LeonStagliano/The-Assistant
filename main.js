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
// History of operations and results
// Units Converter
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

let equationDisplay = document.getElementById('equation-display')
let partialResult = document.getElementById('partial-result')
let deleteBtn = document.getElementById('delete-btn')
let calculatorKeys = document.querySelector('.calculator-keys')

// Removes the last character of the equation and updates partialResult
deleteBtn.addEventListener('click', () => {
    equationDisplay.value = equationDisplay.value.slice(0, -1)
    partialUpdater()
})
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
        equationDisplay.value = compute(equationDisplay.value) // Shows the result on equationDisplay.value
        partialResult.value = ''
        return
    }
    // Open and Close Brackets Keys
    if (targetValue === "(" || targetValue === ")") {
        // Prevents erroneous brackets
        equationDisplay.value = bracketManager(equationDisplay.value, targetValue)
        partialUpdater()
        return
    }
    // Inverts the sign of the last number or closed bracket
    if (targetValue === "*-1") {
        equationDisplay.value = signInverter(equationDisplay.value)
        partialUpdater()
        return
    }
    // If the last is '%' and its followed by a number, decimal point, or a opening bracket => Implied multiplication
    if (lastChar === '%' && (/[\d.]|\(/.test(targetValue))) equationDisplay.value += '*'

    // Decimal point Key managment
    if (targetValue === '.') {
        if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication after brackets
        if (lastChar === '' || /[+\-*/().%]/.test(lastChar)) equationDisplay.value += '0' // Add 0 when pressing "." without integers
        if (decimalPointVerifier(equationDisplay.value)) return // Prevents multiple decimal points
        equationDisplay.value += targetValue
        partialUpdater()
        return
    }

    // Numbers Keys
    if (/\d/.test(targetValue)) {
        if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication
        equationDisplay.value += targetValue
        partialUpdater()
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
        partialUpdater()
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
        equationDisplay.value = compute(equationDisplay.value) // Shows the result on equationDisplay.value
        partialResult.value = ''
        return
    }
    // Removes the last character with Backspace Key and updates partialResult
    if (key === "Backspace") {
        equationDisplay.value = equationDisplay.value.slice(0, -1)
        partialUpdater()
    }
    // Captures the parentheses keys
    if (key === "(" || key === ")") {
        // Prevents erroneous brackets
        equationDisplay.value = bracketManager(equationDisplay.value, key)
        partialUpdater()
        return
    }
    // Captures the angle brackets keys to inverts the sign of the last number or closed bracket
    if (key === "<" || key === '>') {
        equationDisplay.value = signInverter(equationDisplay.value)
        partialUpdater()
        return
    }

    // If the last is '%' and its followed by a number, decimal point, or a opening bracket => Implied multiplication
    if (lastChar === '%' && (/[\d.]|\(/.test(key))) equationDisplay.value += '*'

    // Dot key managment
    if (key === '.') {
        if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication after brackets
        if (lastChar === '' || /[+\-*/().%]/.test(lastChar)) equationDisplay.value += '0' // Add 0 when pressing "." without integers
        if (decimalPointVerifier(equationDisplay.value)) return // Prevents multiple decimal points
        equationDisplay.value += key
        partialUpdater()
        return
    }

    // Numbers Keys
    if (/\d/.test(key)) {
        if (lastChar === ')') equationDisplay.value += '*' // Implied multiplication
        equationDisplay.value += key
        partialUpdater()
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
        partialUpdater()
        return
    }
})

// Returns a valid partial result or '' if invalid
function partialVerifier(equation) {
    let result = compute(equation)
    if (isNaN(result)) {
        result = ''
    }
    return result
}
// Updates the partial result on partialResult
const partialUpdater = () => {
    partialResult.value = partialVerifier(equationDisplay.value)
}

// Validations to prevent erroneous brackets
function bracketManager(equation, key) {
    const lastChar = equation.slice(-1)

    if (equation === '-') return '(-' // If the operation starts with an unary minus sign, it's moved inside a new bracket 

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
    if (key === '(' && /-/.test(lastChar)) equation = bracketCleaner(equation)

    equation = equation + key

    // Deletes brackets without numbers
    if (key === ')') return bracketCleaner(equation)

    return equation
}
// Checks brackets without numbers and removes them
function bracketCleaner(equation) {
    for (let i = equation.length - 1; i >= 0; i--) {
        if (/\d/.test(equation[i])) return equation
        if (equation[i] === '(') return equation.slice(0, i)
    }
}

// Inverts the sign of the last number or closed bracket
function signInverter(equation) {
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
    let equationSplitted = tokenize(equation)

    // Computes all brackets (even the nested ones) until it obtains an operation without them
    while (equationSplitted.includes('(') && equationSplitted.includes(')')) {
        const prev = equationSplitted.join(',')
        equationSplitted = bracketSolver(equationSplitted)
        // Progress condition to prevent an infinite loop - If there is no progress in iteration, a warning is displayed in console
        if (equationSplitted.join(',') === prev) {
            console.warn('No more brackets could be computed - Preventing an infinite loop')
            break
        }
    }
    // Computes the whole operation, by dividing it into terms and solving them
    equationSplitted = calculator(equationSplitted)

    // Parses the result and formats it using fixed-point notation
    equationSplitted = parseFloat(equationSplitted).toPrecision(10)

    // Removes the leading and trailing zeros, and decimal points if there are no decimals
    equationSplitted = equationSplitted.toString()
    if (equationSplitted.includes('.')) {
        equationSplitted = equationSplitted.split('') // Splits the result into individual characters
        while (equationSplitted[equationSplitted.length - 1] == 0) {
            equationSplitted.pop() // Removes trailing zeros
        }
        if (equationSplitted[equationSplitted.length - 1] === '.') {
            equationSplitted.pop() // Removes decimal points when there are no decimals
        }
        while (equationSplitted[0] == 0 && equationSplitted[1] != '.') {
            equationSplitted.shift() // Removes leading zeros
        }
        equationSplitted = equationSplitted.join('')
    }

    return equationSplitted // Returns the final result
}
// Splits operationScreen.value into tokens of numbers, parentheses and operators
function tokenize(equation) {
    // Captures digits (including decimals), parentheses and operators
    const rawTokens = equation.match(/\d+(\.\d+)?|[+\-*/()%]/g)
    if (!rawTokens) return [] // Prevents type errors if expr.match returns null

    // Checks if any '-' acts as a unary minus, and binds it to its number
    const tokensArray = []
    for (let i = 0; i < rawTokens.length; i++) {
        const token = rawTokens[i] // Iteration's current element

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
// Returns true if the last number has a decimal point
function decimalPointVerifier(equation) {
    const tokensArray = tokenize(equation) // Splits the operation into tokens
    for (let i = tokensArray.length - 1; i >= 0; i--) {
        const token = tokensArray[i]
        if (/^-?(?:\d+(\.\d+)?|\.\d+)$/.test(token)) { // Checks if the token is a number with decimals (even negative ones)
            return token.includes('.')
        }
    }
    return false
}
// Computes an operation without brackets, starting by percentages, multiplications and divisions to additions and subtractions
function calculator(equation) {
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
        let solved = operationSelector(result.slice(operatorIndex - 1, operatorIndex + 2))
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
        let solved = operationSelector(result.slice(operatorIndex - 1, operatorIndex + 2))
        // Replaces each operation with their results
        result.splice(operatorIndex - 1, 3, solved)
    }
    return result
}
// Manages brackets, even nested ones, to obtain only the final result of the first bracket
function bracketSolver(equation) {
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
        bracketArray = bracketSolver(bracketArray) // Stores the nested bracket result
        // Progress condition to prevent an infinite loop
        if (bracketArray.join(',') === prev) break
    }
    // Computes the content of the deepest bracket
    bracketArray = calculator(bracketArray)

    // Returns the operation updated with bracket result
    return equation.slice(0, openIndex).concat(bracketArray).concat(equation.slice(closeIndex + 1))
}
// Selects the correct operation and solves it depending on the incoming operator
function operationSelector(equation) {
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
    return operation(x, y) // Returns the operation result
}