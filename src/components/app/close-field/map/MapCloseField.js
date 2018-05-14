import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";

/**Close a field but from maps */
export class MapCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <EmptySegment useScroll={false}>
        Map Close Field  
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCloseField)
