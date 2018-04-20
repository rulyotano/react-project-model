import React, {Component} from 'react';

import '../../../styles/css/segment.css'
import FullScreenIco from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenExitIco from 'material-ui/svg-icons/navigation/fullscreen-exit';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../../app/_store/actions/appActions";
import { withRouter } from 'react-router-dom'
import Scrollbar from 'perfect-scrollbar-react';
import 'perfect-scrollbar-react/dist/style.min.css';

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
        this.props.history.push('/');
    };

    render(){
        let {children, title} = this.props;
        let {isMaximized, isDashboard} = this.state;

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
                        <Scrollbar>
                            <div style={{width:'95%' ,height:'100%'}}>
                                {children}
                            </div>
                        </Scrollbar>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Segment));


