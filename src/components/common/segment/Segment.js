import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import '../../../styles/css/segment.css'
import {Fullscreen, FullscreenExit} from '@material-ui/icons';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../../app/_store/actions/appActions";
import { withRouter } from 'react-router-dom'
import Scrollbar from 'perfect-scrollbar-react';

class Segment extends PureComponent{
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
        let {children, title, isMaximized, isDashboard = false, useScroll = true} = this.props;
        let {t} = this.context;

        return(
            <div className="segment" style={{width: isMaximized? 'calc(100% - 58px)':'calc(100% - 275px)'}}>
                <div className="container">
                    <div className="container-header">
                        <h4>{t(title)}</h4>
                        {isDashboard? null :<span className="close" onClick={()=>{this.handleClose()}}>&times;</span>}
                        {isMaximized ?
                            <FullscreenExit onClick={() => this.handleSizeWindow(false)}/>
                            :
                            <Fullscreen onClick={() => this.handleSizeWindow(true)}/>
                        }

                    </div>
                    <div className="container-body" style={{ display: useScroll ? "flex" : "block" }}>
                       { useScroll ?
                        <Scrollbar>
                            <div style={{width:'100%' ,height:'100%'}}>
                                {children}
                            </div>
                        </Scrollbar> : children }
                    </div>
                </div>

            </div>
        )

    }
}

Segment.propsTypes = {
    title: PropTypes.string.isRequired,
    isDashboard: PropTypes.bool,
    useScroll: PropTypes.bool
}

Segment.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isMaximized: state.app._.maximized,
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


