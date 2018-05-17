import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Apps, LocationOn, MultilineChart, ArrowBack, ArrowForward, ExpandMore, ExpandLess,
Home } from '@material-ui/icons';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../_store/actions/appActions";
import ROUTES from "../routeNames";
import urlJoin from "url-join";


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
                {isOpen && !isMaximized ? <ul className="sub-menu" style={{paddingTop:'5px'}}>{children}</ul> :
                    ''
                }
            </div>
        )
    }
}

const CommonListItem = ({url, icon, text, isMaximized})=>(<li className={isMaximized? "with-border":''}><Link to={url}>{icon}{isMaximized? '':text}</Link></li>);


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
                    <CommonListItem url={ROUTES.BASE} icon={<Home/>} text="Home" isMaximized={isMaximized}/>{/**TODO: i18n*/}
                    <CommonListItem url={ROUTES.MONITORING} icon={<LocationOn/>} text="Monitoring" isMaximized={isMaximized}/>
                    <CommonList isMaximized={isMaximized} icon={<LocationOn/>} text="Close Field" isOpen={false}>    {/**TODO: i18n*/}
                        <CommonListItem url={urlJoin(ROUTES.CLOSE_FIELD, "0")} icon={<LocationOn/>} text="Map" isMaximized={isMaximized}/>  {/**TODO: i18n*/}
                        <CommonListItem url={urlJoin(ROUTES.CLOSE_FIELD, "1")} icon={<LocationOn/>} text="Process" isMaximized={isMaximized}/>   {/**TODO: i18n*/}
                    </CommonList>
                    <CommonListItem url={ROUTES.CHART_TEST} icon={<MultilineChart/>} text="Test Chart" isMaximized={isMaximized}/>
                    <CommonListItem url={ROUTES.FORM_TEST} icon={<MultilineChart/>} text="Form Test" isMaximized={isMaximized}/>
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