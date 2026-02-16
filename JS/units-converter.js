// toDo Manage when its necesary to round results

import { conversions } from "./conversion-ratios.js"

// Initialize the converter interface when the page loads
export function initConverter() {
    const categorySelect = document.getElementById('category-select')
    const converterContent = document.getElementById('converter-content')

    // Event listener for category selection
    categorySelect.addEventListener('change', function () {
        const selectedCategory = this.value

        if (!selectedCategory) {
            converterContent.innerHTML = '<p>Select a category to start converting</p>'
            return
        }

        renderConverter(selectedCategory, converterContent)
    })

    // Initial message
    converterContent.innerHTML = '<p>Select a category to start converting</p>'
}

// Render converter interface for selected category
function renderConverter(category, container) {
    const categoryData = conversions[category]

    if (!categoryData) {
        container.innerHTML = '<p>Category not found</p>'
        return
    }

    const units = categoryData.units
    const unitsNamesArray = Object.keys(units)
    console.log(units)

    let html = `
        <form class="converter-form">
            <div class="input-group">
                <label for="input-value">Value:</label>
                <input type="number" id="input-value" placeholder="Enter value" value="1">
            </div>
            
            <div class="input-group">
                <label for="from-unit">From:</label>
                <select id="from-unit">
                    ${unitsNamesArray.map(unit => `<option value="${unit}">( ${units[unit].symbol} ) - ${formatUnitName(unit)}</option>`).join('')}
                </select>
            </div>
            <button type="button" id="swap-units-btn">⇆</button>
            <div class="input-group">
                <label for="to-unit">To:</label>
                <select id="to-unit">
                    ${unitsNamesArray.map(unit => `<option value="${unit}">( ${units[unit].symbol} ) - ${formatUnitName(unit)}</option>`).join('')}
                </select>
            </div>
            
            <div class="result-group">
                <p><span id="from-value"></span> <span id="from-unit-symbol"></span> = <span id="conversion-result">0</span> <span id="result-unit"></span></p>
            </div>
        </form>
    `

    container.innerHTML = html

    // Get the newly created elements
    const inputValue = document.getElementById('input-value')
    const fromUnit = document.getElementById('from-unit')
    const toUnit = document.getElementById('to-unit')
    const fromValue = document.getElementById('from-value')
    const fromUnitSymbol = document.getElementById('from-unit-symbol')
    const resultSpan = document.getElementById('conversion-result')
    const resultUnit = document.getElementById('result-unit')
    const swapBtn = document.getElementById('swap-units-btn')

    // Set initial result unit
    resultUnit.textContent = formatUnitName(toUnit.value)

    // Function to perform conversion
    function performConversion() {
        if (category === 'temperature') {
            const value = parseFloat(inputValue.value) || 0
            const from = fromUnit.value
            const to = toUnit.value
            const result = units[from].formulaes[`to${formatUnitName(to)}`](value)

            resultSpan.textContent = result.toFixed(6).replace(/\.?0+$/, '')
            resultUnit.textContent = formatUnitName(to)
        } else {
            const value = parseFloat(inputValue.value) || 0
            const from = fromUnit.value
            const to = toUnit.value

            // Convert to base unit first, then to target unit
            const baseValue = value / units[from].value
            const result = baseValue * units[to].value

            fromValue.textContent = inputValue.value
            fromUnitSymbol.textContent = units[from].symbol
            resultSpan.textContent = result.toFixed(6).replace(/\.?0+$/, '')
            resultUnit.textContent = units[to].symbol // formatUnitName(to)
        }
    }

    function swapUnits() {
        let firstUnit = fromUnit.value
        fromUnit.value = toUnit.value
        toUnit.value = firstUnit
        performConversion()
    }

    // Add event listeners
    inputValue.addEventListener('input', performConversion)
    fromUnit.addEventListener('change', performConversion)
    toUnit.addEventListener('change', performConversion)
    swapBtn.addEventListener('click', swapUnits)


    // Initial conversion
    performConversion()
}

// Utility function to format unit names (camelCase to Title Case)
function formatUnitName(unitName) {
    return unitName
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
}