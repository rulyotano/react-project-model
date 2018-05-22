import Range from '../Range';
import {sumBy, groupBy, forEach, round} from 'lodash';

/**Class representing how each Range item is going to be showed in the table. Each
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class RangeGroup {
    /**
     * @callback rangeFnType
     * @param  {Object} item - Item to group
     * @param  {Array.<Range>} ranges - Item to group
     * @return {Range}
     */

    /**
     * @param {(string, number)} id - identifier for the range group, it will be used to save it in store
     * or user config
     * @param {string} name - name for the Range Group
     * @param {rangeFnType} rangeFn - Range Function, returns the range that item belongs.
     * @param {boolean} hasRangePicker - True if this Range Group allows range min and max range picker
     * @param {boolean} canEdit - True if can edit
     * @constructor
     */
    constructor(id, name, rangeFn=(item, ranges)=>null, hasRangePicker = false, canEdit = false) {
        this._id = id;
        this._name = name;
        this._rangeFn = rangeFn;
        this._hasRangePicker = hasRangePicker;
        this._canEdit = canEdit;
        this._ranges = [];
    }

    /**Get ranges
     * @return {Array.<Range>} Ranges*/
    get ranges(){
        return this._ranges;
    }

    /**Get grouped elements
     * @param {Array} filterElements - elements after applying filters to them
     * @return {Array.<Object.<Object, Range>>}*/
    groupedElements(filterElements){
        return filterElements.map(item=>{
            let range = this._rangeFn(item, this._ranges);
            if (range)
                return {...item, color: range.color, insideRange: true, range: range };
            return item;
        });
    }

    get id() {return this._id;}
    get name() {return this._name;}
    get hasRangePicker() {return this._hasRangePicker;}
    get canEdit() {return this._canEdit;}

    /**Update the Range Group*/
    update(data){
        //implement in children
    }

    /**Get a default data for rendering the chart, that works with most eq. split range groups
     * @param filterElements {Array} - Array of filtered elements for generating the chart
     * @param rangeDescriptionFn {Function} - Function that given the range and the suffix returns the range pie description
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]}*/
    getDefaultChartData(filterElements, rangeDescriptionFn = (range, suffix)=>''){
        const timeFn = items => sumBy(items, item=>item.vlTempoSegundos);

        let filtered = this.groupedElements(filterElements).filter(item=>item.range);
        let classifiedItems = groupBy(filtered, item=>item.range.id);

        let result = {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]};
        let total = timeFn(filtered);  //total = sum in seconds

        let suffix = this._rangeSuffix ? ` (${this._rangeSuffix})`:'' ;

        forEach(classifiedItems, (items, key)=>{
            result.labels.push(rangeDescriptionFn(items[0].range, suffix));
            let value = (timeFn(items)/total)*100;
            result.datasets[0].data.push(round(value,2));
            result.datasets[0].backgroundColor.push(items[0].color);
            result.datasets[0].hoverBackgroundColor.push(items[0].color);
        });
        return result;
    }

    toString(){
        let rangeStrArray = this.ranges.map(r=>r.toString());
        return JSON.stringify(rangeStrArray);
    }

    /**
     * Load the current range from string
     * @param {string} str - string formatted in the form value1;vale2;...;valueN
     * @param {string} suffix
     * @param displayFn
     * @return {Range} - new created range*/
    loadRangeFromString(str, suffix, displayFn){
        let list = JSON.parse(str);
        this._ranges = list.map(strItem => Range.createFromString(strItem, suffix, displayFn));
        return this._ranges;
    }
}