import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import {clear} from "./_store/actions/closeFieldProcessActions";
import { withStyles } from '@material-ui/core'
import { Redirect } from "react-router-dom";
import urlJoin from "url-join";
import routesNames from "../routesNames";
import PROCESS_KEY from "./KEY";

const styles = theme => ({
})

/**Close a field but from process */
export class ProcessCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  componentWillUnmount(){
    this.props.clear();
  }

  render() {
    const {classes, loaded} = this.props;
    
    if (!loaded)
      return <Redirect to={urlJoin(routesNames.BASE, PROCESS_KEY)}/>

    return (
      <EmptySegment useScroll={false}>
          From Process
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  loaded: state.app.closeField.process.data.length > 0,
})

const mapDispatchToProps = (dispatch) => ({
  clear: ()=>dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProcessCloseField))
