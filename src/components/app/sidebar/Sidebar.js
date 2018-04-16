import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ApplicationIco from 'material-ui/svg-icons/navigation/apps';
import LocationOnIco from 'material-ui/svg-icons/communication/location-on';
import {connect} from 'react-redux';


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

    render(){
        let {match} = this.props;
        let {isMaximized} = this.state;

        return(
            <div className="sidebar" style={{width:isMaximized?'60px':'260px'}}>
                <ul>
                    <li className={isMaximized? "with-border":''}><ApplicationIco/><Link to={`${match.url}`}>{isMaximized? '':'Dashboard'}</Link></li>
                    <li className={isMaximized? "with-border":''}><LocationOnIco/><Link to={`${match.url}monitoring`}>{isMaximized? '':'Monitoring'}</Link></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isMaximized: state.app.maximized
});

export default connect(mapStateToProps)(Sidebar);