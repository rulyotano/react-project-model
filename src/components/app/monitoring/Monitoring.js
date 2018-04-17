import React, {Component} from 'react';
import Segment from "../segment/Segment";
import FilterDropDown from "../filter-drop-down/FilterDropDown";



class Monitoring extends Component{
    render(){
        return(
            <Segment title="Monitoring">
                <FilterDropDown/>

            </Segment>
        )
    }
}


export default Monitoring;