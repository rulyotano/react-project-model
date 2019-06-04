import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow';
import Select from '../../../common/select/Select';
import {getNumberOfMaps, getSelectedMapType} from './_duck/selectors';
import {changeNumberOfMaps, setMapType} from './_duck/actions';
import layerLayouts from './many-maps-comparison/layerLayouts';
import mapComparisonTypes, {MANY_MAPS_COMPARISON} from './mapComparisonTypes';

class HoverWindowContainer extends PureComponent {
  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  static propTypes = {
    // t: PropTypes.func
  }

  render() {
    const {numberOfMaps, onChangeNumberOfMaps, mapTypes, onMapTypeChange, selectedMapType} = this.props;
    const {t} = this.context;
    return (
      <ToolHoverWindow labelHeader={t("layerComparison.ToolWindow")}>

        <Select id="mapTypes"
          name="mapTypes"
          label={t("layerComparison.MapType")}
          attrId="id"
          attrLabel="textKey"
          isRequired
          suggestions={mapTypes}
          onChange={onMapTypeChange}
          value={selectedMapType}/>

        <br/>
        <br/>

        { selectedMapType === MANY_MAPS_COMPARISON ? <div>
          <Select id="numberOfMapSelector" 
            name="numberOfMapSelector" 
            label={t("layerComparison.NumberOfMaps")}
            attrId="id"
            attrLabel="label"
            isRequired
            suggestions={layerLayouts}
            onChange={onChangeNumberOfMaps}
            value={numberOfMaps}/>
        </div> : null}

      </ToolHoverWindow>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfMaps: getNumberOfMaps(state),
  selectedMapType: getSelectedMapType(state),
  mapTypes: mapComparisonTypes,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeNumberOfMaps: (number)=>dispatch(changeNumberOfMaps(number)),
  onMapTypeChange: (mapType)=>dispatch(setMapType(mapType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HoverWindowContainer);