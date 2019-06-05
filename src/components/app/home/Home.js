import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import EmptySegment from "../../common/segment/EmptySegment";
import LoadingComponent from "../../common/_LoadingComponent";


class DashBoard extends PureComponent{
  render(){
    return(
      <EmptySegment title="Dashboard" useScroll={false}>
        <LoadingComponent isLoading style={{height: "100%"}}/>
      </EmptySegment>
    );
  }
}
        
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);