import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createVariablesSelector, 
    createSelectedVariableSelector, 
    createSelectedVariableRangeSelector, createOpacitySelector  } from '../_duck/selectors'
import { setVariable, setOpacity, setVariableRange } from "../_duck/actions";
import VariableDropDownComponent from './VariableDropDownComponent'
import MapLegendComponent from '../../../../common/map/legend/MapLegendComponent'
import Slider from '../../../../common/pickers/slider'

class LegendInMaps extends PureComponent {
  static propTypes = {
      mapIndex: PropTypes.number.isRequired,     
      t: PropTypes.func.isRequired 
  }

  render() {
        const {mapIndex, variables, selectedVariable, selectedVariableRange,
            onVariableSelected, t, opacity, onOpacityChange, onSelectedRangeChange} = this.props;
        if (!variables)
            return null;
        return (
            <div>
                <VariableDropDownComponent id={`map-variables-${mapIndex}`}
                    label={"Variables"}
                    value={selectedVariable}
                    onChange={(variable)=>onVariableSelected(variable, mapIndex)}
                    variables={variables.variables}/>
                    <br/>
                    <MapLegendComponent t={t} variable={selectedVariable}
                        selectedRangeGroup={selectedVariableRange}
                        onSelectedRangeGroup={(selectedRange)=>onSelectedRangeChange(selectedRange, mapIndex)}/>
                    <br/>
                    <Slider value={opacity} min={0} max={1} step={0.1} onChange={(value)=>onOpacityChange(value, mapIndex)} label={t("Opacity")}/>
            </div>
        )
  }
}

const mapStateToProps = (state, props) => ({
    variables: createVariablesSelector(props.mapIndex)(state),
    selectedVariable: createSelectedVariableSelector(props.mapIndex)(state),
    selectedVariableRange: createSelectedVariableRangeSelector(props.mapIndex)(state),
    opacity: createOpacitySelector(props.mapIndex)(state)
})

const mapDispatchToProps = dispatch => ({
    onVariableSelected: (variable, index) => dispatch(setVariable(variable, index)),
    onOpacityChange: (opacity, index) => dispatch(setOpacity(opacity, index)),
    onSelectedRangeChange: (selectedRange, index) => dispatch(setVariableRange(selectedRange, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(LegendInMaps)
