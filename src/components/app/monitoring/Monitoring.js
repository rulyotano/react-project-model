import React, {Component} from 'react';
import Segment from "../segment/Segment";
import FilterDropDownTest from "../components-to-test/FilterDropDownTest";

class Monitoring extends Component{
    onChange(item){
        console.log(item);
    }
    render(){
        return(
            <Segment title="Monitoring">
                <div style={{width: '25%'}}>
                    <FilterDropDownTest/>
                </div>
            </Segment>
        )
    }
}


export default Monitoring;