import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";

/**Close a field but from process */
export class ProcessCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <EmptySegment useScroll={false}>
          From Process
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCloseField)
