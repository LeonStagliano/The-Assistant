// toDo Add unit symbol to each unit
// // toDo Change units order "from smallest to bigest"
// // toDo Add swap units button
// toDo Manage when its necesary to round results

// Object with all unit conversion ratios
export const conversions = {
    length: {
        base: 'meters',
        units: {
            nanometers: {
                symbol: 'nm',
                value: 1000000000
            },
            micrometers: {
                symbol: 'µm',
                value: 1000000
            },
            milimeters: {
                symbol: 'mm',
                value: 1000
            },
            centimeters: {
                symbol: 'cm',
                value: 100
            },
            meters: {
                symbol: 'm',
                value: 1
            },
            kilometers: {
                symbol: 'km',
                value: 0.001
            },
            mils: {
                symbol: 'mil',
                value: 39370.08
            },
            inches: {
                symbol: 'in',
                value: 39.3701
            },
            feets: {
                symbol: 'ft',
                value: 3.2808
            },
            yards: {
                symbol: 'yd',
                value: 1.0936
            },
            rods: {
                symbol: 'rod',
                value: 0.198839
            },
            furlongs: {
                symbol: 'fur',
                value: 0.004971
            },
            miles: {
                symbol: 'mi',
                value: 0.00062137
            }
        }
    },
    nauticalUnits: {
        base: 'nautical-miles',
        units: {
            meters: {
                symbol: 'm',
                value: 1852
            },
            kilometers: {
                symbol: 'km',
                value: 1.852
            },
            fathoms: {
                symbol: 'ftm',
                value: 1012.6859
            },
            cables: {
                symbol: 'cable',
                value: 10
            },
            nauticalMiles: {
                symbol: 'NM',
                value: 1
            },
            nauticalLeagues: {
                symbol: 'lea',
                value: 0.333333
            },
            latitudeDegrees: {
                symbol: 'φº',
                value: 0.016666
            }
        }
    },
    astronomicUnits: {
        base: 'astronomical-units',
        units: {
            kilometers: {
                symbol: 'km',
                value: 149597870.7
            },
            moonDistances: {
                symbol: 'moonD',
                value: 43052.2247 // 3474,8 km from earth
            },
            earthsCircumferences: {
                symbol: 'earthC',
                value: 3732.94 // 40075.075 km = 1 earth's circumference
            },
            lightMinutes: {
                symbol: 'lm',
                value: 8.32
            },
            astronomicalUnits: {
                symbol: 'au',
                value: 1
            },
            lightYears: {
                symbol: 'ly',
                value: 0.0000158128 // 63241 au = 1 light year
            },
            parsecs: {
                symbol: 'pc',
                value: 0.0000048481 // 206266.8456 au = 1 pársec
            }
        }
    },
    mass: {
        base: 'kilograms',
        units: {
            miligrams: {
                symbol: 'mg',
                value: 1000000
            },
            centigrams: {
                symbol: 'cg',
                value: 100000
            },
            decigrams: {
                symbol: 'dg',
                value: 10000
            },
            grams: {
                symbol: 'g',
                value: 1000
            },
            decagrams: {
                symbol: 'dag',
                value: 100
            },
            hectograms: {
                symbol: 'hg',
                value: 10
            },
            kilograms: {
                symbol: 'kg',
                value: 1
            },
            tons: {
                symbol: 't',
                value: 0.001
            },
            carat: {
                symbol: 'ct',
                value: 5000
            },
            ounces: {
                symbol: 'oz',
                value: 35.274
            },
            pounds: {
                symbol: 'lb',
                value: 2.2046
            },
            stones: {
                symbol: 'st',
                value: 0.157473
            },
            shortTons: {
                symbol: 'shTn',
                value: 0.00110231
            },
            longTons: {
                symbol: 'loTn',
                value: 0.00098421
            }
        }
    },
    volume: {
        base: 'cubic meter',
        units: {
            cubicMilimeters: {
                symbol: 'mm³',
                value: 1000000000
            },
            cubicCentimeters: {
                symbol: 'cm³',
                value: 1000000
            },
            cubicDecimeters: {
                symbol: 'dm³',
                value: 1000
            },
            cubicMeters: {
                symbol: 'm³',
                value: 1
            },
            mililiters: {
                symbol: 'ml',
                value: 1000000
            },
            centiliters: {
                symbol: 'cl',
                value: 100000
            },
            deciliters: {
                symbol: 'dl',
                value: 10000
            },
            liters: {
                symbol: 'l',
                value: 1000
            },
            cubicInches: {
                symbol: 'in³',
                value: 61023.76
            },
            cubicFeets: {
                symbol: 'ft³',
                value: 35.3147
            },
            UKPints: {
                symbol: 'pt',
                value: 1759.75
            },
            UKGallons: {
                symbol: 'UKGal',
                value: 219.9692
            },
            USGallons: {
                symbol: 'USGal',
                value: 264.172
            },
            UKBarrels: {
                symbol: 'bbl',
                value: 6.1106
            }
        }
    },
    area: {
        base: 'square meter',
        units: {
            squareMilimeters: {
                symbol: 'mm²',
                value: 1000000
            },
            squareCentimeters: {
                symbol: 'cm²',
                value: 10000
            },
            squareDecimeters: {
                symbol: 'dm²',
                value: 100
            },
            squareMeters: {
                symbol: 'm²',
                value: 1
            },
            hectares: {
                symbol: 'ha',
                value: 0.0001
            },
            squareKilometers: {
                symbol: 'km²',
                value: 0.000001
            },
            squareInches: {
                symbol: 'in²',
                value: 1550
            },
            squareFeets: {
                symbol: 'ft²',
                value: 10.7639
            },
            squareYards: {
                symbol: 'yd²',
                value: 1.196
            },
            acres: {
                symbol: 'ac',
                value: 0.0002471
            }
        }
    },
    temperature: {
        units: {
            celsius: {
                symbol: '°C',
                formulaes: {
                    toCelsius: (c) => c,
                    toFahrenheit: (c) => (c * 9 / 5) + 32,
                    toKelvin: (c) => c + 273.15
                }
            },
            fahrenheit: {
                symbol: '°F',
                formulaes: {
                    toFahrenheit: (f) => f,
                    toCelsius: (f) => (f - 32) * 5 / 9,
                    toKelvin: (f) => (f - 32) * 5 / 9 + 273.15
                }
            },
            kelvin: {
                symbol: 'K',
                formulaes: {
                    toKelvin: (k) => k,
                    toCelsius: (k) => k - 273.15,
                    toFahrenheit: (k) => (k - 273.15) * 9 / 5 + 32
                }
            }
        }
    },
    data: {
        base: 'byte',
        units: {
            bits: {
                symbol: 'b',
                value: 8
            },
            nibbles: {
                symbol: 'nibble',
                value: 2
            },
            bytes: {
                symbol: 'B',
                value: 1
            },
            words: {
                symbol: 'word',
                value: 0.5
            },
            kilobits: {
                symbol: 'Kb',
                value: 0.008
            },
            kibibits: {
                symbol: 'Kib',
                value: 0.007812
            },
            kilobyte: {
                symbol: 'KB',
                value: 0.001
            },
            kibibytes: {
                symbol: 'KiB',
                value: 0.000977
            },
            megabits: {
                symbol: 'Mb',
                value: 0.000008
            },
            mebibits: {
                symbol: 'Mib',
                value: 0.000008
            },
            megabytes: {
                symbol: 'MB',
                value: 0.000001
            },
            mebibytes: {
                symbol: 'MiB',
                value: 0.000000953674316
            },
            gigabits: {
                symbol: 'Gb',
                value: 0.000000008
            },
            gibibits: {
                symbol: 'Gib',
                value: 0.000000007450581
            },
            gigabytes: {
                symbol: 'GB',
                value: 0.000000001
            },
            gibibytes: {
                symbol: 'GiB',
                value: 0.000000000931323
            },
            terabytes: {
                symbol: 'TB',
                value: 0.000000000001
            },
            tebibytes: {
                symbol: 'TiB',
                value: 0.000000000000909
            },
            petabytes: {
                symbol: 'PB',
                value: 1.000000e-15
            },
            pebibytes: {
                symbol: 'PiB',
                value: 8.881784e-16
            },
            exabytes: {
                symbol: 'EB',
                value: 1.000000e-18
            },
            exbibytes: {
                symbol: 'EiB',
                value: 8.673617e-19
            },
            zetabytes: {
                symbol: 'ZB',
                value: 1.000000e-21
            },
            zebibytes: {
                symbol: 'ZiB',
                value: 8.470329e-22
            },
            yottabytes: {
                symbol: 'YB',
                value: 1.000000e-24
            },
            yobibytes: {
                symbol: 'YiB',
                value: 8.271806e-25
            }
        }
    },
    speed: {
        base: 'kilometer per hour',
        units: {
            milimetersPerSecond: {
                symbol: 'mm/s',
                value: 277.77778
            },
            centimetersPerSecond: {
                symbol: 'cm/s',
                value: 27.77778
            },
            centimetersPerHour: {
                symbol: 'cm/h',
                value: 100000
            },
            metersPerSecond: {
                symbol: 'm/s',
                value: 0.277778
            },
            metersPerHour: {
                symbol: 'm/h',
                value: 1000
            },
            kilometersPerSecond: {
                symbol: 'km/s',
                value: 0.000277778
            },
            kilometersPerHour: {
                symbol: 'km/h',
                value: 1
            },
            inchesPerSecond: {
                symbol: 'in/s',
                value: 10.9361329834
            },
            inchesPerHour: {
                symbol: 'in/h',
                value: 39370.078740157
            },
            feetsPerSecond: {
                symbol: 'ft/s',
                value: 0.9113444153
            },
            feetsPerHour: {
                symbol: 'ft/h',
                value: 3280.8398950131
            },
            milesPerSecond: {
                symbol: 'mps',
                value: 0.0001726031
            },
            milesPerHour: {
                symbol: 'mph',
                value: 0.6213711922
            },
            knots: {
                symbol: 'kn',
                value: 0.5399568035
            },
            mach: {
                symbol: 'M',
                value: 0.000816
            },
            soundSpeed: {
                symbol: 'soundSp',
                value: 0.00080985
            },
            lightSpeed: {
                symbol: 'lightSp',
                value: 9.26566932e-10
            }
        }
    },
    time: {
        base: 'minute',
        units: {
            miliseconds: {
                symbol: 'ms',
                value: 60000
            },
            seconds: {
                symbol: 's',
                value: 60
            },
            minutes: {
                symbol: 'm',
                value: 1
            },
            hours: {
                symbol: 'h',
                value: 0.016667
            },
            days: {
                symbol: 'd',
                value: 0.00069444
            },
            weeks: {
                symbol: 'w',
                value: 0.0000992063
            },
            months: {
                symbol: 'm',
                value: 0.0000228154
            },
            years: {
                symbol: 'y',
                value: 0.0000019013
            },
            decades: {
                symbol: 'dec',
                value: 1.90130000e-7
            },
            centurys: {
                symbol: 'C',
                value: 1.90130000e-8
            }
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