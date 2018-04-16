import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ApplicationIco from 'material-ui/svg-icons/navigation/apps';
import LocationOnIco from 'material-ui/svg-icons/communication/location-on';


class Sidebar extends Component{
    render(){
        let {match} = this.props;

        return(
            <div className="sidebar">
                <ul>
                    <li><ApplicationIco/><Link to={`${match.url}`}>Dashboard</Link></li>
                    <li><LocationOnIco/><Link to={`${match.url}test-comp-1`}>Test Comp 1</Link></li>
                </ul>
            </div>
        )
    }
}


export default Sidebar;