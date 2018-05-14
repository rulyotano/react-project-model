import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Apps, LocationOn, MultilineChart, ArrowBack, ArrowForward, ExpandMore, ExpandLess } from '@material-ui/icons';
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
            <div>
                <li className={isMaximized? "with-border":''} onClick={()=>{this.handleBox()}}>
                    {icon}{isMaximized? '':text}
                    {isMaximized ? '' :isOpen ? <ExpandLess className="expand-less"/> : <ExpandMore className="expand-more"/>}
                </li>
                {isOpen && !isMaximized ? <ul className="sub-menu" style={{paddingTop:'5px'}}>{children}</ul> :''}
            </div>
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
                            <ArrowBack/>
                        </div>
                    </div>
                }
                <ul style={{paddingTop:isMaximized?'15px':'30px'}}>
                    {isMaximized ? <li className="with-border" onClick={()=>{this.resize()}}><ArrowForward/></li>:''}
                    <CommonListItem url="" match={match} icon={<Apps/>} text="Dashboard" isMaximized={isMaximized}/>
                    <CommonListItem url="monitoring"  match={match} icon={<LocationOn/>} text="Monitoring" isMaximized={isMaximized}/>
                    <CommonList isMaximized={isMaximized} icon={<LocationOn/>} text="Close Field" isOpen={false}>    {/**TODO: i18n*/}
                        <CommonListItem url="close-field?source=0"  match={match} icon={<LocationOn/>} text="Map" isMaximized={isMaximized}/>  {/**TODO: i18n*/}
                        <CommonListItem url="close-field?source=1"  match={match} icon={<LocationOn/>} text="Process" isMaximized={isMaximized}/>   {/**TODO: i18n*/}
                    </CommonList>
                    <CommonListItem url="chart-test" match={match} icon={<MultilineChart/>} text="Test Chart" isMaximized={isMaximized}/>
                    <CommonListItem url="form-test" match={match} icon={<MultilineChart/>} text="Form Test" isMaximized={isMaximized}/>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isMaximized: state.app._.maximized
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