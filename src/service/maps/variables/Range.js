import {get} from 'lodash'

/**Class representing each individual item in a RangeGroup, in other words, is each line in the ranges
 * table that appears when selected a map variable.
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class Range {
    /**
     * @param {string} id - Identifier for the Range.
     * @param {string} color - Color of the Range.
     * @param {string} description - Description or Name of the Range, this is not a required field.
     * @param {number} value - The value of the Range, it is used in Ranges that only have one value, not
     * intervals. It is not required.
     * @param {number} min - The min value in a Range. It is not required.
     * @param {number} max - The max value in a Range. It is not required.
     * @param {string} suffix - Suffix function, used for show suffix when required. It isn't required.
     * @param {function} displayFn - Function applied to 'value', 'min' and 'max'. By default will be the
     * raw value.
     * @param {any} extra1 - Extra parameter 1, can be set after class initialization.
     * @param {any} extra2 - Extra parameter 2, can be set after class initialization.
     * @constructor
     */
    constructor(id, color, description, value, min, max, suffix = "", displayFn = item=>item, extra1 = null,
                extra2 = null) {
        this._id = id;
        this._color = color;
        this._description = description;
        this._value = value;
        this._min = min;
        this._max = max;
        this._suffix = suffix;
        this._displayFn = displayFn;
        this._extra1 = extra1;
        this._extra2 = extra2;
    }

    /**Id of the Range
     * @return {string}*/
    get id(){
        return this._id;
    }

    /**Set "id" value
     * @param {string} value*/
    set id(value){
        this._id = value;
    }

    /**Color of the Range
     * @return {string}*/
    get color(){
        return this._color;
    }

    /**Set color value
     * @param {string} value*/
    set color(value){
        this._color = value;
    }

    /**Description of the Range
     * @return {string}*/
    get description(){
        return this._description;
    }

    /**Value of the Range (After applying the 'Display Function', in case it have it)
     * @return {any}*/
    get value(){
        return this._displayFn(this._value);
    }

    /**Set "value" value
     * @param {any} value*/
    set value(value){
        this._value = value;
    }

    /**The raw value of 'value' variable, in other words, it is not applied the DisplayFn() to it
     * @return {any}*/
    get valueRaw(){
        return this._value;
    }

    /**Min value of the Range (After applying the 'Display Function', in case it have it)*/
    get min(){
        return this._displayFn(this._min);
    }

    /**Set min value
     * @param {number} value*/
    set minRaw(value){
        this._min = value;
    }

    /**The raw value of 'min' value, in other words, it is not applied the DisplayFn() to it
     * @return {number}*/
    get minRaw(){
        return this._min;
    }


    /**Max value of the Range (After applying the 'Display Function', in case it have it)
     * @return {any}*/
    get max(){
        return this._displayFn(this._max);
    }

    /**Set max value
     * @param {number} value*/
    set maxRaw(value){
        this._max = value;
    }

    /**The raw value of 'max' value, in other words, it is not applied the DisplayFn() to it
     * @return {number}*/
    get maxRaw(){
        return this._max;
    }

    /**Suffix of the Range
     * @return {string}*/
    get suffix(){
        return this._suffix;
    }

    /**Extra date 1 of the Range
     * @return {any}*/
    get extra1(){
        return this._extra1;
    }

    /**Set extra data 1
     * @param {any} value - Data value*/
    set extra1(value){
        this._extra1 = value;
    }

    /**Extra date 2 of the Range
     * @return {any}*/
    get extra2(){
        return this._extra2;
    }

    /**Set extra data 2
     * @param {any} value - Data value*/
    set extra2(value){
        this._extra2 = value;
    }

    clone(){
        return new Range(this._id, this._color, this._description, this._value, this._min, this._max,
            this._suffix, this._displayFn, this._extra1, this._extra2);
    }

    /**
     * Get the Range string
     * @returns {string} - Formatted string in the form value1;vale2;...;valueN*/
    toString(){
        return `${this.id};${this.color};${this.description};${this.valueRaw};${this.minRaw};${this.maxRaw}`;
    }

    /**
     * Creates a Range from a string
     * @param {string} str - string formatted in the form value1;vale2;...;valueN
     * @param {string} suffix
     * @param displayFn
     * @return {Range} - new created range*/
    static createFromString(str, suffix, displayFn){
        let splitted = str.split(';');
        const get = index=>{
            let val = get(splitted, `[${index}]`);
            if (val === 'null' || val === 'undefined')
                return null;
            return val;
        };
        return new Range(get(0), get(1), get(2), get(3), get(4)*1, get(5)*1, suffix, displayFn);
    }
}