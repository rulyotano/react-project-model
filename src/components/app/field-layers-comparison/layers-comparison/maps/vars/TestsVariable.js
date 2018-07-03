import Variable from '../../../../../../service/maps/variables/vars/Variable'
import {find, round} from 'lodash'
import EquallySplitRangeGroup from '../../../../../../service/maps/variables/groups/EquallySplitRangeGroup'
import RangeView from '../../../../../../service/maps/variables/RangeView'

/**Class representing Fleet Variable*/
export default class TestsVariable extends Variable {
    /**
     * @param {Array} items - Items list that will be used for range calculation
     * @param dataStates - States that comes with the analytic map data. (used states)
     * @constructor
     */
    constructor(key, items, setRageGroupAction, rangeGroupSelector) {
        super(items, setRageGroupAction, rangeGroupSelector);
        this._name = "Test Variable";
        this._key = key;
        
        const rangeFn = (item, ranges)=>
            find(ranges, r=>r.minRaw <= item.properties.VL_VALOR_VARIAVEL && item.properties.VL_VALOR_VARIAVEL <= r.maxRaw);

        this._valueFn = item=>item.properties.VL_VALOR_VARIAVEL;
        this._displayFn = val=>round(val, 2)
        this._rangeGroups = [
            new EquallySplitRangeGroup(`test-range-default-${key}`, 'Automatic', rangeFn, true, false, items, this._valueFn, 0, 100, this._displayFn),
            new EquallySplitRangeGroup(`test-range-user-config-${key}`, 'Configurable', rangeFn, false, true, items, this._valueFn, 0, 100, this._displayFn),
        ];
        this._selectedRangeGroup = this._rangeGroups[0];
        this._rangeView = new RangeView(true, false, false, true, true);
        this._displayInMapItemDetails = false;
    }

    get id(){
        return `${this._name}-${this._key}`
    }

    /**Get data for rendering the chart
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]}*/
    chartData(filterElements){
        return this._selectedRangeGroup.getDefaultChartData(filterElements);
    }
}