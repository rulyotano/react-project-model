import RangeGroup from './RangeGroup'
import Range from '../Range'
import {getColors, colors as allColors} from '../../../../service/colorService'
import localStorageService from '../../../../service/localStorageService'
import {isEmpty} from 'lodash'
import {VariableTypes} from './RangeGroup'

/**Class representing an 'equi' Range Group. Receive a group function or key that will be used to
 * group the items. Also will receive an optional color function, for getting the color of each item.
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class EquallySplitRangeGroup extends RangeGroup {
    /**
     * @callback rangeFnType
     * @param  {Object} item - Item to group
     * @param  {Array.<Range>} ranges - Item to group
     * @return {Object.<Object, Range>}
     */
    /**
     * @callback valueFnType
     * @param  {Object} item - Item to group
     * @return {number}
     */

    /**
     * @param id
     * @param name
     * @param {rangeFnType} rangeFn - Group Function.
     * @param hasRangePicker
     * @param canEdit
     * @param {Array.<Object>} items - Items for creating the group.
     * @param {(valueFnType)} valueFn - Function for determine the item's value from the properties for making
     * @param {(number)} rangeStart - Range start, it will be number between 1 and 100, keep proportion
     * @param {(number)} rangeEnd - Range end, it will be number between 1 and 100, keep proportion
     * @param displayFn
     * @param {(number)} size - Number of intervals (default = 5)
     * the range.
     * @param rangeSuffix
     * @constructor
     */
    constructor(id, name, rangeFn, hasRangePicker, canEdit, items, valueFn, rangeStart = 0, rangeEnd = 100, displayFn, size = 5, rangeSuffix = "") {
        super(id, name, rangeFn, hasRangePicker, canEdit);
        this._items = items;
        this._valueFn = valueFn;
        this._rangeStart = rangeStart;
        this._rangeEnd = rangeEnd;
        this._size = size;
        this._displayFn = displayFn;
        this._rangeSuffix = rangeSuffix;
        this._storageKey = `ranges-storage-key-${id}`;
        this._calculatedMin = Number.MIN_VALUE;
        this._calculatedMax = Number.MAX_VALUE;
        this._ranges = this._createRanges();
        this.variableType = VariableTypes.number;
    }

    /** Create the ranges for this range group
     * @return {Array.<Range>}
    */
    _createRanges(){
        if (!this._canEdit)
            return this._getDefaultRanges();
        let previousSaved = localStorageService.load(this._storageKey);
        let result = this._ranges;
        if (previousSaved)
            result = this.loadRangeFromString(previousSaved, this._rangeSuffix, this._displayFn);
        else if (isEmpty(this._ranges))
            result = this._getDefaultRanges();
        return result;
    }

    _getDefaultRanges(){
        let colors = getColors();
        let max = Number.MIN_VALUE;
        let min = Number.MAX_VALUE;

        const itemCount = this._items.length;
        for (let i = 0; i < itemCount; i++) {
            const item = this._items[i];
            
            let val = this._valueFn(item);
            if (val === -1 || (!val && val!==0))
                return true;
            max = Math.max(max, val);
            min = Math.min(min, val);
        }

        let result = [];

        if (max === Number.MIN_VALUE ||  min === Number.MAX_VALUE)
            return result;

        this._calculatedMin = min;
        this._calculatedMax = max;

        let count = this._size;
        let start = min + (max-min)*this._rangeStart/100;
        let end = min + (max-min)*this._rangeEnd/100;
        let isStartShift = start > min;
        let isEndShift = end < max;
        let intervalSize = Math.abs(end - start)/count;
        for (let i = 0; i < count; i++){
            let color = colors.next().value;
            var intervalStart = start + (i * intervalSize);
            result.push(new Range(i, color, null, null, intervalStart, intervalStart + intervalSize, this._rangeSuffix, this._displayFn));
        }
        if (isStartShift)
            result.unshift(new Range(-1, allColors.gray, null, null, min, start-0.0001, this._rangeSuffix, this._displayFn));

        if (isEndShift)
            result.push(new Range(count, allColors.black, null, null, end+0.0001, max, this._rangeSuffix, this._displayFn));
        return result;
    }

    /**Min value that is calculated, if not calculated Number.MIN_VALUE per default*/
    get calculatedMin(){
        return this._calculatedMin;
    }

    /**Max value that is calculated, if not calculated Number.MAX_VALUE per default*/
    get calculatedMax(){
        return this._calculatedMax;
    }

    /**Get a default data for rendering the chart, that works with most eq. split range groups
     * @param filterElements {Array} - Array of filtered elements for generating the chart
     * @param rangeDescriptionFn {Function} - Function that given the range and the suffix returns the range pie description
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]}*/
    getDefaultChartData(filterElements, rangeDescriptionFn = (range, suffix)=> `${range.min}-${range.max}${suffix}`){
        return super.getDefaultChartData(filterElements, rangeDescriptionFn);
    }

    update(data){
        if ((data.min || data.min === 0) || data.max){
            if (data.min || data.min === 0)
                this._rangeStart = data.min;
            if (data.max)
                this._rangeEnd = data.max;
            this._ranges = this._createRanges();
        }
        if (data.ranges){
            this._ranges = data.ranges;
        }
    }

    save(){        
        if (this._canEdit)
            localStorageService.save(this._storageKey, this.toString())
    }

    clear(){
        if (this._canEdit){
            localStorageService.remove(this._storageKey);
            this._ranges = null;
            this._ranges = this._createRanges();
        }
    }
}