import React, {Component} from 'react';
import Segment from "../segment/Segment";
import CollapsePanel from "../collapse-panel/CollapsePanel";
import FilterDropDownTest from "../components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../components-to-test/FilterDropDownAsMultiSelectTest";

class Monitoring extends Component{
    onChange(item){
        console.log(item);
    }
    render(){
        return(
            <Segment title="Monitoring">
                <CollapsePanel/>
                <div style={{width: '25%'}}>
                    <FilterDropDownTest/>
                </div>
                <div style={{width: '25%'}}>
                    <FilterDropDownAsMultiSelectTest/>
                </div>
            </Segment>
        )
    }
}


export default Monitoring;