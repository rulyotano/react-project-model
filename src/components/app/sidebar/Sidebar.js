import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {LocationOn, ArrowBack, ArrowForward, ExpandMore, ExpandLess,
Home, FormatShapes, LineStyle } from '@material-ui/icons';
import {connect} from 'react-redux';
import { setSizeToMax, setSizeToMin } from "../_duck/actions";
import { getIsMaximized } from "../_duck/selectors";
import { LoadMap as closeFieldLoadMapUrl, 
    LoadProcess as closeFieldLoadProcessUrl } from "../close-field/routesNames";
import layerComparisonUrl, { PreviewModalToTable as comparisonPreviewModalToTable, 
    PreviewModalToComparison as comparisonPreviewModalToComparison } from "../field-layers-comparison/routesNames";
import layerComparisonCompareUrl from "../field-layers-comparison/layers-comparison/routesNames";
import layerComparisonTableUrl from "../field-layers-comparison/preview-table/routesNames";
import {urlJoin} from "../../../service/helperService";
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
        const {isMaximized} = this.state;
        const {match} = this.props;
        const {t} = this.context;

        const app = match.url;
        const closeFieldLoadMap = urlJoin(app, closeFieldLoadMapUrl);
        const closeFieldLoadProcess = urlJoin(app, closeFieldLoadProcessUrl);

        const comparisonPreviewToTable = urlJoin(app, comparisonPreviewModalToTable);
        const comparisonPreviewToCompare = urlJoin(app, comparisonPreviewModalToComparison);
        const comparisonCompare = urlJoin(app, layerComparisonUrl, layerComparisonCompareUrl);
        const comparisonTable = urlJoin(app, layerComparisonUrl, layerComparisonTableUrl);

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
                    <CommonListItem url={app} icon={<Home/>} text={t("Home")} isMaximized={isMaximized}/>
                    {/*<CommonListItem url={ROUTES.MONITORING} icon={<LocationOn/>} text="Monitoring" isMaximized={isMaximized}/>*/}
                    <CommonList isMaximized={isMaximized} icon={<FormatShapes/>} text={t("Close Field")} isOpen={false}>
                        <CommonListItem url={closeFieldLoadMap} icon={<LocationOn/>} text={t("Map")} isMaximized={isMaximized}/>
                        <CommonListItem url={closeFieldLoadProcess} icon={<LineStyle/>} text={t("Process")} isMaximized={isMaximized}/>
                    </CommonList>

                    <CommonList isMaximized={isMaximized} icon={<FormatShapes/>} text={t("Layer Comparison")} isOpen={false}>
                        <CommonListItem url={comparisonPreviewToTable} icon={<LineStyle/>} text={t("Load Field")} isMaximized={isMaximized}/>
                        <CommonListItem url={comparisonPreviewToCompare} icon={<LocationOn/>} text={t("View available information")} isMaximized={isMaximized}/>
                        <CommonListItem url={comparisonCompare} icon={<LocationOn/>} text={t("TEST - preview table")} isMaximized={isMaximized}/>
                        <CommonListItem url={comparisonTable} icon={<LocationOn/>} text={t("TEST - layer comparison")} isMaximized={isMaximized}/>
                    </CommonList>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isMaximized: getIsMaximized(state)
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