import moment from 'moment';
import _ from 'lodash';

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
