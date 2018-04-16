import React, {Component} from 'react';

import '../../../styles/css/segment.css'
import FullScreenIco from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenExitIco from 'material-ui/svg-icons/navigation/fullscreen-exit';
import {connect} from 'react-redux';
import {redirectToHome, setSizeToMax, setSizeToMin} from "../_store/actions/appActions";
import {Redirect} from "react-router-dom";

class Segment extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMaximized: props.isMaximized,
            toHome:props.toHome,
            isDashboard:props.isDashboard
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
        this.props.redirectToHome();
    };

    render(){
        let {children, title} = this.props;
        let {isMaximized, toHome, isDashboard} = this.state;

        if(toHome) {
            this.props.minimize();
            return (<Redirect to='/'/>);
        }
        return(
            <div className="segment" style={{width: isMaximized? 'calc(100% - 58px)':'calc(100% - 275px)'}}>
                <div className="container">
                    <div className="container-header">
                        <h4>{title ? title:'Title'}</h4>
                        {isDashboard?'':<span className="close" onClick={()=>{this.handleClose()}}>&times;</span>}
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
    isMaximized: state.app.maximized,
    toHome: state.app.toHome
});

const mapDispatchToProps = (dispatch) => ({
    maximize(){
        dispatch(setSizeToMax())
    },
    minimize(){
        dispatch(setSizeToMin())
    },
    redirectToHome(){
        dispatch(redirectToHome())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Segment);


