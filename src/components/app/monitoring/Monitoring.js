import React, {Component} from 'react';
import Segment from "../segment/Segment";
import CollapsePanel from "../collapse-panel/CollapsePanel";



class Monitoring extends Component{
    render(){
        return(
            <Segment title="Monitoring">
                <CollapsePanel/>
            </Segment>
        )
    }
}


export default Monitoring;