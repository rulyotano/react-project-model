import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from '../../../common/segment/EmptySegment'

export class LayerComparisonContainer extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <EmptySegment>
          Layer Comparison        
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerComparisonContainer)
