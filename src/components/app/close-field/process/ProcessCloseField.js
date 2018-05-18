import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import {clear} from "./_store/actions/closeFieldProcessActions";

/**Close a field but from process */
export class ProcessCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  componentWillUnmount(){
    this.props.clear();
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

const mapDispatchToProps = (dispatch) => ({
  clear: ()=>dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCloseField)
