import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Apps, LocationOn, MultilineChart, ArrowBack, ArrowForward, ExpandMore, ExpandLess,
Home, FormatShapes, LineStyle } from '@material-ui/icons';
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../_store/actions/appActions";
import ROUTES from "../routeNames";
import urlJoin from "url-join";
import CLOSE_FIELD_MAP_KEY from "../close-field/map/KEY";
import CLOSE_FIELD_PROCESS_KEY from "../close-field/process/KEY";
import propTypes from 'prop-types';


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
    static contextTypes={
        t: propTypes.func
    };

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
        const {t} = this.context;

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
                    <CommonListItem url={ROUTES.BASE} icon={<Home/>} text={t("Home")} isMaximized={isMaximized}/>
                    {/*<CommonListItem url={ROUTES.MONITORING} icon={<LocationOn/>} text="Monitoring" isMaximized={isMaximized}/>*/}
                    <CommonList isMaximized={isMaximized} icon={<FormatShapes/>} text={t("Close Field")} isOpen={false}>
                        <CommonListItem url={urlJoin(ROUTES.CLOSE_FIELD, CLOSE_FIELD_MAP_KEY)} icon={<LocationOn/>} text={t("Map")} isMaximized={isMaximized}/>
                        <CommonListItem url={urlJoin(ROUTES.CLOSE_FIELD, CLOSE_FIELD_PROCESS_KEY)} icon={<LineStyle/>} text={t("Process")} isMaximized={isMaximized}/>
                    </CommonList>
                    {/*<CommonListItem url={ROUTES.CHART_TEST} icon={<MultilineChart/>} text="Test Chart" isMaximized={isMaximized}/>*/}
                    {/*<CommonListItem url={ROUTES.FORM_TEST} icon={<MultilineChart/>} text="Form Test" isMaximized={isMaximized}/>*/}
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