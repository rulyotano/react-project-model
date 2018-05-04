import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import ApplicationIco from 'material-ui/svg-icons/navigation/apps';
import LocationOnIco from 'material-ui/svg-icons/communication/location-on';
import ChartIco from 'material-ui/svg-icons/editor/insert-chart';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../_store/actions/appActions";


class CommonList extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            isOpen:props.isOpen
        }
    }
    handleBox(){
        let {isOpen} = this.state;
        this.setState({isOpen:!isOpen});
    }
    render(){
        let {icon, text, isMaximized, children} = this.props;
        let {isOpen} = this.state;
        return(
            <li className={isMaximized? "with-border":''} onClick={()=>{this.handleBox()}}>
                {icon}{isMaximized? '':text}

                {isOpen && !isMaximized ? <ul style={{paddingTop:'5px'}}>{children}</ul> :''}

            </li>
        )
    }
}

const CommonListItem = ({url, icon, text, isMaximized, match})=>(<li className={isMaximized? "with-border":''}><Link to={`${match.url}${url}`}>{icon}{isMaximized? '':text}</Link></li>);


class Sidebar extends PureComponent{
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
                    <CommonListItem url="" match={match} icon={<ApplicationIco/>} text="Dashboard" isMaximized={isMaximized}/>
                    <CommonListItem url="monitoring"  match={match} icon={<LocationOnIco/>} text="Monitoring" isMaximized={isMaximized}/>
                    <CommonList isMaximized={isMaximized} icon={<LocationOnIco/>} text="Caique" isOpen={false}>
                        <CommonListItem url="vallim"  match={match} icon={<LocationOnIco/>} text="Vallim" isMaximized={isMaximized}/>
                        <CommonListItem url="araujo"  match={match} icon={<LocationOnIco/>} text="Araujo" isMaximized={isMaximized}/>

                    </CommonList>
                    <CommonListItem url="test-map" match={match} icon={<LocationOnIco/>} text="Test Map" isMaximized={isMaximized}/>
                    <CommonListItem url="chart-test" match={match} icon={<ChartIco/>} text="Test Chart" isMaximized={isMaximized}/>
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