const conversions = {
    length: {
        base: 'meters',
        units: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            milimeters: 1000,

        }
    },
    astronomicUnits: {
        base: 'astronomical-unit',
        units: {
            astronomicalUnit: 1,
            kilometers: 6.684587122268445e-9, // 149597870,7 km = 1 au
            earthsCircumference: 3333.3333, //earthsCircumference: 2.4953166026513986561472436420893e-5, // 40075.075 km = 1 earth's circumference,
            lightYear: 1.0570008340246154637094605244851e-13, // 9460730472580.8 km = 1 light year
            parsec: 3.2407762452517128431852002861419e-15, // 30856804799935.5 km = 1 pársec
        }
    }
}