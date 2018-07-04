import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";

export class PreviewTableContainer extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <EmptySegment>
          Preview table        
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewTableContainer)
