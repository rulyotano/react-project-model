import {get} from 'lodash'
import store from '../../../../components/store'

/**Class representing an Variable
 * @author Raul Otano <rulyotano@gmail.com>*/
export default class Variable {
    /**
     * @param {Array} items - Items list that will be used for range calculation
     * @param {Function} setRageGroupAction - Action for setting the variable range group at state
     * @param {Function} stateRangeGroupPath - Path to the state selected range group, for instance "app.analyticMap.variable1.rangeGroup"
     * @constructor
     */
    constructor(items, setRageGroupAction = (rangeGroup)=>{}, stateRangeGroupPath = "") {
        this._name = "";
        this._rangeGroups = [];
        this._rangeView = null;
        this._items = items;
        this._displayInMapItemDetails = true;
        this._isDate = false;
        this._setRageGroupAction = setRageGroupAction;
        this._stateRangeGroupPath = stateRangeGroupPath;

        //declare this function in children implementations
        this._valueFn = item=>"";
        this._displayFn = val=>"";
        this._displayFnSuffix = val=>this._displayFn(val);
    }

    get name(){
        return this._name;
    }

    /**All Range Groups that this variable can have
     * @return Array.<RangeGroup>*/
    get rangeGroups(){
        return this._rangeGroups;
    }

    /**Currently selected range group
     * @return {RangeGroup}
     * */
    get selectedRangeGroup(){
        if (!this._stateRangeGroupPath || this._stateRangeGroupPath === "")
            return null;
        return get(store.getState(), this._stateRangeGroupPath);
    }

    /**set the selected range group
     * @param {RangeGroup} value - value to set
     * */
    set selectedRangeGroup(value){
        this._setRageGroupAction(value);
    }

    get ranges(){
        return get(this.selectedRangeGroup, "ranges");
    }

    get rangeView(){
        return this._rangeView;
    }

    get displayInMapItemDetails(){
        return this._displayInMapItemDetails;
    }

    /**True if the variable is represented as a date*/
    get isDate(){
        return this._isDate;
    }

    /**Get the element value according to the variable*/
    elementValue(element){ return this._valueFn(element); }

    /**Get the element display value according to the variable*/
    elementDisplay(element){ return this._displayFn(this._valueFn(element)); }

    /**Get the element display value according to the variable, but with suffix*/
    elementDisplaySuffix(element){ return this._displayFnSuffix(this._valueFn(element)); }

    /**Get data for rendering the chart
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], colors:[] }]}*/
    chartData(filteredElements){
        return {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]};
    }
}