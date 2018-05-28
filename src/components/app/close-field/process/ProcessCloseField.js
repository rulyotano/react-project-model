import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import {clear} from "./_store/actions/closeFieldProcessActions";
import { withStyles, Button } from '@material-ui/core'
import { Redirect } from "react-router-dom";
import urlJoin from "url-join";
import routesNames from "../routesNames";
import PROCESS_KEY from "./KEY";
import CloseFieldModal from "../close-modal/CloseFieldModal";

const styles = theme => ({
})

/**Close a field but from process */
export class ProcessCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  state = {
    open: false
  }

  componentWillUnmount(){
    this.props.clear();
  }

  closeField(){
    this.setState({open: true})
  }

  render() {
    const {classes, loaded} = this.props;
    const {open} = this.state;
    
    if (!loaded)
      return <Redirect to={urlJoin(routesNames.BASE, PROCESS_KEY)}/>

    return (
      <EmptySegment useScroll={false}>
          <Button onClick={()=>this.closeField()}>Close Field</Button>
          <CloseFieldModal open={open}/>
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
