import moment from 'moment';
import store from '../components/store';
import i18n from '../i18n';
import {getTranslateFunction} from 'redux-i18n';

/**Only expose date keys for avoiding getting directly the un-translated formats */
export const DATE_FORMATS_KEYS = {
    SERVER_DATE: "SERVER_DATE",
    SERVER_DATE_MIN: "SERVER_DATE_MIN",
    SHORT_DATE_TIME_FORMAT: "SHORT_DATE_TIME_FORMAT",
    SHORT_DATE_TIME_FORMAT_WITH_MINUTES: "SHORT_DATE_TIME_FORMAT_WITH_MINUTES",
}

const DATE_FORMATS = {
    [DATE_FORMATS_KEYS.SERVER_DATE]: "DDMMYYYYHHmmss",
    [DATE_FORMATS_KEYS.SERVER_DATE_MIN]: "DDMMYYYY",
    [DATE_FORMATS_KEYS.SHORT_DATE_TIME_FORMAT]: "DD/MM/YY",
    [DATE_FORMATS_KEYS.SHORT_DATE_TIME_FORMAT_WITH_MINUTES]: "DD/MM/YY HH:mm",
}

/**Get date format according to i18n selected 
 * @argument {string} format - Date format KEY, should be one of DATE_FORMAT_KEYS 
*/
export const getFormat = (format)=>{
    if (format === DATE_FORMATS_KEYS.SERVER_DATE || format === DATE_FORMATS_KEYS.SERVER_DATE_MIN)
        return DATE_FORMATS[format];
    const t = getTranslateFunction(i18n, store.getState().i18nState.lang);
    return t(`dates.${format}`);
}

/** Converts a moment Date to an array*/
export const toServerArray = mDate => {
    const result = mDate.toArray();
    result[1]++;
    return result;
};

/**convert from server array to moment*/
export const fromServerArray = (serverDateArray) => {  
    const dateArray = [...serverDateArray];
    dateArray[1]--;    
    return moment(dateArray);
};
