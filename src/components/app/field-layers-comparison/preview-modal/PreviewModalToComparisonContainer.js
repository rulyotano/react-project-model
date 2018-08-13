import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PreviewModalComponent from './PreviewModalComponent'
import {PreloadKey as KEY} from '../layers-comparison/routesNames'
import EmptySegment from "../../../common/segment/EmptySegment";

export class PreviewModalToComparisonContainer extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <EmptySegment>
          <PreviewModalComponent source={KEY}/>   {/*TODO: create this component based on a different redux-form initialization*/}     
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModalToComparisonContainer)