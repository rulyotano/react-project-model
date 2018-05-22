/**Class representing how each Range item is going to be showed in the table. Each
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class RangeView {
    /**
     * @param {boolean} color - Show color column.
     * @param {boolean} description - Show description column.
     * @param {boolean} value - Show value column.
     * @param {boolean} min - Show the min column.
     * @param {boolean} max - Show the max column.
     * @param {boolean} suffix - Show the suffix column.
     * @param {boolean} extra1 - Show the extra1 column.
     * @param {boolean} extra2 - Show the extra2 column.
     * @constructor
     */
    constructor(color = true, description = false, value = false, min = false, max = false, suffix = false,
                extra1  = false, extra2 = false) {
        this._color = color;
        this._description = description;
        this._value = value;
        this._min = min;
        this._max = max;
        this._suffix = suffix;
        this._extra1 = extra1;
        this._extra2 = extra2;
    }

    /**Show color column
     * @return {boolean}*/
    get color(){
        return this._color;
    }

    /**Show description column
     * @return {boolean}*/
    get description(){
        return this._description;
    }

    /**Show value column
     * @return {boolean}*/
    get value(){
        return this._value;
    }

    /**Show min column
     * @return {boolean}*/
    get min(){
        return this._min;
    }

    /**Show max column
     * @return {boolean}*/
    get max(){
        return this._max;
    }

    /**Show suffix column
     * @return {boolean}*/
    get suffix(){
        return this._suffix;
    }

    /**Show extra1 column
     * @return {boolean}*/
    get extra1(){
        return this._extra1;
    }

    /**Show extra2 column
     * @return {boolean}*/
    get extra2(){
        return this._extra2;
    }
}