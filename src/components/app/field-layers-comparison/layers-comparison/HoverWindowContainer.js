import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow'
import Select from '../../../common/select/Select'
import {getNumberOfMaps} from './_duck/selectors'
import {changeNumberOfMaps} from './_duck/actions'
import layerLayouts from './many-maps-comparison/layerLayouts'

class HoverWindowContainer extends PureComponent {
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  static propTypes = {
    // t: PropTypes.func
  }
  render() {
    const {numberOfMaps, onChangeNumberOfMaps} = this.props;
    const {t} = this.context;
    return (
      <ToolHoverWindow labelHeader={t("layer-comparison.Tool Window")}>
        <Select id="numberOfMapSelector" 
            name="numberOfMapSelector" 
            label={t("layer-comparison.Number of Maps")}
            attrId="id"
            attrLabel="label"
            isRequired={true}
            suggestions={layerLayouts}
            onChange={onChangeNumberOfMaps}
            value={numberOfMaps}/>

      </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  numberOfMaps: getNumberOfMaps(state)    
})

const mapDispatchToProps = (dispatch) => ({
  onChangeNumberOfMaps: (number)=>dispatch(changeNumberOfMaps(number))
})

export default connect(mapStateToProps, mapDispatchToProps)(HoverWindowContainer)