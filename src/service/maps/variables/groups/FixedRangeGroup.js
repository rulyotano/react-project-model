import RangeGroup from './RangeGroup'

/**Class representing a Fixed Range Group, the Ranges are passed as parameter in the constructor.
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class FixedRangeGroup extends RangeGroup {
    /**
     * @callback rangeFnType
     * @param  {Object} item - Item to group
     * @param  {Array.<Range>} ranges - Item to group
     * @return {Object.<Object, Range>}
     */

    /**
     * @param id
     * @param name
     * @param {rangeFnType} rangeFn - Group Function.
     * @param canEdit
     * @param {Array.<Range>} ranges - Ranges collection.
     * @constructor
     */
    constructor(id, name, rangeFn, canEdit, ranges) {
        super(id, name, rangeFn, false, canEdit);
        this._ranges = ranges;
    }

    /**Get a default data for rendering the chart, that works with most eq. split range groups
     * @param filterElements {Array} - Array of filtered elements for generating the chart
     * @param rangeDescriptionFn {Function} - Function that given the range and the suffix returns the range pie description
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]}*/
    getDefaultChartData(filterElements, rangeDescriptionFn = (range, suffix)=> range.value){
        return super.getDefaultChartData(filterElements, rangeDescriptionFn);
    }

    update(data){
        if (data.ranges)
            this._ranges = data.ranges;
    }

    // clone(){
    //     return FixedRangeGroup(this._id, this._name, this._rangeFn, this._canEdit, [...this._ranges.map(it=>it.clone())]);
    // }
}