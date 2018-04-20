import {cloneDeep} from 'lodash'

const defaultFormula = value=>value;
export const defaultUnits = {
    DURATION: { display: "", formula: defaultFormula, formulaInverse: defaultFormula },
    SPEED: { display: "km/h", formula: defaultFormula, formulaInverse: defaultFormula },
    TEMPERATURE: { display: "ºC", formula: defaultFormula, formulaInverse: defaultFormula },
    PERCENT: { display: "%", formula: defaultFormula, formulaInverse: defaultFormula },
    MOTOR_REV: { display: "rpm", formula: defaultFormula, formulaInverse: defaultFormula },     //motor revolutions
    UNIT: { display: "unit", formula: defaultFormula, formulaInverse: defaultFormula },
    FUEL_PERF: { display: "l/h", formula: defaultFormula, formulaInverse: defaultFormula },     //fuel performance
    AREA: { display: "há", formula: defaultFormula, formulaInverse: defaultFormula },
    AREA_PERF: { display: "há/h", formula: defaultFormula, formulaInverse: defaultFormula },    //area performance
    VOLUME_LIQ: { display: "l", formula: defaultFormula, formulaInverse: defaultFormula },      //liquid volume
    RAIN: { display: "mm", formula: defaultFormula, formulaInverse: defaultFormula },           //rain
};

let units = cloneDeep(defaultUnits);

export const getUnits = ()=>units;

