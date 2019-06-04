import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withStyles, Button, Toolbar } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import {keys, values} from "lodash";
import EmptySegment from "../../../common/segment/EmptySegment";
import {clear} from "./_duck/actions";
import {getData, createGetIsLoaded} from "./_duck/selectors";
import {urlJoin} from "../../../../service/helperService";
import routesNames from "../routesNames";
import {PreloadKey as PROCESS_KEY} from "./routesNames";
import CloseFieldModal from "../close-modal/CloseFieldModal";
import ProcessCloseFieldTable from "./ProcessCloseFieldTableComponent";

const styles = theme => ({
  tableContainer: {
    height: "calc(100% - 64px)"
  },
  footerContainer: {
    height: "64px"
  }
});

/** Close a field but from process */
export class ProcessCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  state = {
    showCloseFieldModal: false,
    selected: null,
  }

  componentWillUnmount(){
    this.props.clear();
  }

  closeField(){
    this.setState({showCloseFieldModal: true});
  }

  onCloseFieldModalClose(){
    this.setState({showCloseFieldModal: false});
  }

  onSelectionChange(selection){
    if (selection && keys(selection).length > 0){
      this.setState({selected: values(selection)[0]});
    } else {
      this.setState({selected: null});
    }
  }

  render() {
    const {classes, data, loaded} = this.props;
    const {showCloseFieldModal, selected} = this.state;
    
    if (!loaded)
      return <Redirect to={urlJoin("/", routesNames, PROCESS_KEY)}/>;

    return (
      <EmptySegment useScroll={false}>

        <div className={classes.tableContainer}>          
          <ProcessCloseFieldTable data={data} onSelectionChange={(selection)=>this.onSelectionChange(selection)}/>
        </div>
        <div className={classes.footerContainer}>         
          <Toolbar>
            <Button disabled={!selected} onClick={()=>this.closeField()}>Close Field</Button>  {/* TODO: translate */}
          </Toolbar> 
        </div>

        <CloseFieldModal open={showCloseFieldModal}
          farm={selected ? `${selected.farm  }` : ""}
          sector={selected ? `${selected.sector  }` : ""}
          field={selected ? `${selected.field  }` : ""}
          closeModal={()=>this.onCloseFieldModalClose()}/>
      </EmptySegment>
    );
  }
}

const getIsLoaded = createGetIsLoaded();

const mapStateToProps = (state) => ({
  loaded: getIsLoaded(state),
  data: getData(state),
});

const mapDispatchToProps = (dispatch) => ({
  clear: ()=>dispatch(clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProcessCloseField));
