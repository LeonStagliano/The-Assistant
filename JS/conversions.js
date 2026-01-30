// toDo Add unit symbol to each unit
// toDo Change units order "from smallest to bigest"
// toDo Add swap units button
// toDo Manage when its necesary to round results

// Object with all unit conversion ratios
export const conversions = {
    length: {
        base: 'meters',
        units: {
            nanometers: 1000000000,
            micrometers: 1000000,
            milimeters: 1000,
            centimeters: 100,
            meters: 1,
            kilometers: 0.001,
            mils: 39370.08,
            inches: 39.3701,
            feets: 3.2808,
            yards: 1.0936,
            rods: 0.198839,
            furlongs: 0.004971,
            miles: 0.00062137
        }
    },
    nauticalUnits: {
        base: 'nautical-miles',
        units: {
            meters: 1852,
            kilometers: 1.852,
            fathoms: 1012.6859,
            cables: 10,
            nauticalMiles: 1,
            nauticalLeagues: 0.333333,
            latitudeDegrees: 0.016666
        }
    },
    astronomicUnits: {
        base: 'astronomical-units',
        units: {
            kilometers: 149597870.7,
            moonDistances: 43052.2247, // 3474,8 km from earth
            earthsCircumferences: 3732.94, // 40075.075 km = 1 earth's circumference,
            lightMinutes: 8.32,
            astronomicalUnits: 1,
            lightYears: 0.0000158128, // 63241 au = 1 light year
            parsecs: 0.0000048481 // 206266.8456 au = 1 pársec
        }
    },
    mass: {
        base: 'kilograms',
        units: {
            miligrams: 1000000,
            centigrams: 100000,
            decigrams: 10000,
            grams: 1000,
            decagrams: 100,
            hectograms: 10,
            kilograms: 1,
            tons: 0.001,
            carat: 5000,
            ounces: 35.274,
            pounds: 2.2046,
            stones: 0.157473,
            shortTons: 0.00110231,
            longTons: 0.00098421
        }
    },
    volume: {
        base: 'cubic meter',
        units: {
            cubicMilimeters: 1000000000,
            cubicCentimeters: 1000000,
            cubicDecimeters: 1000,
            cubicMeters: 1,
            mililiters: 1000000,
            centiliters: 100000,
            deciliters: 10000,
            liters: 1000,
            cubicInches: 61023.76,
            cubicFeets: 35.3147,
            UKPints: 1759.75,
            UKGallons: 219.9692,
            USGallons: 264.172,
            UKBarrels: 6.1106
        }
    },
    area: {
        base: 'square meter',
        units: {
            squareMilimeters: 1000000,
            squareCentimeters: 10000,
            squareDecimeters: 100,
            squareMeters: 1,
            hectares: 0.0001,
            squareKilometers: 0.000001,
            squareInches: 1550,
            squareFeets: 10.7639,
            squareYards: 1.196,
            acres: 0.0002471
        }
    },
    temperature: {
        units: {
            celsius: {
                toCelsius: (c) => c,
                toFahrenheit: (c) => (c * 9 / 5) + 32,
                toKelvin: (c) => c + 273.15
            },
            fahrenheit: {
                toFahrenheit: (f) => f,
                toCelsius: (f) => (f - 32) * 5 / 9,
                toKelvin: (f) => (f - 32) * 5 / 9 + 273.15
            },
            kelvin: {
                toKelvin: (k) => k,
                toCelsius: (k) => k - 273.15,
                toFahrenheit: (k) => (k - 273.15) * 9 / 5 + 32
            }
        }
    },
    data: {
        base: 'byte',
        units: {
            bits: 8,
            nibbles: 2,
            bytes: 1,
            words: 0.5,
            kilobits: 0.008,
            kibibits: 0.007812,
            kilobyte: 0.001,
            kibibytes: 0.000977,
            megabits: 0.000008,
            mebibits: 0.000008,
            megabytes: 0.000001,
            mebibytes: 0.000000953674316,
            gigabits: 0.000000008,
            gibibits: 0.000000007450581,
            gigabytes: 0.000000001,
            gibibytes: 0.000000000931323,
            terabytes: 0.000000000001,
            tebibytes: 0.000000000000909,
            petabytes: 1.000000e-15,
            pebibytes: 8.881784e-16,
            exabytes: 1.000000e-18,
            exbibytes: 8.673617e-19,
            zetabytes: 1.000000e-21,
            zebibytes: 8.470329e-22,
            yottabytes: 1.000000e-24,
            yobibytes: 8.271806e-25
        }
    },
    speed: {
        base: 'kilometer per hour',
        units: {
            milimetersPerSecond: 277.77778,
            centimetersPerSecond: 27.77778,
            centimetersPerHour: 100000,
            metersPerSecond: 0.277778,
            metersPerHour: 1000,
            kilometersPerSecond: 0.000277778,
            kilometersPerHour: 1,
            inchesPerSecond: 10.9361329834,
            inchesPerHour: 39370.078740157,
            feetsPerSecond: 0.9113444153,
            feetsPerHour: 3280.8398950131,
            milesPerSecond: 0.0001726031,
            milesPerHour: 0.6213711922,
            knots: 0.5399568035,
            mach: 0.000816,
            soundSpeed: 0.00080985,
            lightSpeed: 9.26566932e-10
        }
    },
    time: {
        base: 'minute',
        units: {
            miliseconds: 60000,
            seconds: 60,
            minutes: 1,
            hours: 0.016667,
            days: 0.00069444,
            weeks: 0.0000992063,
            months: 0.0000228154,
            years: 0.0000019013,
            decades: 1.90130000e-7,
            centurys: 1.90130000e-8,
        }
    }
}

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
    const unitsArray = Object.keys(units)

    let html = `
        <form class="converter-form">
            <div class="input-group">
                <label for="input-value">Value:</label>
                <input type="number" id="input-value" placeholder="Enter value" value="1">
            </div>
            
            <div class="input-group">
                <label for="from-unit">From:</label>
                <select id="from-unit">
                    ${unitsArray.map(unit => `<option value="${unit}">${formatUnitName(unit)}</option>`).join('')}
                </select>
            </div>
            <button type="button" id="swap-units-btn">⇆</button>
            <div class="input-group">
                <label for="to-unit">To:</label>
                <select id="to-unit">
                    ${unitsArray.map(unit => `<option value="${unit}">${formatUnitName(unit)}</option>`).join('')}
                </select>
            </div>
            
            <div class="result-group">
                <p>Result: <span id="conversion-result">0</span> <span id="result-unit"></span></p>
            </div>
        </form>
    `

    container.innerHTML = html

    // Get the newly created elements
    const inputValue = document.getElementById('input-value')
    const fromUnit = document.getElementById('from-unit')
    const toUnit = document.getElementById('to-unit')
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
            const result = units[from][`to${formatUnitName(to)}`](value)
            
            resultSpan.textContent = result.toFixed(6).replace(/\.?0+$/, '')
            resultUnit.textContent = formatUnitName(to)
        } else {
            const value = parseFloat(inputValue.value) || 0
            const from = fromUnit.value
            const to = toUnit.value

            // Convert to base unit first, then to target unit
            const baseValue = value / units[from]
            const result = baseValue * units[to]

            resultSpan.textContent = result.toFixed(6).replace(/\.?0+$/, '')
            resultUnit.textContent = formatUnitName(to)
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