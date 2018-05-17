import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow'

export class MapCloseFieldMenu extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  state = {
      isOpen: true
  }

  render() {
    const {isOpen} = this.state;
    const {t} = this.context;
    return (
        <ToolHoverWindow isOpen={isOpen} labelHeader={t("closeField.map.Close_Field_Map")}>

        </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCloseFieldMenu)
