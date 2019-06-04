import {find} from 'lodash';
import moment from 'moment';
import Variable from './Variable';
import RangeView from '../RangeView';
import EquallySplitRangeGroup from '../groups/EquallySplitRangeGroup';
import {VariableTypes} from '../groups/RangeGroup';
import {DATE_FORMATS_KEYS, getFormat} from '../../../dateService';

/** Class representing an Variable
 * @author Raul Otano <rulyotano@gmail.com> */
export default class TimeRangeVariable extends Variable {
  /**
     * @param {Array} items - Items list that will be used for range calculation
     * @constructor
     */
  constructor(items, setRageGroupAction, stateRangeGroupPath) {
    const dateFormat = getFormat(DATE_FORMATS_KEYS.SHORT_DATE_TIME_FORMAT_WITH_MINUTES);
    super(items, setRageGroupAction, stateRangeGroupPath);
    this._name = "Time Range";
    const rangeFn = (item, ranges)=>
      find(ranges, r=>r.minRaw <= item.dtHrLocalInicial && item.dtHrLocalInicial <= r.maxRaw);
    this._valueFn = item=>item.dtHrLocalInicial;
    this._displayFn = val=>moment(val).format(dateFormat);

    const def = new EquallySplitRangeGroup('time-range-default', 'Automatic', rangeFn, true, false, items, this._valueFn, 0, 100, this._displayFn);
    const userConfig = new EquallySplitRangeGroup('time-range-user-config', 'Configurable', rangeFn, false, true, items, this._valueFn, 0, 100, this._displayFn);

    def.variableType = VariableTypes.date;
    userConfig.variableType = VariableTypes.date;
        
    this._rangeGroups = [def, userConfig];
    this._selectedRangeGroup = this._rangeGroups[0];
    this._isDate = true;
    this._rangeView = new RangeView(true, false, false, true, true);
  }

  update(data){
    if (this._selectedRangeGroup)
      this._selectedRangeGroup.update(data);
  }

  /** Get data for rendering the chart
     * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]} */
  chartData(filterElements){
    return this._selectedRangeGroup.getDefaultChartData(filterElements);
  }


  elementDisplay(element){ return `${this._displayFn(element.dtHrLocalInicial)}-${this._displayFn(element.dtHrLocalFinal)}`; }

  elementDisplaySuffix(element){ return this.elementDisplay(element); }
}