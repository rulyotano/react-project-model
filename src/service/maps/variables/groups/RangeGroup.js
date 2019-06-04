import { sumBy, groupBy, forEach, round, cloneDeep } from "lodash";
import Range from "../Range";

const NONE = "none";
const DATE_TIME = "date-time";
const NUMBER = "number";

export const VariableTypes = {
  none: NONE,
  date: DATE_TIME,
  number: NUMBER
};

/** Class representing how each Range item is going to be showed in the table. Each
 * @author Raul Otano <rulyotano@gmail.com> */
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
  constructor(
    id,
    name,
    rangeFn = (item, ranges) => null,
    hasRangePicker = false,
    canEdit = false
  ) {
    this._id = id;
    this._name = name;
    this._rangeFn = rangeFn;
    this._hasRangePicker = hasRangePicker;
    this._canEdit = canEdit;
    this._ranges = [];
    this._variableType = VariableTypes.NONE;
  }

  /** Get ranges
   * @return {Array.<Range>} Ranges */
  get ranges() {
    return this._ranges;
  }

  set ranges(value) {
    this._ranges = value;
  }

  /** Get grouped elements
   * @param {Array} filterElements - elements after applying filters to them
   * @return {Array.<Object.<Object, Range>>} */
  groupedElements(filterElements) {
    return filterElements.map(item => {
      const range = this._rangeFn(item, this._ranges);
      if (range)
        return { ...item, color: range.color, insideRange: true, range };
      return item;
    });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get hasRangePicker() {
    return this._hasRangePicker;
  }

  get canEdit() {
    return this._canEdit;
  }

  get variableType() {
    return this._variableType;
  }

  set variableType(value) {
    this._variableType = value;
  }

  /** Update the Range Group */
  update(data) {
    // implement in children
  }

  /** Save range group to some storage */
  save() {
    // implement in children
  }

  /** Get a default data for rendering the chart, that works with most eq. split range groups
   * @param filterElements {Array} - Array of filtered elements for generating the chart
   * @param rangeDescriptionFn {Function} - Function that given the range and the suffix returns the range pie description
   * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]} */
  getDefaultChartData(
    filterElements,
    rangeDescriptionFn = (range, suffix) => ""
  ) {
    const timeFn = items => sumBy(items, item => item.vlTempoSegundos);

    const filtered = this.groupedElements(filterElements).filter(
      item => item.range
    );
    const classifiedItems = groupBy(filtered, item => item.range.id);

    const result = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }]
    };
    const total = timeFn(filtered); // total = sum in seconds

    const suffix = this._rangeSuffix ? ` (${this._rangeSuffix})` : "";

    forEach(classifiedItems, (items, key) => {
      result.labels.push(rangeDescriptionFn(items[0].range, suffix));
      const value = (timeFn(items) / total) * 100;
      result.datasets[0].data.push(round(value, 2));
      result.datasets[0].backgroundColor.push(items[0].color);
      result.datasets[0].hoverBackgroundColor.push(items[0].color);
    });
    return result;
  }

  toString() {
    const rangeStrArray = this.ranges.map(r => r.toString());
    return JSON.stringify(rangeStrArray);
  }

  /**
   * Load the current range from string
   * @param {string} str - string formatted in the form value1;vale2;...;valueN
   * @param {string} suffix
   * @param displayFn
   * @return {Range} - new created range */
  loadRangeFromString(str, suffix, displayFn) {
    const list = JSON.parse(str);
    this._ranges = list.map(strItem =>
      Range.createFromString(strItem, suffix, displayFn)
    );
    return this._ranges;
  }

  clone() {
    return cloneDeep(this);
    // var result = new RangeGroup(this._id, this._name, this._rangeFn, this._hasRangePicker, this._canEdit);
    // result.ranges = [...this._ranges.map(it=>it.clone())];
    // result.variableType = this._variableType;
    // return result;
  }
}
