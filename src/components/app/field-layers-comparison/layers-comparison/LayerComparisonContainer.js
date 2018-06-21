import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from '../../../common/segment/EmptySegment'
import HoverWindowContainer from './HoverWindowContainer'
import {getNumberOfMaps} from './_duck/selectors'
import {withStyles, Grid} from '@material-ui/core'
import {range} from 'lodash'
import MapComponent from '../../../common/map/MapComponent'
import MapsLayoutComponent from './MapsLayoutComponent'
import {addMap} from './_duck/actions'

const styles = (theme)=>({
})

export class LayerComparisonContainer extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  render() {
    const {t} = this.context;
    const {numberOfMaps, onMapAdd} = this.props;
    const maps = range(numberOfMaps).map(i=> 
      (<MapComponent refreshMapCounter={numberOfMaps} onCreateMap={(map)=>onMapAdd(map, i)}/>))
    return (
      <EmptySegment  useScroll={false}>
          <MapsLayoutComponent maps={maps}/>
          <HoverWindowContainer/>
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  numberOfMaps: getNumberOfMaps(state)  
})

const mapDispatchToProps = (dispatch) => ({
  onMapAdd: (map, index) => dispatch(addMap(map, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(LayerComparisonContainer))
