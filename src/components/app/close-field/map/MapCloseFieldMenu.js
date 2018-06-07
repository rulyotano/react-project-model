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
import CollapsePanel from '../../../common/collapse-panel/CollapsePanel'
import Panel from '../../../common/collapse-panel/Panel'
import * as mapService from '../../../../service/maps/mapService';

const styles = {

}

export class MapCloseFieldMenu extends PureComponent {
  static propTypes = {
    onCloseFieldClick: PropTypes.func.isRequired
  }
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  state = {
      isOpen: true,
      workAreaValue: { farm: "", sector: "", field: "" }
  }
  componentWillMount(){
    this.props.setVariables();
  }

  componentWillReceiveProps(newProps){
    const {fieldSelected: fs} = newProps;
    if (fs !== this.props.fieldSelected){
      //keep the work area fields in state updated
      this.setState({workAreaValue: fs ? 
        { farm: fs.cdFazenda, sector: fs.cdZona, field: fs.cdTalhao } : 
        { farm: "", sector: "", field: "" }
      })
    }
  }

  /**On Field selection changed, for controlling the selected field in the map */
  onFieldChange(value){
    this.setState({workAreaValue: value}, ()=>{
      const {mapMapped, onCloseFieldClick} = this.props;
      if (mapMapped && value){
        const feature = get(mapMapped, `${value.farm}.${value.sector}.${value.field}`)
        mapService.setSelectedField(feature)
      }
    })
  }

  onPaintMapClick(){
    const {paintMap} = this.props;
    const filters = { workArea: this.state.workAreaValue };
    paintMap(filters);
  }

  render() {
    const {isOpen, workAreaValue} = this.state;
    const {classes, canPaintMap, fieldSelected: fs,
            onCloseFieldClick, selectedVariable} = this.props;
    const {t} = this.context;
    const rangesExpanded = !!selectedVariable;
    const footer = (<Grid container spacing={8}>
        <Grid item md={6}><LoadingButton disabled={!canPaintMap}  onClick={()=>this.onPaintMapClick()}>{t("closeField.map.Load_Map")}</LoadingButton></Grid>
        <Grid item md={6}><LoadingButton disabled={!fs} onClick={()=>onCloseFieldClick(workAreaValue)} >{t("closeField.map.Close_Field")}</LoadingButton></Grid>        
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
          <CollapsePanel title={"Ranges"} expanded={rangesExpanded}>
            <MapCloseFieldRangeTable/>
          </CollapsePanel>
          
          {/* TODO: i18n */}
          <CollapsePanel title={"Work Area"}>
            <WorkAreaSelector onChange={(value)=>this.onFieldChange(value)} value={workAreaValue}/>
          </CollapsePanel>


        </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => {
  const selectedVariable = state.app.closeField.map.selected.variable;
  return {
    mapMapped: state.map.mapMappedGeoJson,
    canPaintMap: !!selectedVariable,
    selectedVariable,
    fieldSelected: get(state, "map.selected.properties")
  }
}

const mapDispatchToProps = dispatch => ({
  setVariables: ()=>dispatch(initializeVariables()),    
  paintMap: (filters)=>dispatch(paintMap(filters)),    
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseFieldMenu))
