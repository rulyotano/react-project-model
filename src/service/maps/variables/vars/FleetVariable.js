import {find} from 'lodash';
import Variable from './Variable';
import ByRangeGroup from '../groups/ByRangeGroup';
import RangeView from '../RangeView';

/** Class representing Fleet Variable
 * @author Raul Otano <rulyotano@gmail.com> */
export default class FleetVariable extends Variable {
  /**
     * @param {Array} items - Items list that will be used for range calculation
     * @param dataStates - States that comes with the analytic map data. (used states)
     * @constructor
     */
  constructor(items,setRageGroupAction, stateRangeGroupPath) {
    super(items, setRageGroupAction, stateRangeGroupPath);
    this._name = "Fleets";
    const rangeFn = (item, ranges)=>
      find(ranges, r=>r.valueRaw === item.cdEquipamento);

    this._valueFn = item=>item.cdEquipamento;
    this._displayFn = val=>val;
    this._rangeGroups = [
      new ByRangeGroup('fleets-default', 'By FleetId', rangeFn, items, item=>item.cdEquipamento),
    ];
    this._selectedRangeGroup = this._rangeGroups[0];
    this._rangeView = new RangeView(true, true);
    this._displayInMapItemDetails = false;
  }

  /** Get data for rendering the chart
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]} */
  chartData(filterElements){
    return this._selectedRangeGroup.getDefaultChartData(filterElements);
  }
}