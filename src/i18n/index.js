import {forEach, isString} from 'lodash';
import enUs from './en-us';
import es from './es';
import ptBr from './pt-br';

let flatLanguagesKeys = null;
flatLanguagesKeys = (prevKey, object)=> {
  const keys = Object.keys(object);
  if (isString(object) || keys.length === 0)
  {
    return { [prevKey]: object };
  }
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    forEach(flatLanguagesKeys( prevKey ? `${prevKey}.${key}` : key, object[key]), 
      (value, key)=> result[key] = value);       
  }
  return result;
};

export default {
  "pt-br": flatLanguagesKeys("", ptBr),
  "en-us": flatLanguagesKeys("", enUs),
  "es": flatLanguagesKeys("", es),
};