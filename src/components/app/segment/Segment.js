import React, {Component} from 'react';

import '../../../styles/css/segment.css'
import FullScreenIco from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenExitIco from 'material-ui/svg-icons/navigation/fullscreen-exit';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../_store/actions/appActions";

class Segment extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMaximized: false
        }
    }

    componentWillReceiveProps(newProps){
        this.setStateFromProps(newProps)
    }
    setStateFromProps(newProps){
        this.setState(newProps);
    }

    handleSizeWindow(toMaximize){
        if(toMaximize)
            this.props.maximize();
        else
            this.props.minimize();
    };
    handleClose(){

    };

    render(){
        let {children, title} = this.props;
        let {isMaximized} = this.state;

        return(
            <div className="segment" style={{width: isMaximized? 'calc(100% - 75px)':'calc(100% - 275px)'}}>
                <div className="container">
                    <div className="container-header">
                        <h3>{title ? title:'Title'}</h3>
                        <span className="close" onClick={()=>{this.handleClose()}}>&times;</span>
                        {isMaximized ?
                            <FullScreenExitIco onClick={() => this.handleSizeWindow(false)}/>
                            :
                            <FullScreenIco onClick={() => this.handleSizeWindow(true)}/>
                        }

                    </div>
                    <div className="container-body">
                        {children}
                    </div>
                </div>

            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    isMaximized: state.app.maximized
});

const mapDispatchToProps = (dispatch) => ({
    maximize(){
        dispatch(setSizeToMax())
    },
    minimize(){
        dispatch(setSizeToMin())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Segment);


