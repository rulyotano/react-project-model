import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles, Button, Grid } from '@material-ui/core'
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow'
import LoadingButton from '../../../common/loading-button/LoadingButton'
import {initializeVariables} from './_store/actions/closeFieldMapActions'
import MapCloseFieldVariableDropdown from './MapCloseFieldVariableDropdown'
import Panel from '../../../common/collapse-panel/Panel'

const styles = {

}

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
  componentWillMount(){
    this.props.setVariables();
  }

  render() {
    const {isOpen} = this.state;
    const {classes} = this.props;
    const {t} = this.context;
    const footer = (<Grid container spacing={8}>
        <Grid item md={6}><LoadingButton>{t("closeField.map.Load_Map")}</LoadingButton></Grid>
        <Grid item md={6}><LoadingButton>{t("closeField.map.Close_Field")}</LoadingButton></Grid>        
    </Grid>)
    return (
        <ToolHoverWindow isOpen={isOpen} 
                labelHeader={t("closeField.map.Close_Field_Map")} 
                footer={footer}>

          <Panel>
            <MapCloseFieldVariableDropdown/>
          </Panel>


        </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  setVariables: ()=>dispatch(initializeVariables())    
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseFieldMenu))
