import RangeGroup from './RangeGroup'
import Range from '../Range'
import {getColors} from '../../../../service/colorService'
import {chain} from 'lodash'

/**Class representing a 'grouped by' Range Group. Receive a group function or key that will be used to
 * group the items. Also will receive an optional color function, for getting the color of each item.
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class ByRangeGroup extends RangeGroup {
    /**
     * @callback rangeFnType
     * @param  {Object} item - Item to group
     * @param  {Array.<Range>} ranges - Item to group
     * @return {Object.<Object, Range>}
     */

    /**
     * @callback byFnType
     * @param  {Object} item - Item to group
     * @return {string} - value used to group
     */

    /**
     * @param id
     * @param name
     * @param {rangeFnType} rangeFn - Group Function.
     * @param {(byFnType|string)} byFn - Grouping function or string for generating the groups.
     * @param {Array.<Object>} items - Items for creating the group.
     * @param {byFnType} colorFn - Get the color for each item.
     * @constructor
     */
    constructor(id, name, rangeFn, items, byFn, colorFn) {
        super(id, name, rangeFn, false, false);
        this._byFn = byFn;
        this._colorFn = colorFn;
        this._ranges = this._createRanges(items);
    }

    /** Create the ranges for this range group
     * @return {Array.<Range>}
    */
    _createRanges(items){
        let colors = getColors();
        return chain(items).groupBy(this._byFn).map((groupItems, key)=>{
            return new Range(key, this._colorFn ? this._colorFn(groupItems[0]) : colors.next().value, key, key);
        }).value();
    }

    /**Get a default data for rendering the chart, that works with most eq. split range groups
     * @param filterElements {Array} - Array of filtered elements for generating the chart
     * @param rangeDescriptionFn {Function} - Function that given the range and the suffix returns the range pie description
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]}*/
    getDefaultChartData(filterElements, rangeDescriptionFn = (range, suffix)=> range.value){
        return super.getDefaultChartData(filterElements, rangeDescriptionFn);
    }

    // clone(){
    //     var result = new ByRangeGroup(this._id, this._name, this._rangeFn, [], this._byFn, this._colorFn);
    //     result.ranges = [...this._ranges.map(it=>it.clone())];
    //     return result;
    // }
}