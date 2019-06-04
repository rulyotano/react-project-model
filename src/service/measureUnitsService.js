import { cloneDeep, forEach } from "lodash";
import languageService from "./language/languageService";
import store from "../components/store";

const defaultFormula = value => value;
const defaultUnits = {
  DURATION: { unit: "", f: defaultFormula, formulaInverse: defaultFormula },
  SPEED: { unit: "km/h", f: defaultFormula, formulaInverse: defaultFormula },
  TEMPERATURE: {
    unit: "ºC",
    f: defaultFormula,
    formulaInverse: defaultFormula
  },
  PERCENT: { unit: "%", f: defaultFormula, formulaInverse: defaultFormula },
  MOTOR_REV: { unit: "rpm", f: defaultFormula, formulaInverse: defaultFormula }, // motor revolutions
  UNIT: { unit: "unit", f: defaultFormula, formulaInverse: defaultFormula },
  FUEL_PERF: { unit: "l/h", f: defaultFormula, formulaInverse: defaultFormula }, // fuel performance
  AREA: { unit: "há", f: defaultFormula, formulaInverse: defaultFormula },
  AREA_PERF: {
    unit: "há/h",
    f: defaultFormula,
    formulaInverse: defaultFormula
  }, // area performance
  VOLUME_LIQ: { unit: "l", f: defaultFormula, formulaInverse: defaultFormula }, // liquid volume
  RAIN: { unit: "mm", f: defaultFormula, formulaInverse: defaultFormula }, // rain
  DISTANCE_M: { unit: "m", f: defaultFormula }, // distance meters
  DISTANCE_KM: { unit: "km", f: defaultFormula }, // distance kilometers
  PRESSURE: { unit: "Pa", f: defaultFormula }, // pressure
  VOLTAGE: { unit: "V", f: defaultFormula },
  TON_HA: { unit: "ton/há", f: defaultFormula }
};

const getUnitsFromLang = langUnitsConfig => {
  const result = cloneDeep(defaultUnits);
  forEach(result, (value, key) => {
    if (langUnitsConfig[key]) {
      const FORMULA_LANG_KEY = `${key}_FORMULA`;
      value.unit = langUnitsConfig[key];
      value.f = langUnitsConfig[FORMULA_LANG_KEY];
    }
  });
  return result;
};

const unitsLanguageMap = {};
languageService.availableLanguages().forEach(l => {
  unitsLanguageMap[l.key] = !l.customMeasureUnit
    ? cloneDeep(defaultUnits)
    : getUnitsFromLang(require(`../i18n/${l.key}/measureUnit.js`).default);
});

export const getUnits = () => {
  const { lang } = store.getState().i18nState;
  return unitsLanguageMap[lang];
};