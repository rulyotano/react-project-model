import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow'
// import ToolHoverWindow from './_duck/selectors'

class HoverWindowContainer extends PureComponent {
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  static propTypes = {
    // t: PropTypes.func
  }
  render() {
    const {t} = this.context;
    return (
      <ToolHoverWindow labelHeader={t("layer-comparison.Tool Window")}>

      </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HoverWindowContainer)