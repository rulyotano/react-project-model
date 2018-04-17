import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ApplicationIco from 'material-ui/svg-icons/navigation/apps';
import LocationOnIco from 'material-ui/svg-icons/communication/location-on';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../_store/actions/appActions";


class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMaximized:props.isMaximized
        }
    }
    componentWillReceiveProps(newProps){
        this.setStateFromProps(newProps)
    }

    setStateFromProps(newProps){
        this.setState(newProps);
    }
    resize(){
        if(this.state.isMaximized)
            this.props.minimize();
        else
            this.props.maximize();
    }

    render(){
        let {match} = this.props;
        let {isMaximized} = this.state;


        return(
            <div className="sidebar" style={{width:isMaximized?'48px':'260px'}}>
                {isMaximized?
                    '':
                    <div className="resize" onClick={()=>{this.resize()}}>
                        <div className="circle">
                            <ArrowLeft/>
                        </div>
                    </div>
                }
                <ul style={{paddingTop:isMaximized?'15px':'30px'}}>
                    {isMaximized ? <li className="with-border" onClick={()=>{this.resize()}}><ArrowRight/></li>:''}
                    <li className={isMaximized? "with-border":''}><Link to={`${match.url}`}><ApplicationIco/>{isMaximized? '':'Dashboard'}</Link></li>
                    <li className={isMaximized? "with-border":''}><Link to={`${match.url}monitoring`}><LocationOnIco/>{isMaximized? '':'Monitoring'}</Link></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isMaximized: state.app.maximized
});

const mapDispatchToProps = (dispatch)=>({
    maximize(){
        dispatch(setSizeToMax())
    },
    minimize(){
        dispatch(setSizeToMin())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);