import moment from 'moment';
import _ from 'lodash';
import store from '../components/store';
import i18n from '../i18n';
import {getTranslateFunction} from 'redux-i18n';

/**Only expose date keys for avoiding getting directly the un-translated formats */
export const DATE_FORMATS_KEYS = {
    SERVER_DATE: "SERVER_DATE",
    SERVER_DATE_MIN: "SERVER_DATE_MIN",
}

const DATE_FORMATS = {
    [DATE_FORMATS_KEYS.SERVER_DATE]: "DDMMYYYYHHmmss",
    [DATE_FORMATS_KEYS.SERVER_DATE_MIN]: "DDMMYYYY",
}

/**Get date format according to i18n selected 
 * @argument {string} format - Date format KEY, should be one of DATE_FORMAT_KEYS 
*/
export const getFormat = (format)=>{
    if (format === DATE_FORMATS_KEYS.SERVER_DATE || format === DATE_FORMATS_KEYS.SERVER_DATE_MIN)
        return DATE_FORMATS[format];
    const t = getTranslateFunction(i18n, store.getState().i18nState.lang);
    return t(`dates.${DATE_FORMATS[format]}`);
}

// Converts a Date object to an array
export const convertDateToDateTimeArray = date => {
    let ano = date.getFullYear();
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    let hora = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    return [ano, mes, dia, hora, min, sec];
};

export const convertDateTimeArrayToMoment = (datetimeArray) => {  
    const tArray = _.assign(_.fill(new Array(6), 0), datetimeArray);
    tArray[1]--;
    return moment(datetimeArray);
};
