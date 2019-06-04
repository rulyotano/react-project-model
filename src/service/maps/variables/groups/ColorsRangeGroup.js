import { isEmpty } from "lodash";
import interpolate from "color-interpolate";
import RangeGroup, { VariableTypes } from "./RangeGroup";
import Range from "../Range";
import localStorageService from "../../../localStorageService";

/** Class representing an 'equi' Range Group. Receive a group function or key that will be used to
 * group the items. Also will receive an optional color function, for getting the color of each item.
 * @author Raul Otano <rulyotano@gmail.com> */
export default class ColorsRangeGroup extends RangeGroup {
  constructor(
    id,
    name,
    rangeFn,
    items,
    valueFn,
    displayFn,
    size = 8,
    colors = ["white", "red"],
    rangeSuffix = ""
  ) {
    super(id, name, rangeFn, false, true);
    this._items = items;
    this._valueFn = valueFn;
    this._size = size;
    this._colors = colors;
    this._displayFn = displayFn;
    this._rangeSuffix = rangeSuffix;
    this._storageKey = `ranges-storage-key-${id}`;
    this._ranges = this._createRanges();
    this.variableType = VariableTypes.number;
  }

  /** Create the ranges for this range group
   * @return {Array.<Range>}
   */
  _createRanges() {
    if (!this._canEdit) return this._getRanges();
    const previousSaved = localStorageService.load(this._storageKey);
    let result = this._ranges;
    if (previousSaved)
      result = this.loadRangeFromString(
        previousSaved,
        this._rangeSuffix,
        this._displayFn
      );
    else if (isEmpty(this._ranges)) result = this._getRanges();
    return result;
  }

  _getRanges() {
    const colors = this._colors;
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    const n = this._size;

    const itemCount = this._items.length;
    for (let i = 0; i < itemCount; i++) {
      const item = this._items[i];

      const val = this._valueFn(item);
      if (val === -1 || (!val && val !== 0)) return true;
      max = Math.max(max, val);
      min = Math.min(min, val);
    }

    const result = [];

    if (max === Number.MIN_VALUE || min === Number.MAX_VALUE) return result;

    const valueInc = (max - min) / n;
    const colorsInc = 1 / (n - 1);

    const colorMap = interpolate(colors);
    for (
      let val = min, clr = 0, i = 0;
      i < n;
      i++, val += valueInc, clr += colorsInc
    ) {
      result.push(
        new Range(
          i,
          colorMap(clr),
          null,
          null,
          val,
          val + valueInc,
          this._rangeSuffix,
          this._displayFn
        )
      );
    }
    return result;
  }

  /** Min value that is calculated, if not calculated Number.MIN_VALUE per default */
  get calculatedMin() {
    return this._calculatedMin;
  }

  /** Max value that is calculated, if not calculated Number.MAX_VALUE per default */
  get calculatedMax() {
    return this._calculatedMax;
  }

  /** Get a default data for rendering the chart, that works with most eq. split range groups
   * @param filterElements {Array} - Array of filtered elements for generating the chart
   * @param rangeDescriptionFn {Function} - Function that given the range and the suffix returns the range pie description
   * @return {Object} Object in the form {labels:[], datasets:[{ data:[], backgroundColor:[], hoverBackgroundColor:[] }]} */
  getDefaultChartData(
    filterElements,
    rangeDescriptionFn = (range, suffix) => `${range.min}-${range.max}${suffix}`
  ) {
    return super.getDefaultChartData(filterElements, rangeDescriptionFn);
  }

  clear() {
    if (this._canEdit) {
      localStorageService.remove(this._storageKey);
      this._ranges = null;
      this._ranges = this._createRanges();
    }
  }

  get colors() {
    return this._colors;
  }

  get size() {
    return this._size;
  }

  update(values) {
    if (values.colors) this._colors = values.colors;
    if (values.size !== undefined) this._size = values.size;
    if (!values.color && values.size === undefined) return;
    this._ranges = this._getRanges();
  }

  save() {
    localStorageService.save(this._storageKey, this.toString());
  }

  toString() {
    const rangeStrArray = this.ranges.map(r => r.toString());
    rangeStrArray.unshift(this._colors);
    rangeStrArray.unshift(this._size);
    return JSON.stringify(rangeStrArray);
  }

  loadRangeFromString(str, suffix, displayFn) {
    const list = JSON.parse(str) || [];
    this._size = list.shift() * 1;
    this._colors = list.shift();
    this._ranges = list.map(strItem =>
      Range.createFromString(strItem, suffix, displayFn)
    );
    return this._ranges;
  }
}
