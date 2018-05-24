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
import * as mapService from '../../../../service/maps/mapService';

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
      isOpen: true,
      workAreaValue: { farm: "", sector: "", field: "" }
  }
  componentWillMount(){
    this.props.setVariables();
  }

  componentWillReceiveProps(newProps){
    const {fieldSelected: fs} = newProps;
    if (fs !== undefined && fs !== this.props.fieldSelected){
      this.setState({workAreaValue: fs ? 
        { farm: fs.cdFazenda, sector: fs.cdZona, field: fs.cdTalhao } : 
        { farm: "", sector: "", field: "" }
      })
    }
  }

  onFieldChange(value){
    this.setState({workAreaValue: value}, ()=>{
      const {mapMapped} = this.props;
      if (mapMapped && value){
        const feature = get(mapMapped, `${value.farm}.${value.sector}.${value.field}`)
        if (feature)
          mapService.setSelectedField(feature)
      }
    })
  }

  render() {
    const {isOpen, workAreaValue} = this.state;
    const {classes, paintMap, canPaintMap, fieldSelected: fs} = this.props;
    const {t} = this.context;
    const footer = (<Grid container spacing={8}>
        <Grid item md={6}><LoadingButton disabled={!canPaintMap}  onClick={()=>paintMap()}>{t("closeField.map.Load_Map")}</LoadingButton></Grid>
        <Grid item md={6}><LoadingButton disabled={!fs}  >{t("closeField.map.Close_Field")}</LoadingButton></Grid>        
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
            <WorkAreaSelector onChange={(value)=>this.onFieldChange(value)} value={workAreaValue} isHorizontal={false}/>
          </Panel>


        </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  mapMapped: state.map.mapMappedGeoJson,
  canPaintMap: !!state.app.closeField.map.selected.variable,
  fieldSelected: get(state, "map.selected.properties")
})

const mapDispatchToProps = dispatch => ({
  setVariables: ()=>dispatch(initializeVariables()),    
  paintMap: ()=>dispatch(paintMap()),    
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseFieldMenu))
