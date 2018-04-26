import moment from 'moment';
import _ from 'lodash';
// import { dateFormats } from './helperService';

//export const dateFormats = HelperService.dateFormats,

export const formataDataToArray = (date) => { // Get Date Return Array
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let hora = date.getHours();
    let min = date.getMinutes();

    return [ano, mes, dia, hora, min, 0];

};

export const formataDataToMoment = (date) => { // Get Date Return Array

    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getFullYear();
    let hora = date.getHours();
    let min = date.getMinutes();

    return moment({ year: ano, month: mes, day: dia, hour: hora, minute: min, second: 0, millisecond: 0 });
};
/*
* @param dataIni {moment}
* @param dataFim {moment}

* @return Array of string with the dates in this range.

* @Example of implementation
* @param dataIni = 01/09/2017
* @param dataFim = 05/09/2017

The @return will be list ['01/09/2017', '02/09/2017', '03/09/2017', '04/09/2017', '05/09/2017']
* */

export const getDaysInRange = (dataIni, dataFim) => {

    let result = [];
    let date = dataIni;
    let key = 1;
    while (moment(date).isSameOrBefore(dataFim)) {
        let dia = date.toDate().getDate();
        let mes = date.toDate().getMonth();
        let ano = date.toDate().getFullYear();
        let dateStr = dia > 9 ? dia + "" : "0" + dia;
        dateStr += "/";
        dateStr += mes > 9 ? mes + "" : "0" + mes;
        dateStr += "/" + ano;
        result.push({ dateStr, key: 'header-data-' + key++, dataInicial: [ano, mes, dia, 0, 0, 0], dataFinal: [ano, mes, dia, 23, 59, 59], dadosChuva: 0 });

        date = moment(date).add(1, 'day');
    }
    return result;

};
export const differenceBetweenHours = (firstDate, secondDate) => {
    console.log(firstDate);
    console.log(secondDate);
    let hour = secondDate.getHours() - firstDate.getHours();

    if (hour < 0)
        hour = 24 + hour;

    let minute = secondDate.getMinutes() - firstDate.getMinutes();

    if (minute < 0) {
        minute = 60 + minute;
        hour--;
    }

    return { hour: hour, minutes: minute };
};

export const getJustTime = (time) => {
    if ((time === null) || (time === undefined))
        time = "";


    return new Date("01/01/2000 " + time);
};

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

export const convertDateTimeArrayToMoment = (datetimeArray, timezone) => {

    // To obtain the correct moment object from a localDateTime,
    // we need to know to which timezone this data refers to.
    // Sometimes ths might be important, but others it might not.
    timezone = timezone || moment.tz.guess();

    // Unlike expected by momentJS, the localDateTime array might ommit trailling zeros
    datetimeArray = _.assign(_.fill(new Array(6), 0), datetimeArray);

    // Unlike expected by momentJS, the localDateTime month starts at one, (eg, january is 1)
    datetimeArray[1]--;

    return moment.tz(datetimeArray, timezone);
};

export const convertDateTimeArrayToDate = (datetimeArray, timezone) => convertDateTimeArrayToMoment(
    datetimeArray,
    timezone
).toDate();

export const formatTimeToString = date => {
    return moment(date).format('HH:mm');
};

// TODO: Localize date format and the text in brackets
export const formatDateTimeToString = millisecondTimestamp => moment(millisecondTimestamp).format('DD/MM/Y [às] HH:mm:ss');