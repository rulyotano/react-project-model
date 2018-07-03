import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createVariablesSelector, 
    createSelectedVariableSelector, 
    createSelectedVariableRangeSelector  } from '../_duck/selectors'
import { setVariable } from "../_duck/actions";
import VariableDropDownComponent from './VariableDropDownComponent'
import MapLegendTableComponent from '../../../../common/map/MapLegendTableComponent'

class LegendInMaps extends PureComponent {
  static propTypes = {
      mapIndex: PropTypes.number.isRequired,     
      t: PropTypes.func.isRequired 
  }

  render() {
        const {mapIndex, variables, selectedVariable, selectedVariableRange,
            onVariableSelected, t} = this.props;
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
                    <MapLegendTableComponent t={t} variable={selectedVariable}
                        selectedRangeGroup={selectedVariableRange}/>
            </div>
        )
  }
}

const mapStateToProps = (state, props) => ({
    variables: createVariablesSelector(props.mapIndex)(state),
    selectedVariable: createSelectedVariableSelector(props.mapIndex)(state),
    selectedVariableRange: createSelectedVariableRangeSelector(props.mapIndex)(state),
})

const mapDispatchToProps = dispatch => ({
    onVariableSelected: (variable, index) => dispatch(setVariable(variable, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(LegendInMaps)
