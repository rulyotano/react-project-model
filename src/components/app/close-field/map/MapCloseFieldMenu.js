import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { withStyles, Button, Grid } from '@material-ui/core'
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow'
import LoadingButton from '../../../common/loading-button/LoadingButton'
import {initializeVariables, paintMap} from './_store/actions/closeFieldMapActions'
import MapCloseFieldVariableDropdown from './MapCloseFieldVariableDropdown'
import MapCloseFieldRangeTable from './MapCloseFieldRangeTable'
import WorkAreaSelector from '../../../common/work-area-selector/WorkAreaSelector'
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
    const {classes, paintMap, canPaintMap, fieldSelected: fs} = this.props;
    const {t} = this.context;
    const workAreaValue = !fs ? { farm: "", sector: "", field: "" } : { farm: fs.cdFazenda, sector: fs.cdZona, field: fs.cdTalhao };
    const footer = (<Grid container spacing={8}>
        <Grid item md={6}><LoadingButton disabled={!canPaintMap}  onClick={()=>paintMap()}>{t("closeField.map.Load_Map")}</LoadingButton></Grid>
        <Grid item md={6}><LoadingButton>{t("closeField.map.Close_Field")}</LoadingButton></Grid>        
    </Grid>)
    return (
        <ToolHoverWindow isOpen={isOpen} 
                labelHeader={t("closeField.map.Close_Field_Map")} 
                footer={footer}
                width="400px">

          <Panel>
            <MapCloseFieldVariableDropdown/>
          </Panel>

          {/* TODO: i18n */}
          <Panel title={"Ranges"}>
            <MapCloseFieldRangeTable/>
          </Panel>
          
          {/* TODO: i18n */}
          <Panel title={"Work Area"}>
            <WorkAreaSelector value={workAreaValue} isHorizontal={false}/>
          </Panel>


        </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  canPaintMap: !!state.app.closeField.map.selected.variable,
  fieldSelected: get(state, "map.selected.properties")
})

const mapDispatchToProps = dispatch => ({
  setVariables: ()=>dispatch(initializeVariables()),    
  paintMap: ()=>dispatch(paintMap()),    
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseFieldMenu))
