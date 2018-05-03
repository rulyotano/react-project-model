import enUs from './en-us'
import es from './es'
import ptBr from './pt-br'
import {forEach, isString} from 'lodash'

let flatLanguagesKeys = null;
flatLanguagesKeys = (prevKey, object)=> {    
    const keys = Object.keys(object);
    if (isString(object) || keys.length === 0)
    {
        return { [prevKey]: object }
    }
    let result = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        forEach(flatLanguagesKeys( prevKey ? `${prevKey}.${key}` : key, object[key]), 
            (key, value)=> result[key] = value);       
    }
    return result;
}

export default {
    "pt-br": flatLanguagesKeys("", ptBr),
    "en-us": flatLanguagesKeys("", enUs),
    "es": flatLanguagesKeys("", es),
}