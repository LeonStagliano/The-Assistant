export const conversions = {
    length: {
        base: 'meters',
        units: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            milimeters: 1000,
            micrometers: 1000000,
            nanometers: 1000000000,
            miles: 0.00062137,
            furlongs: 0.004971,
            rods: 0.198839,
            yards: 1.0936,
            feets: 3.2808,
            inches: 39.3701,
            mils: 39370.08,
        }
    },
    nauticalUnits: {
        base: 'nautical-miles',
        units: {
            nauticalMiles: 1,
            latitudeDegrees: 0.016666,
            nauticalLeagues: 0.333333,
            kilometers: 1.852,
            meters: 1852,
            cables: 10,
            fathoms: 1012.6859
        }
    },
    astronomicUnits: {
        base: 'astronomical-units',
        units: {
            astronomicalUnits: 1,
            parsecs: 0.0000048481, // 206266.8456 au = 1 pársec
            lightYears: 0.0000158128, // 63241 au = 1 light year
            lightMinutes: 8.32,
            earthsCircumferences: 3732.94, // 40075.075 km = 1 earth's circumference,
            moonDistances: 43052.2247, // 3474,8 km from earth
            kilometers: 149597870.7,
        }
    },
    mass: {
        base: 'kilograms',
        units: {
            kilograms: 1,
            longTons: 0.00098421,
            tons: 0.001,
            shortTons: 0.00110231,
            hectograms: 10,
            decagrams: 100,
            grams: 1000,
            carat: 5000,
            decigrams: 10000,
            centigrams: 100000,
            miligrams: 1000000,
            stones: 0.157473,
            pounds: 2.2046,
            ounces: 35.274
        }
    },
    volume: {
        base: 'cubic meter',
        units: {
            cubicMeters: 1,
            UKGallons: 219.9692,
            USGallons: 264.172,
            cubicDecimeters: 1000,
            liters: 1000,
            deciliters: 10000,
            centiliters: 100000,
            mililiters: 1000000,
            cubicCentimeters: 1000000,
            cubicMilimeters: 1000000000,
            cubicFeets: 35.3147,
            cubicInches: 61023.76,
            UKBarrels: 6.1106,
            UKPints: 1759.75,
        }
    },
    area: {
        base: 'square meter',
        units: {
            squareMeters: 1,
            squareKilometers: 0.000001,
            hectares: 0.0001,
            acres: 0.0002471,
            squareDecimeters: 100,
            squareYards: 1.196,
            squareFeets: 10.7639,
            squareInches: 1550,
            squareCentimeters: 10000,
            squareMilimeters: 1000000,
        }
    },
    temperature: {
        base: 'celsius',
        
    }

}