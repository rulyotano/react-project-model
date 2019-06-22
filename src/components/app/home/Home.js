import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import LoadingComponent from "../../common/_LoadingComponent";


class DashBoard extends PureComponent{
  render(){
    return(
      <div>
        <LoadingComponent isLoading style={{height: "100%"}}/>
      </div>
    );
  }
}
        
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);