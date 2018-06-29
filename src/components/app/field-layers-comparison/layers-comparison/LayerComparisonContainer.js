import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from '../../../common/segment/EmptySegment'
import LoadingComponent from '../../../common/_LoadingComponent'
import HoverWindowContainer from './HoverWindowContainer'
import {getNumberOfMaps, getLoadingData, getData} from './_duck/selectors'
import {loadData, clear} from './_duck/actions'
import {range} from 'lodash'
import LayerComparisonMapContainer from './LayerComparisonMapContainer'
import MapsLayoutComponent from './MapsLayoutComponent'


export class LayerComparisonContainer extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  componentWillMount(){
    const {onLoadData} = this.props;
    onLoadData()
  }
  componentWillUnmount(){
    this.props.onClear();
  }
  render() {
    const {numberOfMaps, loadingData, data} = this.props;
    
    const maps = range(numberOfMaps).map(i=> 
      (<LayerComparisonMapContainer mapIndex={i} numberOfMaps={numberOfMaps}/>))
    return (
      <EmptySegment useScroll={false}>
        { loadingData ? <LoadingComponent/> : null}
        { !data & !loadingData ? "TODO: Error Loading Data" : null}
        { !!data ? <React.Fragment>
            <MapsLayoutComponent maps={maps}/>
            <HoverWindowContainer/>
          </React.Fragment> : null
        }
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  numberOfMaps: getNumberOfMaps(state),
  loadingData: getLoadingData(state),
  data: getData(state)
})

const mapDispatchToProps = (dispatch) => ({
  onLoadData: ()=>dispatch(loadData()),
  onClear: ()=>dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerComparisonContainer)
